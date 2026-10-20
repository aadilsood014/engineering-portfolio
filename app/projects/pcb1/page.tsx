
"use client";

import { useState } from "react";

export default function Project1() {
  const [isCodeExpanded, setIsCodeExpanded] = useState(false);

  const code = `const int PIN_CS   = 10;
const int PIN_SCK  = 13;
const int PIN_MISO = 12;

void setup() {
  Serial.begin(9600);
  pinMode(PIN_CS, OUTPUT);
  pinMode(PIN_SCK, OUTPUT);
  pinMode(PIN_MISO, INPUT);
  digitalWrite(PIN_CS, HIGH);   // chip not selected
  digitalWrite(PIN_SCK, LOW);   // clock low
  delay(500);
}

// Read the raw 16-bit word from the MAX6675, MSB first.
uint16_t readRaw() {
  uint16_t data = 0;

  digitalWrite(PIN_CS, LOW); // chip selected
  delayMicroseconds(10);

  for (int i = 0; i < 16; i++) { //iterating through each bit
    digitalWrite(PIN_SCK, LOW);
    delayMicroseconds(2);
    data <<= 1;
    if (digitalRead(PIN_MISO)) {
      data |= 1;
    }
    digitalWrite(PIN_SCK, HIGH); //clock high
    delayMicroseconds(2);
  }

  digitalWrite(PIN_SCK, LOW); //clock low
  digitalWrite(PIN_CS, HIGH);
  return data;
}

void loop() {
  uint16_t raw = readRaw();


  if (raw & 0x4) {              // D2: open thermocouple
    Serial.println("Error: thermocouple not connected!");
  } else {
    float tempC = (raw >> 3) * 0.25;   // drop 3 low bits, 0.25 C per count
    Serial.print("Temp: ");
    Serial.print(tempC, 2);
    Serial.println(" C");
  }

  delay(500);
}`;

  return (
    <main id="top" className="min-h-screen">
      {/* Navbar */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6 sm:px-8 md:px-10">
        <div className="flex items-center">
          <span className="mono-label text-xs font-medium text-muted sm:text-sm">
            PROJECT
          </span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/"
            className="project-button inline-block rounded-lg border border-[var(--accent)]/50 px-3 py-2 text-sm font-medium text-[var(--accent)] hover:text-white"
          >
            Home
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-6 sm:px-10 md:px-10">
        <p className="animate-in mono-label text-xs text-[var(--accent-secondary)]">
          / PROJECT
        </p>

        <h1 className="animate-in delay-1 gradient-text mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          STM32-Based Dual Temperature Monitor
        </h1>

        <p className="mt-6 text-base leading-7 text-muted sm:text-xl">
          <span className="text-[var(--accent-secondary)] underline">
            Purpose
          </span>
          : To develop a thermocouple temperature measurement system as
          an onboarding project for the UBC Mars Colony Design Team. I
          began by learning how to retrieve temperature measurements
          through SPI communication, then progressed from a single-channel
          Arduino prototype to designing a custom STM32-based PCB that
          supports two thermocouples.
        </p>

        {/* Project Overview */}
        <div className="animate-in delay-2 mt-8 grid items-center gap-4 md:grid-cols-2">
          <img
            src="/pcb1.png"
            alt="pcb"
            className="glow-border mx-auto h-[250px] w-full rounded-xl object-contain sm:h-[350px] lg:h-[500px]"
          />

          <img
            src="/pcb2.png"
            alt="pcb"
            className="glow-border mx-auto h-[250px] w-full rounded-xl object-contain sm:h-[350px] lg:h-[500px]"
          />
        </div>

        {/* Initial Prototype */}
        <p className="mt-6 text-base leading-7 text-muted sm:text-xl">
          <span className="text-[var(--accent-secondary)] underline">
            Initial system architecture
          </span>
          : The intended workflow was PC → ESP32 ↔ Arduino Nano ↔
          thermocouples, using UART for communication between
          microcontrollers and SPI for communication with the
          thermocouple interface chips. I started by focusing on SPI
          because it was the first step in getting temperature data
          from the thermocouples into the system. Before integrating
          the different boards, I wanted to understand how the sensor
          interface worked and verify that the Arduino could retrieve
          a temperature measurement.
        </p>

        <div className="mt-8">
          <img
            src="/proto.jpeg"
            alt="PC, ESP32, Arduino Nano, and thermocouple communication workflow"
            className="glow-border mx-auto w-full max-w-4xl object-cover"
          />
        </div>

        <p className="mt-6 text-base leading-7 text-muted sm:text-xl">
          <span className="text-[var(--accent-secondary)] underline">
            Understanding the MAX6675
          </span>
          : I studied the{" "}
          <a
            href="https://cdn-shop.adafruit.com/datasheets/MAX6675.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent)] hover:underline"
          >
            MAX6675 datasheet
          </a>{" "}
          to understand how the chip converts a thermocouple measurement
          into digital data. The MAX6675 performs the signal conversion
          internally and communicates with the Arduino through five
          connections: GND, VCC, serial clock (SCK), active-low chip
          select (CS), and serial output (SO). The power pins connect to
          the supply, while the Arduino controls the clock and chip-select
          signals and reads the serial output.
        </p>

        <p className="mt-6 text-base leading-7 text-muted sm:text-xl">
          The MAX6675 transmits a 16-bit data word when selected. The
          upper bits contain the temperature measurement, while the
          lower bits provide status and device information. The
          temperature field represents measurements in increments of
          0.25 °C. The D2 status bit indicates an open thermocouple,
          allowing the microcontroller to distinguish a disconnected
          sensor from a valid temperature reading.
        </p>

        {/* Prototype Image */}
        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-center">
          <p className="flex-1 text-base leading-7 text-muted sm:text-xl">
            <span className="text-[var(--accent-secondary)] underline">
              Implementing SPI through bit-banging
            </span>
            : Rather than relying on an existing SPI library, I
            implemented the communication manually using Arduino GPIO
            operations. The code pulls CS low to select the MAX6675,
            generates clock transitions on SCK, and reads SO one bit
            at a time to reconstruct the 16-bit word. This approach
            let me investigate the communication process directly,
            including how the master controls the transaction and
            how the slave returns its data.
          </p>
        </div>

        <p className="mt-6 text-base leading-7 text-muted sm:text-xl">
          <span className="text-[var(--accent-secondary)] underline">
            Extracting the temperature reading
          </span>
          : After receiving the raw word, I shift it right by three
          positions to isolate the temperature field and multiply the
          result by 0.25 to convert it into degrees Celsius. Before
          printing the result, the code checks the D2 status bit and
          reports an error if the thermocouple is disconnected. The
          reading is then sent to the serial monitor every 500 ms.
          This gave me experience with bitwise operations, data
          extraction, sensor status handling, and serial output.
        </p>

        <div className="mt-8">
          <img
            src="/temp1.jpeg"
            alt="SPI timing and serial data transfer for the MAX6675"
            className="glow-border mx-auto w-full max-w-3xl object-cover"
          />
        </div>

        <p className="mt-6 text-base leading-7 text-muted sm:text-xl">
          <span className="text-[var(--accent-secondary)] underline">
            Prototype results and limitations
          </span>
          : The prototype successfully produced temperature readings
          over the serial connection, generally around room temperature
          (approximately 25 °C). I did not have a calibrated reference
          instrument available to verify the readings, so I could not
          establish measurement accuracy. The results nevertheless
          demonstrated that I could retrieve, interpret, and display
          the MAX6675's digital temperature data.
        </p>

        {/* Expandable Code Section */}
        <div className="mt-8 flex justify-center">
          <div className="project-card w-full max-w-4xl overflow-hidden rounded-xl">
            <div className="border-b border-[var(--accent)]/15 bg-[var(--surface)] px-4 py-3 sm:px-7">
              <span className="mono-label text-sm text-[var(--accent-secondary)]">
                Arduino.ino
              </span>
            </div>

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
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--surface)] to-transparent" />
              )}
            </div>

            <div className="border-t border-[var(--accent)]/15 bg-[var(--surface)] p-3 text-center">
              <button
                onClick={() => setIsCodeExpanded(!isCodeExpanded)}
                className="rounded-lg px-5 py-2 text-sm font-medium text-[var(--accent-secondary)] transition hover:bg-[var(--accent)]/10 hover:text-white"
              >
                {isCodeExpanded ? "Hide Code ↑" : "View Full Code ↓"}
              </button>
            </div>
          </div>
        </div>

        {/* Transition to PCB */}
        <p className="mt-6 text-base leading-7 text-muted sm:text-xl">
          <span className="text-[var(--accent-secondary)] underline">
            Transitioning to a custom PCB
          </span>
          : With the single-channel prototype providing a starting point
          for understanding the sensor interface, I moved on to designing
          a custom PCB in Altium Designer. The new design uses an STM32
          microcontroller instead of the Arduino Nano and incorporates
          two MAX6675 interfaces, allowing measurements from two
          thermocouples. Each converter has its own chip-select signal,
          while the SPI clock and serial output lines are shared.
        </p>

        <p className="mt-6 text-base leading-7 text-muted sm:text-xl">
          <span className="text-[var(--accent-secondary)] underline">
            From prototype wiring to integrated hardware
          </span>
          : The PCB brings the microcontroller, thermocouple interfaces,
          and supporting power circuitry together in one design. I
          developed the schematic and board layout, including USB-C
          power input, a 3.3 V low-dropout regulator, decoupling
          capacitors, and an SWD programming header. This shifted my
          focus from manually wiring a sensor to considering how
          components, power distribution, programming access, and
          signal connections fit together in a custom embedded system.
        </p>

        {/* Schematic Design */}
        <p className="mt-6 text-base leading-7 text-muted sm:text-xl">
          <span className="text-[var(--accent-secondary)] underline">
            Schematic design and component selection
          </span>
          : I developed the circuit schematic in Altium Designer,
          integrating an STM32F030K6T6 microcontroller with two MAX6675
          thermocouple interface chips. This required learning how to
          translate the system requirements into a complete circuit,
          including the supporting components needed to power, program,
          and operate the microcontroller.
        </p>

        <p className="mt-6 text-base leading-7 text-muted sm:text-xl">
          <span className="text-[var(--accent-secondary)] underline">
            Power regulation and decoupling
          </span>
          : An important part of the design process was understanding
          why a microcontroller needs more than just a power connection.
          I incorporated a TC1017 3.3 V low-dropout regulator to provide
          the required supply voltage for the STM32 and associated
          circuitry. I also researched decoupling capacitors and learned
          why they are placed close to IC power pins: they provide local
          charge during rapid changes in current demand and help reduce
          power-supply noise. This introduced me to the supporting
          circuitry needed for a reliable embedded hardware design.
        </p>

        <p className="mt-6 text-base leading-7 text-muted sm:text-xl">
          <span className="text-[var(--accent-secondary)] underline">
            Power input and SWD programming interface
          </span>
          : I incorporated a USB-C power input and a Serial Wire Debug
          (SWD) header into the design. SWD is a dedicated interface
          used to program and debug STM32 microcontrollers, separate
          from the communication interfaces used by the application.
          Including the header required accounting for the relevant
          programming connections and ensuring that they were accessible
          in the PCB layout. This helped me understand how a custom
          microcontroller board needs to support not only its intended
          function but also firmware development and debugging.
        </p>

        <div className="mt-8 flex justify-center">
          <img
            src="/SchematicA.png"
            alt="Complete temperature monitor circuit schematic in Altium Designer"
            className="glow-border mx-auto w-full max-w-4xl object-contain"
          />
        </div>

        {/* PCB Layout */}
        <p className="mt-6 text-base leading-7 text-muted sm:text-xl">
          <span className="text-[var(--accent-secondary)] underline">
            PCB layout and routing in Altium Designer
          </span>
          : After completing the schematic, I moved into Altium's PCB
          editor and learned how to translate the circuit into a physical
          board design. This involved checking component footprints,
          placing components, arranging connectors, and routing
          electrical connections. I also learned how schematic symbols,
          physical footprints, and PCB pads correspond to one another
          so that the layout accurately represents the intended circuit.
        </p>

        <p className="mt-6 text-base leading-7 text-muted sm:text-xl">
          <span className="text-[var(--accent-secondary)] underline">
            Component placement and signal routing
          </span>
          : I considered how the STM32, thermocouple interface chips,
          regulator, capacitors, USB-C connector, and programming header
          would fit together on the board. The layout process showed me
          that PCB design involves more than connecting matching nets:
          component placement affects routing complexity, power
          connections must be considered alongside signal connections,
          and decoupling capacitors should be positioned close to the
          IC supply pins they support. This helped connect the electrical
          principles behind the schematic to the physical implementation
          of the circuit.
        </p>

        <p className="mt-6 text-base leading-7 text-muted sm:text-xl">
          <span className="text-[var(--accent-secondary)] underline">
            Design rule checking and layout verification
          </span>
          : I used Altium's Design Rule Check (DRC) to identify and
          review potential issues in the PCB layout. This introduced
          me to verifying electrical and physical constraints, including
          clearances, connectivity, and compliance with the design rules
          configured for the board. I also examined the top overlay,
          which contains component identification and silkscreen
          markings, and worked through the relationship between copper
          layers, component footprints, and visible board markings.
        </p>

        <div className="mt-8 grid items-center gap-6 md:grid-cols-1">
          <img
            src="/pcb2.png"
            alt="Routed temperature monitor PCB layout in Altium Designer"
            className="glow-border mx-auto w-full object-cover"
          />
        </div>

        {/* STM32 Development */}
        <p className="mt-6 text-base leading-7 text-muted sm:text-xl">
          <span className="text-[var(--accent-secondary)] underline">
            STM32 development workflow
          </span>
          : Choosing the STM32 also introduced me to the STM32Cube
          development ecosystem. STM32CubeMX provides a graphical
          interface for configuring microcontroller peripherals and
          GPIO assignments and generating initialization code. This
          differs from my original Arduino prototype, where I directly
          manipulated GPIO pins to implement SPI bit-banging. The STM32
          platform provides a path toward configuring hardware
          peripherals and developing firmware for the custom board.
        </p>

        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-center">
          <p className="flex-1 text-base leading-7 text-muted sm:text-xl">
            <span className="text-[var(--accent-secondary)] underline">
              Engineering takeaways
            </span>
            : This project took me from researching a sensor datasheet
            and manually implementing serial communication to designing
            a multi-component embedded PCB. Along the way, I developed
            practical experience with Altium Designer, component
            footprints, voltage regulation, decoupling, programming
            interfaces, PCB routing, and design rule checking. It also
            helped me understand how firmware requirements, circuit
            design, and physical board layout must work together in an
            embedded system.
          </p>
        </div>

        {/* Return to Top */}
        <div className="mt-16 flex justify-center pb-12">
          <a
            href="#top"
            className="project-button rounded-lg border border-[var(--accent)]/50 px-6 py-3 font-medium text-[var(--accent)] hover:text-white"
          >
            Return to Top ↑
          </a>
        </div>
      </div>
    </main>
  );
}
