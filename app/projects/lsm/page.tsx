"use client";

import { useState } from "react";

export default function LaserScanMicrometerAutomation() {
  const [isCodeExpanded, setIsCodeExpanded] = useState(false);

  const code = `import serial

import time

lsm = serial.Serial(

    port="COM4",      # check device manager for correct port

    baudrate=9600,

    bytesize=8,

    parity='N',

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

        <p className="text-2xl text-center">!!!!!!!!PAGE STILL IN DEVELOPMENT!!!!!!!!</p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-[var(--accent)] sm:text-5xl">
          Laser Scan Micrometer Automation
        </h1>

        <p className="mt-6 text-base leading-7 text-white sm:text-xl">
          <span className="underline">Purpose</span>
          : To design and implement an automated measurement system for a
          Mitutoyo Laser Scan Micrometer (LSM), enabling technicians to
          efficiently capture and record precise pin gauge measurements
          directly into an Excel template while reducing manual data entry and
          improving measurement workflow efficiency.
        </p>

        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-center">
          <img
            src="/lsm.jpeg"
            alt="LSM"
            className="mx-auto mt-6 mb-4 h-auto w-full max-w-[400px] object-contain shadow-2xl"
          />

          <p className="flex-1 text-base leading-7 text-white sm:text-xl">
            <span className="underline">Understanding the task</span>
            : After seeking out an opportunity to contribute to a technical
            project, I was introduced to an existing challenge the team had
            been exploring: automating data collection from a Laser Scan
            Micrometer. The instrument was equipped with an RS-232 port,
            providing a direct interface for serial communication and automated
            data collection.
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
          <span className="underline">Tools and Equipment</span>
          : I was permitted a designated development laptop with Python
          installed for the project. However, the technicians&apos; workstations
          did not have Python installed and could not be configured to run the
          scripts. This meant the final solution needed to account for the
          existing technician workflow and operate without requiring
          technicians to install or interact with Python. I therefore designed
          the automation with this constraint in mind.
        </p>

        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-center">
          <p className="flex-1 text-base leading-7 text-white sm:text-xl">
            <span className="underline">Initial Tests</span>
            : My first test was to learn everything I could about the
            instrument&apos;s communication interface. The device was a Mitutoyo
            Laser Scan Micrometer (LSM) 9506, and through studying its user
            manual, I discovered that the LSM could be controlled through its
            RS-232C interface using a series of communication commands. In
            particular, the R command initiates a single-run measurement and
            returns the measurement result in the format P0, [measurement],
            while the RN command performs a single-run measurement without
            including the program number in the response. I also learned that
            it was vital that the interface settings for the LSM were set before
            running any programs. Doing this led me to discover why there had
            been so many issues with automating this device previously: The
            RS-232 port was set to PRG, not COM, meaning whatever program was
            installed wasn&apos;t communicating with the device but actually
            programming its internal software.
          </p>

          <img
            src="/manual.png"
            alt="manual"
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

              {/* Fade effect */}
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
          intervention, I used the Prolific cable&apos;s PID (product ID) and VID
          (vendor ID) to automatically detect which port the RS-232 was
          connected to.
        </p>

        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-center">
          <img
            src="/template.jpeg"
            alt="template"
            className="mx-auto mt-6 mb-4 h-auto w-full max-w-[600px] object-contain shadow-2xl"
          />

          <p className="flex-1 text-base leading-7 text-white sm:text-xl">
            <span className="underline">Improving the Workflow</span>
            : After conducting my test scripts, I realized I would have to
            tackle the actual obstacles that would prevent the code from being
            accessible and easily usable by all technicians. One of the smaller
            issues that I became aware of was that there was an existing Excel
            template for approval which averaged raw manually inputted data;
            however, the entries were arranged horizontally for each vertical
            nominal test point. To fix this, I simply added the right arrow key
            to the Python script, leaving the other arrow keys intact to allow
            navigation to previous automated entries without triggering more LSM
            commands.
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
            alt="tray"
            className="mx-auto mt-6 mb-4 h-auto w-full max-w-[400px] object-contain shadow-2xl"
          />
        </div>

        <p className="mt-6 text-base leading-7 text-white sm:text-xl">
          For the biggest issue of Python not being allowed to run on the main
          workplace computers, after researching options, I discovered that I
          could use the pyinstaller library to covert the script into an .exe
          file. Furthermore, I could create a shortcut to the file which I
          could store in the startup folder for windows, meaning that even after
          a software update or restart the program would be automatically
          running in the background making it very user-friendly, minimizing
          manual intervention. At this point, I want to reference{" "}
          <a
            href="https://pypi.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-[var(--accent)] hover:text-white"
          >
            PyPI
          </a>{" "}
          for finding and using these python libraries. Finally, I sent the file
          to my normal work laptop, and after testing and troubleshooting, I got
          it approved and was able to share it branch-wide! (Final python code
          attached below)
        </p>

        {/* Conclusion & Reflection */}
        <p className="mt-14 text-base leading-7 text-white sm:text-xl">
          <span className="underline">Conclusion & Reflection</span>
          : This project allowed me to tackle a real workplace problem while
          developing skills in serial communication, Python, Excel automation,
          and software deployment. Working within the technicians&apos; existing
          workflow challenged me to find a practical solution rather than simply
          focusing on the technical implementation. It strengthened my ability
          to independently research unfamiliar technologies, troubleshoot, and
          turn a repetitive manual process into an efficient automated system.
        </p>

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