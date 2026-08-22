"use client";

import { useState } from "react";

export default function LaserScanMicrometerAutomation() {
  const [isCodeExpanded, setIsCodeExpanded] = useState(false);
  const [isFinalCodeExpanded, setIsFinalCodeExpanded] = useState(false);

  const code = `import serial
import time

lsm = serial.Serial(
    port="COM4",
    baudrate=9600,
    bytesize=8,
    parity="N",
    stopbits=1,
    timeout=2
)

print("Connected to LSM-9506")

while True:
    input("Press Enter to measure...")

    # Send single measurement command
    lsm.write(b"R\\r\\n")
    time.sleep(0.5)

    response = lsm.readline()

    print("Raw response:")
    print(response)

    print("Decoded:")
    print(response.decode(errors="ignore"))`;

  const finalCode = `import serial
import serial.tools.list_ports
import win32com.client
import keyboard
import time
import pythoncom
import threading
import pystray
from PIL import Image, ImageDraw


# ============================================================
# LSM SETTINGS
# ============================================================

BAUD_RATE = 9600
DATA_BITS = 8
PARITY = serial.PARITY_NONE
STOP_BITS = 1
TIMEOUT = 3


# ============================================================
# PROLIFIC USB-TO-SERIAL IDENTIFICATION
# ============================================================

PROLIFIC_VID = 0x067B

PROLIFIC_PIDS = {
    0x2303,
    0x23A3,
    0x23B3,
    0x23C3,
}


# ============================================================
# GLOBALS
# ============================================================

excel = None
ser = None

# Exact Excel cell where the measurement must be written.
measurement_cell_address = None

# Direction of the key that triggered measurement.
# "down"  = Enter
# "right" = Right Arrow
measurement_direction = "down"

# System state
running = False

# Entire application shutdown
shutdown_requested = False

# Tray icon
tray_icon = None

# Worker thread
worker_thread = None

# Protect shared variables
state_lock = threading.Lock()

# Wakes worker when a measurement is requested
measurement_event = threading.Event()

# Wakes worker when stopping
stop_event = threading.Event()

# Prevent multiple simultaneous measurements
measurement_busy = False


# ============================================================
# FIND PROLIFIC PORT
# ============================================================

def find_prolific_port():
    ports = serial.tools.list_ports.comports()

    for port in ports:
        # Check VID/PID
        if (
            port.vid == PROLIFIC_VID
            and port.pid in PROLIFIC_PIDS
        ):
            return port.device

        # Backup identification
        description = (port.description or "").lower()
        manufacturer = (port.manufacturer or "").lower()

        if (
            "prolific" in description
            or "prolific" in manufacturer
        ):
            return port.device

    return None


# ============================================================
# CONNECT TO LSM
# ============================================================

def connect_to_lsm():
    global running

    while running and not shutdown_requested:
        port = find_prolific_port()

        if port is not None:
            try:
                connection = serial.Serial(
                    port=port,
                    baudrate=BAUD_RATE,
                    bytesize=DATA_BITS,
                    parity=PARITY,
                    stopbits=STOP_BITS,
                    timeout=TIMEOUT
                )

                print(
                    "LSM connected on",
                    port
                )

                return connection

            except serial.SerialException as error:
                print(
                    "Serial connection error:",
                    error
                )

        print(
            "Prolific adapter not found."
        )

        # Wait in small intervals
        # so STOP still works.
        for _ in range(20):
            if not running or shutdown_requested:
                return None

            if stop_event.wait(0.1):
                return None

    return None


# ============================================================
# CONNECT TO EXCEL
#
# ONLY CALLED FROM WORKER THREAD
# ============================================================

def connect_to_excel():
    global running

    while running and not shutdown_requested:
        try:
            excel_app = win32com.client.GetActiveObject(
                "Excel.Application"
            )

            excel_app.Visible = True

            print(
                "Excel detected."
            )

            try:
                print(
                    "Workbook:",
                    excel_app.ActiveWorkbook.Name
                )
            except Exception:
                pass

            try:
                print(
                    "Sheet:",
                    excel_app.ActiveSheet.Name
                )
            except Exception:
                pass

            try:
                print(
                    "Selected cell:",
                    excel_app.ActiveWindow.ActiveCell.Address
                )
            except Exception:
                pass

            return excel_app

        except Exception:
            print(
                "Waiting for Excel..."
            )

            for _ in range(20):
                if not running or shutdown_requested:
                    return None

                if stop_event.wait(0.1):
                    return None

    return None


# ============================================================
# GET MEASUREMENT FROM LSM
# ============================================================

def get_measurement():
    global ser

    if ser is None:
        print(
            "ERROR: LSM is not connected."
        )
        return None

    try:
        # Clear old serial data
        ser.reset_input_buffer()

        # Ask LSM for reading
        ser.write(b"R\\r\\n")
        ser.flush()

        # Read response
        response = ser.readline().decode(
            "ascii",
            errors="ignore"
        ).strip()

        print(
            "LSM:",
            response
        )

        # Expected format contains comma
        if "," not in response:
            print(
                "ERROR: Unexpected LSM response."
            )
            return None

        # Take value after first comma
        measurement_text = response.split(
            ",",
            1
        )[1].strip()

        measurement = float(
            measurement_text
        )

        return measurement

    except Exception as error:
        print(
            "LSM error:",
            repr(error)
        )

        return None


# ============================================================
# CAPTURE EXCEL CELL
#
# IMPORTANT
#
# This function runs from the keyboard callback.
#
# We only return the CELL ADDRESS as a string.
#
# We do NOT keep the COM cell object.
#
# Example:
#
#     "$D$10"
#
# That address is then passed to the worker.
# ============================================================

def capture_current_excel_cell():
    try:
        # The keyboard callback can run on a different
        # thread, so initialize COM for this thread.
        pythoncom.CoInitialize()

        try:
            excel_app = win32com.client.GetActiveObject(
                "Excel.Application"
            )

            if excel_app is None:
                return None

            window = excel_app.ActiveWindow

            if window is None:
                return None

            cell = window.ActiveCell

            if cell is None:
                return None

            address = cell.Address

            print(
                "Captured Excel cell:",
                address
            )

            return address

        finally:
            try:
                pythoncom.CoUninitialize()
            except Exception:
                pass

    except Exception as error:
        print(
            "Could not capture Excel cell:",
            repr(error)
        )

        return None


# ============================================================
# KEYBOARD HANDLER
#
# ENTER:
#     capture current cell
#     trigger measurement
#     Excel is allowed to move DOWN
#
# RIGHT:
#     capture current cell
#     trigger measurement
#     Excel is allowed to move RIGHT
#
# suppress=False is VERY IMPORTANT.
#
# It means Excel still receives the key normally.
# ============================================================

def key_pressed(event):
    global measurement_cell_address
    global measurement_direction
    global measurement_busy

    if not running:
        return

    # --------------------------------------------------------
    # Determine direction
    # --------------------------------------------------------

    if event.name == "enter":
        direction = "down"

        print(
            "\\n=========================================="
        )

        print(
            "ENTER PRESSED"
        )

        print(
            "=========================================="
        )

    elif event.name == "right":
        direction = "right"

        print(
            "\\n=========================================="
        )

        print(
            "RIGHT ARROW PRESSED"
        )

        print(
            "=========================================="
        )

    else:
        return

    # --------------------------------------------------------
    # Do not allow another measurement while the previous
    # one is still being processed.
    # --------------------------------------------------------

    with state_lock:
        if measurement_busy:
            print(
                "Measurement still processing."
            )

            print(
                "Key ignored."
            )

            return

        measurement_busy = True

    # --------------------------------------------------------
    # CAPTURE THE CELL BEFORE EXCEL NAVIGATES
    # --------------------------------------------------------

    cell_address = capture_current_excel_cell()

    if cell_address is None:
        print(
            "ERROR: Could not determine Excel cell."
        )

        with state_lock:
            measurement_busy = False

        return

    # --------------------------------------------------------
    # Save exact target cell
    # --------------------------------------------------------

    with state_lock:
        measurement_cell_address = cell_address
        measurement_direction = direction

    print(
        "Measurement target:",
        cell_address
    )

    print(
        "Direction:",
        direction
    )

    # --------------------------------------------------------
    # Wake worker
    # --------------------------------------------------------

    measurement_event.set()


# ============================================================
# WRITE MEASUREMENT TO EXACT CELL
#
# IMPORTANT:
#
# NO Offset()
# NO Select()
# NO navigation
#
# We simply write to the exact address captured earlier.
# ============================================================

def write_to_excel(
    measurement,
    cell_address
):
    global excel

    try:
        if excel is None:
            print(
                "ERROR: Excel is not connected."
            )
            return False

        if not cell_address:
            print(
                "ERROR: No Excel cell address."
            )
            return False

        print(
            "\\nWriting measurement..."
        )

        print(
            "Target cell:",
            cell_address
        )

        print(
            "Value:",
            measurement
        )

        # ----------------------------------------------------
        # Get the active sheet
        # ----------------------------------------------------

        sheet = excel.ActiveSheet

        # ----------------------------------------------------
        # Get EXACT cell from captured address
        # ----------------------------------------------------

        cell = sheet.Range(
            cell_address
        )

        # ----------------------------------------------------
        # Write value
        # ----------------------------------------------------

        cell.Value = measurement

        print(
            "SUCCESS:"
        )

        print(
            measurement,
            "written to",
            cell_address
        )

        return True

    except Exception as error:
        print(
            "ERROR writing to Excel:",
            repr(error)
        )

        return False


# ============================================================
# TAKE MEASUREMENT
# ============================================================

def take_measurement(
    cell_address,
    direction
):
    global measurement_busy

    try:
        print(
            "\\nMeasurement target:",
            cell_address
        )

        print(
            "Measurement direction:",
            direction
        )

        # ----------------------------------------------------
        # Check running
        # ----------------------------------------------------

        if not running:
            print(
                "Measurement system is stopped."
            )
            return

        # ----------------------------------------------------
        # Check Excel
        # ----------------------------------------------------

        if excel is None:
            print(
                "ERROR: Excel is not connected."
            )
            return

        # ----------------------------------------------------
        # GET MEASUREMENT
        # ----------------------------------------------------

        measurement = get_measurement()

        if measurement is None:
            print(
                "ERROR: Measurement failed."
            )
            return

        print(
            "Measurement:",
            measurement
        )

        # ----------------------------------------------------
        # WRITE TO EXACT CELL
        # ----------------------------------------------------

        write_to_excel(
            measurement,
            cell_address
        )

        # ----------------------------------------------------
        # IMPORTANT:
        #
        # WE DO NOT MOVE EXCEL.
        #
        # Excel handles Enter/Right navigation itself.
        # ----------------------------------------------------

        try:
            current_cell = (
                excel
                .ActiveWindow
                .ActiveCell
                .Address
            )

            print(
                "Excel is currently on:",
                current_cell
            )

        except Exception:
            pass

    except Exception as error:
        print(
            "Measurement error:",
            repr(error)
        )

    finally:
        with state_lock:
            measurement_busy = False


# ============================================================
# CREATE TRAY IMAGE
# ============================================================

def create_tray_image():
    image = Image.new(
        "RGB",
        (64, 64),
        (30, 100, 200)
    )

    draw = ImageDraw.Draw(image)

    # White circle
    draw.ellipse(
        (10, 10, 54, 54),
        fill="white"
    )

    # LSM text
    draw.text(
        (16, 24),
        "LSM",
        fill=(30, 100, 200)
    )

    return image


# ============================================================
# UPDATE TRAY
# ============================================================

def update_tray():
    global tray_icon

    if tray_icon is None:
        return

    if running:
        tray_icon.title = (
            "LSM Measurement System - RUNNING"
        )

    else:
        tray_icon.title = (
            "LSM Measurement System - STOPPED"
        )

    try:
        tray_icon.update_menu()
    except Exception:
        pass


# ============================================================
# WORKER THREAD
#
# THIS THREAD OWNS:
#
# - Excel
# - Serial
# - Measurements
#
# ============================================================

def measurement_worker():
    global excel
    global ser
    global running
    global measurement_cell_address
    global measurement_direction
    global measurement_busy

    print(
        "\\nMeasurement worker starting..."
    )

    # --------------------------------------------------------
    # Initialize COM on worker thread
    # --------------------------------------------------------

    pythoncom.CoInitialize()

    try:
        # ====================================================
        # CONNECT TO LSM
        # ====================================================

        print(
            "\\nSearching for Prolific adapter..."
        )

        ser = connect_to_lsm()

        if not running or ser is None:
            print(
                "LSM startup cancelled."
            )
            return

        # ====================================================
        # CONNECT TO EXCEL
        # ====================================================

        print(
            "\\nWaiting for Excel..."
        )

        excel = connect_to_excel()

        if not running or excel is None:
            print(
                "Excel connection cancelled."
            )
            return

        # ====================================================
        # SYSTEM READY
        # ====================================================

        print(
            "\\n=========================================="
        )

        print(
            "              SYSTEM READY"
        )

        print(
            "==========================================\\n"
        )

        print(
            "Open your Excel spreadsheet."
        )

        print(
            "Click the FIRST cell for your measurement."
        )

        print(
            "Press ENTER:"
        )

        print(
            "  Measurement goes into current cell."
        )

        print(
            "  Excel moves DOWN."
        )

        print(
            "Press RIGHT ARROW:"
        )

        print(
            "  Measurement goes into current cell."
        )

        print(
            "  Excel moves RIGHT."
        )

        print(
            "Use the tray icon to Stop or Exit."
        )

        update_tray()

        # ====================================================
        # WORKER LOOP
        # ====================================================

        while running and not shutdown_requested:
            # ------------------------------------------------
            # Wait for keyboard event
            # ------------------------------------------------

            if not measurement_event.wait(0.1):
                continue

            # ------------------------------------------------
            # Clear event
            # ------------------------------------------------

            measurement_event.clear()

            if not running:
                continue

            # ------------------------------------------------
            # Copy shared data while holding lock
            # ------------------------------------------------

            with state_lock:
                cell_address = (
                    measurement_cell_address
                )

                direction = (
                    measurement_direction
                )

            # ------------------------------------------------
            # Make sure target exists
            # ------------------------------------------------

            if cell_address is None:
                with state_lock:
                    measurement_busy = False

                continue

            # ------------------------------------------------
            # Take measurement
            # ------------------------------------------------

            take_measurement(
                cell_address,
                direction
            )

            # ------------------------------------------------
            # Clear target
            # ------------------------------------------------

            with state_lock:
                measurement_cell_address = None

    except Exception as error:
        print(
            "\\nWorker thread error:",
            repr(error)
        )

    finally:
        print(
            "\\nMeasurement worker shutting down..."
        )

        # ----------------------------------------------------
        # Remove keyboard hooks
        # ----------------------------------------------------

        try:
            keyboard.unhook_all()
        except Exception:
            pass

        # ----------------------------------------------------
        # Close serial
        # ----------------------------------------------------

        try:
            if ser is not None:
                ser.close()

                print(
                    "LSM serial connection closed."
                )

        except Exception as error:
            print(
                "Serial cleanup error:",
                repr(error)
            )

        ser = None

        # ----------------------------------------------------
        # Release Excel reference
        # ----------------------------------------------------

        excel = None

        # ----------------------------------------------------
        # COM cleanup
        # ----------------------------------------------------

        try:
            pythoncom.CoUninitialize()
        except Exception:
            pass

        print(
            "Measurement worker stopped."
        )


# ============================================================
# START MEASUREMENT SYSTEM
# ============================================================

def run_system():
    global running
    global worker_thread
    global measurement_cell_address
    global measurement_busy

    with state_lock:
        if running:
            print(
                "LSM system is already running."
            )
            return

        print(
            "\\n=========================================="
        )

        print(
            "       STARTING LSM MEASUREMENT SYSTEM"
        )

        print(
            "=========================================="
        )

        # ----------------------------------------------------
        # Clear old state
        # ----------------------------------------------------

        measurement_event.clear()
        stop_event.clear()
        measurement_cell_address = None
        measurement_busy = False

        # ----------------------------------------------------
        # Start system
        # ----------------------------------------------------

        running = True

        update_tray()

        # ----------------------------------------------------
        # Install ENTER hook
        #
        # suppress=False means Excel still receives ENTER.
        # ----------------------------------------------------

        keyboard.on_press_key(
            "enter",
            key_pressed,
            suppress=False
        )

        # ----------------------------------------------------
        # Install RIGHT ARROW hook
        #
        # suppress=False means Excel still receives RIGHT.
        # ----------------------------------------------------

        keyboard.on_press_key(
            "right",
            key_pressed,
            suppress=False
        )

        # ----------------------------------------------------
        # Start worker thread
        # ----------------------------------------------------

        worker_thread = threading.Thread(
            target=measurement_worker,
            daemon=True
        )

        worker_thread.start()

        print(
            "Measurement worker started."
        )


# ============================================================
# STOP MEASUREMENT SYSTEM
# ============================================================

def stop_system():
    global running
    global ser
    global excel
    global worker_thread
    global measurement_cell_address
    global measurement_busy

    with state_lock:
        if not running:
            print(
                "LSM system is already stopped."
            )
            return

        print(
            "\\n=========================================="
        )

        print(
            "       STOPPING LSM MEASUREMENT SYSTEM"
        )

        print(
            "=========================================="
        )

        # ----------------------------------------------------
        # Tell worker to stop
        # ----------------------------------------------------

        running = False
        measurement_cell_address = None
        measurement_busy = False
        measurement_event.set()
        stop_event.set()

    # --------------------------------------------------------
    # Remove keyboard hooks
    # --------------------------------------------------------

    try:
        keyboard.unhook_all()
    except Exception as error:
        print(
            "Keyboard cleanup error:",
            repr(error)
        )

    # --------------------------------------------------------
    # Close serial
    # --------------------------------------------------------

    try:
        if ser is not None:
            ser.close()

            print(
                "LSM serial connection closed."
            )

    except Exception as error:
        print(
            "Serial cleanup error:",
            repr(error)
        )

    ser = None

    # --------------------------------------------------------
    # DO NOT access Excel here.
    #
    # Excel belongs to worker thread.
    # --------------------------------------------------------

    excel = None

    # --------------------------------------------------------
    # Wait for worker
    # --------------------------------------------------------

    if (
        worker_thread is not None
        and worker_thread.is_alive()
    ):
        worker_thread.join(
            timeout=2
        )

    worker_thread = None

    print(
        "LSM system stopped."
    )

    print(
        "Tray application remains running."
    )

    update_tray()


# ============================================================
# EXIT ENTIRE APPLICATION
# ============================================================

def request_shutdown(
    icon,
    item
):
    global shutdown_requested

    print(
        "\\n=========================================="
    )

    print(
        "          APPLICATION EXIT REQUESTED"
    )

    print(
        "=========================================="
    )

    shutdown_requested = True

    # Stop measurement system
    stop_system()

    # Stop tray
    try:
        icon.stop()
    except Exception:
        pass


# ============================================================
# TRAY MENU
# ============================================================

def create_tray_menu():
    return pystray.Menu(
        pystray.MenuItem(
            "LSM Measurement System",
            None,
            enabled=False
        ),

        pystray.Menu.SEPARATOR,

        pystray.MenuItem(
            "Run",
            lambda icon, item: run_system(),
            enabled=lambda item: not running
        ),

        pystray.MenuItem(
            "Stop",
            lambda icon, item: stop_system(),
            enabled=lambda item: running
        ),

        pystray.Menu.SEPARATOR,

        pystray.MenuItem(
            "Exit",
            request_shutdown
        )
    )


# ============================================================
# START TRAY ICON
# ============================================================

def start_tray_icon():
    global tray_icon

    image = create_tray_image()

    tray_icon = pystray.Icon(
        "LSM Measurement System",
        image,
        "LSM Measurement System - STOPPED",
        create_tray_menu()
    )

    tray_icon.run()


# ============================================================
# MAIN APPLICATION
# ============================================================

def main():
    global shutdown_requested

    print(
        "\\n=========================================="
    )

    print(
        "       LSM MEASUREMENT SYSTEM"
    )

    print(
        "==========================================\\n"
    )

    print(
        "Tray application starting..."
    )

    print(
        "Measurement system is initially STOPPED."
    )

    print(
        "Use the system tray to select RUN."
    )

    # --------------------------------------------------------
    # Start tray
    # --------------------------------------------------------

    tray_thread = threading.Thread(
        target=start_tray_icon,
        daemon=True
    )

    tray_thread.start()

    # --------------------------------------------------------
    # Main application loop
    # --------------------------------------------------------

    try:
        while not shutdown_requested:
            time.sleep(0.1)

    except KeyboardInterrupt:
        print(
            "\\nKeyboard interrupt received."
        )

        shutdown_requested = True

    finally:
        print(
            "\\n=========================================="
        )

        print(
            "       LSM MEASUREMENT SYSTEM CLOSED"
        )

        print(
            "=========================================="
        )

        # Stop measurement system
        if running:
            stop_system()

        # Stop tray
        if tray_icon is not None:
            try:
                tray_icon.stop()
            except Exception:
                pass

        print(
            "Cleanup complete."
        )


# ============================================================
# PROGRAM ENTRY POINT
# ============================================================

if __name__ == "__main__":
    main()
`;

  return (
    <main id="top" className="min-h-screen bg-[#080D12]">
      {/* Navbar */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6 sm:px-8 md:px-10">
        <div className="flex items-center">
          <span className="text-xs font-medium tracking-[0.2em] text-zinc-400 sm:text-sm">
            PROJECT
          </span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/"
            className="project-button inline-block rounded-lg bg-white px-3 py-2 text-sm font-medium text-zinc-950"
          >
            Home
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-6 sm:px-10 md:px-10">
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-[var(--accent)] sm:text-5xl">
          Laser Scan Micrometer Automation
        </h1>

        <p className="mt-6 text-base leading-7 text-white sm:text-xl">
          <span className="underline">Purpose</span>: To design and implement
          an automated measurement system for a Mitutoyo Laser Scan Micrometer
          (LSM), enabling technicians to efficiently capture and record precise
          pin gauge measurements directly into an Excel template while reducing
          manual data entry and improving measurement workflow efficiency.
        </p>

        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-center">
          <img
            src="/lsm.jpeg"
            alt="LSM"
            className="mx-auto mb-4 mt-6 h-auto w-full max-w-[400px] object-contain shadow-2xl"
          />

          <p className="flex-1 text-base leading-7 text-white sm:text-xl">
            <span className="underline">Understanding the task</span>: After
            seeking out an opportunity to contribute to a technical project, I
            was introduced to an existing challenge the team had been
            exploring: automating data collection from a Laser Scan Micrometer.
            The instrument was equipped with an RS-232 port, providing a direct
            interface for serial communication and automated data collection.
            <br />
            <br />
            I received training on how to manually use the device for pin gauge
            calibration, learning that, especially for larger sets, it was a
            very tedious process, given that each individual pin required 6
            different measurements, the average of which would be included on
            the final calibration certificate. Following this training, I began
            formulating a basic plan to approach the problem:
          </p>
        </div>

        <ol className="mt-6 space-y-4 text-base leading-7 text-white sm:text-xl">
          <li className="flex gap-2">
            <span className="shrink-0">Step 1 - </span>
            <span>Learn the device&apos;s communication commands.</span>
          </li>

          <li className="flex gap-2">
            <span className="shrink-0">Step 2 - </span>
            <span>
              Use a Python script (ideal for serial communication and Excel
              data transfer) to communicate with the device and understand how
              the data is formatted.
            </span>
          </li>

          <li className="flex gap-2">
            <span className="shrink-0">Step 3 - </span>
            <span>Send the data to the Excel template.</span>
          </li>

          <li className="flex gap-2">
            <span className="shrink-0">Step 4 - </span>
            <span>
              Modify the template to average the raw data for the calibration
              certificate.
            </span>
          </li>

          <li className="flex gap-2">
            <span className="shrink-0">Step 5 - </span>
            <span>
              Ensure the program is easily usable for technicians with minimal
              programming experience.
            </span>
          </li>
        </ol>

        <p className="mt-6 text-base leading-7 text-white sm:text-xl">
          <span className="underline">Tools and Equipment</span>: I was
          permitted a designated development laptop with Python installed for
          the project. However, the technicians&apos; workstations did not have
          Python installed and could not be configured to run the scripts. This
          meant the final solution needed to account for the existing technician
          workflow and operate without requiring technicians to install or
          interact with Python. I therefore designed the automation with this
          constraint in mind.
        </p>

        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-center">
          <p className="flex-1 text-base leading-7 text-white sm:text-xl">
            <span className="underline">Initial Tests</span>: My first test was
            to learn everything I could about the instrument&apos;s
            communication interface. The device was a Mitutoyo Laser Scan
            Micrometer (LSM) 9506, and through studying its user manual, I
            discovered that the LSM could be controlled through its RS-232C
            interface using a series of communication commands. In particular,
            the R command initiates a single-run measurement and returns the
            measurement result in the format P0, [measurement], while the RN
            command performs a single-run measurement without including the
            program number in the response. I also learned that it was vital
            that the interface settings for the LSM were set before running any
            programs. Doing this led me to discover why there had been so many
            issues with automating this device previously: The RS-232 port was
            set to PRG, not COM, meaning whatever program was installed
            wasn&apos;t communicating with the device but actually programming
            its internal software.
          </p>

          <img
            src="/manual.png"
            alt="LSM user manual"
            className="mx-auto w-full max-w-[300px] object-cover shadow-2xl sm:max-w-[350px] md:mx-0"
          />
        </div>

        <p className="mt-6 text-base leading-7 text-white sm:text-xl">
          Using the Python script below, I conducted a basic communication test
          by sending a measurement command to the LSM and reading its response
          through the serial interface. The successful test returned measurement
          data to the terminal in the form P0, [Data Value], confirming that
          Python could communicate with the instrument and receive its
          measurement data.
        </p>

        {/* Expandable Code Section */}
        <div className="mt-8 flex justify-center">
          <div className="w-full max-w-4xl overflow-hidden rounded-xl border border-[#8B7CF6]/25 bg-[#11101A]">
            {/* Code Header */}
            <div className="border-b border-[#8B7CF6]/15 bg-[#171522] px-4 py-3 sm:px-7">
              <span className="font-mono text-sm text-[#A69CF8]">
                lsm_test.py
              </span>
            </div>

            {/* Code */}
            <div
              className={`relative overflow-hidden transition-all duration-500 ${
                isCodeExpanded ? "max-h-[2000px]" : "max-h-[250px]"
              }`}
            >
              <pre className="overflow-x-auto p-3 sm:p-7">
                <code className="font-mono text-[10px] leading-[1.35] text-[#E4E1F5] sm:text-[13px]">
                  {code}
                </code>
              </pre>

              {!isCodeExpanded && (
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#11101A] to-transparent" />
              )}
            </div>

            {/* Expand Button */}
            <div className="border-t border-[#8B7CF6]/15 bg-[#171522] p-3 text-center">
              <button
                onClick={() => setIsCodeExpanded(!isCodeExpanded)}
                className="rounded-lg px-5 py-2 text-sm font-medium text-[#A69CF8] transition hover:bg-[#8B7CF6]/10 hover:text-white"
              >
                {isCodeExpanded ? "Hide Code ↑" : "View Full Code ↓"}
              </button>
            </div>
          </div>
        </div>

        <p className="mt-6 text-base leading-7 text-white sm:text-xl">
          I ran into some minor issues such as drivers not being installed, but
          after some troubleshooting, I was able to get the desired reading to
          my terminal. I was then able to move on to working out the Excel part
          of the script. Initially, my manager suggested that there should be a
          timed interval. For instance, after every ten seconds, the LSM would
          send data to the sheet so the technician would have to move or replace
          the current pin. I realized this could create lots of issues with
          human error, especially if the technician wanted to go back and delete
          a particular measurement. Thus, I decided to simplify the process by
          continuing to use the Enter key for data entry. Given that, I had to
          utilize the suppress:false openpyxl code to allow Excel to maintain
          its normal response to the keyboard along with my code. This meant
          that after pressing Enter, the data would be written to the selected
          cell and the next cell would be selected. Also, to minimize manual
          intervention, I used the Prolific cable&apos;s PID (product ID) and
          VID (vendor ID) to automatically detect which port the RS-232 was
          connected to.
        </p>

        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-center">
          <img
            src="/template.jpeg"
            alt="Excel template"
            className="mx-auto mb-4 mt-6 h-auto w-full max-w-[600px] object-contain shadow-2xl"
          />

          <p className="flex-1 text-base leading-7 text-white sm:text-xl">
            <span className="underline">Improving the Workflow</span>: After
            conducting my test scripts, I realized I would have to tackle the
            actual obstacles that would prevent the code from being accessible
            and easily usable by all technicians. One of the smaller issues
            that I became aware of was that there was an existing Excel
            template for approval which averaged raw manually inputted data;
            however, the entries were arranged horizontally for each vertical
            nominal test point. To fix this, I simply added the right arrow key
            to the Python script, leaving the other arrow keys intact to allow
            navigation to previous automated entries without triggering more
            LSM commands.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-center">
          <p className="flex-1 text-base leading-7 text-white sm:text-xl">
            Beyond this, I wanted to tackle the user interface. So far, I was
            using the keyboard to run the LSM commands, with the Esc key being
            used to exit the program, but I knew this was temporary as the user
            was likely to press the key unintentionally and restarting the
            program would not be a simple process. Thus, I decided to utilize
            the PyStray library to create a tray icon that the user could use to
            run, stop, and exit the program. The Run and Stop features allowed
            the program to run in the background, detecting the RS-232 port,
            until the user had the desired Excel sheet open and could hit Run.
          </p>

          <img
            src="/tray.png"
            alt="LSM tray icon"
            className="mx-auto mb-4 mt-6 h-auto w-full max-w-[400px] object-contain shadow-2xl"
          />
        </div>

        {/* Conclusion & Reflection */}
        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-center">
          <video
            src="/lsm_trial.mov"
            autoPlay
            muted
            loop
            playsInline
            className="mx-auto h-auto w-full max-w-[350px] object-contain shadow-2xl"
          />

          <p className="flex-1 text-base leading-7 text-white sm:text-xl">
            For the biggest issue of Python not being allowed to run on the main
            workplace computers, after researching options, I discovered that I
            could use the PyInstaller library to convert the script into an .exe
            file. Furthermore, I could create a shortcut to the file which I
            could store in the Startup folder for Windows, meaning that even
            after a software update or restart, the program would be automatically
            running in the background, making it very user-friendly and minimizing
            manual intervention. At this point, I want to reference{" "}
            <a
              href="https://pypi.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-[var(--accent)] hover:text-white"
            >
              PyPI
            </a>{" "}
            for finding and using these Python libraries. Finally, I sent the file
            to my normal work laptop, and after testing and troubleshooting, I got
            it approved and was able to share it branch-wide! (Final Python code
            attached below)
          
            <br />
            <br />

            <span className="underline">Conclusion & Reflection</span>: This
            project allowed me to tackle a real workplace problem while developing
            skills in serial communication, Python, Excel automation, and software
            deployment. Working within the technicians&apos; existing workflow
            challenged me to find a practical solution rather than simply focusing on
            the technical implementation. It strengthened my ability to independently
            research unfamiliar technologies, troubleshoot, and turn a repetitive
            manual process into an efficient automated system.
          </p>
        </div>

        {/* Final Python Code */}
        <div className="mt-10 flex justify-center">
          <div className="w-full max-w-4xl overflow-hidden rounded-xl border border-[#8B7CF6]/25 bg-[#11101A]">
            {/* Code Header */}
            <div className="border-b border-[#8B7CF6]/15 bg-[#171522] px-4 py-3 sm:px-7">
              <span className="font-mono text-sm text-[#A69CF8]">
                lsm_automation.py
              </span>
            </div>

            {/* Code */}
            <div
              className={`relative overflow-hidden transition-all duration-500 ${
                isFinalCodeExpanded ? "max-h-[10000px]" : "max-h-[250px]"
              }`}
            >
              <pre className="overflow-x-auto p-3 sm:p-7">
                <code className="font-mono text-[10px] leading-[1.35] text-[#E4E1F5] sm:text-[13px]">
                  {finalCode}
                </code>
              </pre>

              {!isFinalCodeExpanded && (
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#11101A] to-transparent" />
              )}
            </div>

            {/* Expand Button */}
            <div className="border-t border-[#8B7CF6]/15 bg-[#171522] p-3 text-center">
              <button
                onClick={() =>
                  setIsFinalCodeExpanded(!isFinalCodeExpanded)
                }
                className="rounded-lg px-5 py-2 text-sm font-medium text-[#A69CF8] transition hover:bg-[#8B7CF6]/10 hover:text-white"
              >
                {isFinalCodeExpanded
                  ? "Hide Final Code ↑"
                  : "View Final Code ↓"}
              </button>
            </div>
          </div>
        </div>

        {/* Return to Top */}
        <div className="mt-16 flex justify-center pb-12">
          <a
            href="#top"
            className="project-button rounded-lg bg-white px-6 py-3 font-medium text-zinc-950"
          >
            Return to Top ↑
          </a>
        </div>
      </div>
    </main>
  );
}