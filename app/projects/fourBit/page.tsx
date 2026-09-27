export default function Project1() {
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
          4-Bit Transistor Network Binary Adder
        </h1>

        <img
          src="/4main.jpeg"
          alt="4 Bit Adder"
          className="glow-border mx-auto mt-8 h-[250px] w-full object-contain sm:h-[350px] lg:h-[500px]"
        />

        {/* Purpose */}
        <p className="mt-6 text-base leading-7 text-muted sm:text-xl">
          <span className="text-[var(--accent-secondary)] underline">Purpose</span>
          : To design and build a functional 4-bit binary adder using discrete
          transistor-based logic gates, demonstrating the implementation of
          digital logic and binary arithmetic through hardware-level circuit
          design.
        </p>

        {/* Understanding the Task */}
        <p
          className="mt-14 text-base leading-7 text-muted sm:text-xl"
          id="understanding"
        >
          <span className="text-[var(--accent-secondary)] underline">Understanding the Task</span>
          : I got inspired to pursue this project after watching the following
          youtube video by ElectroBOOM (
          <a
            href="https://www.youtube.com/watch?v=2uowMENwiHQ"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent)] hover:underline"
          >
            https://www.youtube.com/watch?v=2uowMENwiHQ
          </a>
          ) which gave an overview of what transistors (specifically BJT
          transistors) are, how they function on a micro scale, and how they can
          be used on a macro scale. I was able to learn how a fundamental
          feature of modern computers serve as the building blocks of the
          logic circuits that make computation possible. Interested in
          expanding my understanding and intuition for computation, I watched
          more videos on the subject, specifically from creators such as
          Veritasium and Ben Eater. Through this, I found the project I wanted
          to pursue: A 4-bit Adder. Why four bits? It was the most achievable
          with the four breadboards I had. Additionally, after some research,
          four-bits is the most common size for computation projects.
        </p>

        <div className="mt-14 flex flex-col gap-8 md:flex-row md:items-center">
          <div className="text-base leading-7 text-muted sm:text-xl">
            Before getting carried away with complex transistor networks, I
            wanted to learn from the absolute basics. So I began using my
            understanding of basic parallel and series connections to create
            simple AND, OR, inverter, and NAND logic gates.
            <br />
            <br />
            After practicing with the fundamental logic gates, I recognized how
            I should approach this project:
            <ol className="mt-6 space-y-4 text-base leading-7 text-muted sm:text-xl">
              <li className="flex gap-2">
                <span className="shrink-0 text-[var(--accent)]">1.</span>
                <span>
                  Design the logic gate system for each bit of the adder.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="shrink-0 text-[var(--accent)]">2.</span>
                <span>Design the individual circuits for each gate.</span>
              </li>
              <li className="flex gap-2">
                <span className="shrink-0 text-[var(--accent)]">3.</span>
                <span>Create the full adder circuit on breadboards.</span>
              </li>
            </ol>
          </div>

          <video
            src="/inverter.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="glow-border mx-auto h-[250px] w-full object-contain sm:h-[350px] lg:h-[500px]"
          />

          <video
            src="/nand.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="glow-border mx-auto h-[250px] w-full object-contain sm:h-[350px] lg:h-[500px]"
          />
        </div>

        {/* Tools & Constraints */}
        <div className="mt-14 flex flex-col gap-8 md:flex-row md:items-center">
          <img
            src="/transistor.jpg"
            alt="transistor"
            className="glow-border mx-auto w-full max-w-[300px] object-cover sm:max-w-[350px] md:mx-0"
          />

          <div className="flex-1">
            <p className="text-base leading-7 text-muted sm:text-xl">
              <span className="text-[var(--accent-secondary)] underline">Tools & Constraints</span>
              : For this project, I used discrete NPN (and, as I later
              discovered I would need) PNP BJT transistors, resistors, LEDs,
              switches, jumper wires, and a solderless breadboard to design and
              construct the logic circuits. I found Falstad Circuit Simulator
              which I used to prototype, test, and verify the behavior of
              individual logic gates and full-adder circuits before physical
              implementation. Alongside the electronic components, I used
              common electronics tools such as wire cutters and needle-nose
              pliers for circuit assembly and troubleshooting.
            </p>
          </div>
        </div>

        <p className="mt-14 text-base leading-7 text-muted sm:text-xl">
          <span className="text-[var(--accent-secondary)] underline">Falstad Simulation</span>
          : After creating some sample logic gates on my breadboard, I wanted a
          more efficient method of prototyping, so I began with using tinkerCAD
          which I had the most familiarity with. Very quickly, however, I
          recognized that this was not feasible as I kept getting errors that
          the software was unable to process the logic due to its complexity.
          This is when I discovered Falstad, which is circuit simulation tool
          used to design, visualize, and test electronic circuits in real time.
          The best part was that it provided interactive analysis of voltages,
          currents, and component behaviour.
          <br />
          <br />
          In order to determine which gates to specifically use I created an
          Excel sheet to visualize the input and output bits for the binary
          addition to recognize any patterns for which logic gates to utilize
          (as shown below). As seen in the left table, the sum bit output
          follows the pattern for an exclusive or (XOR) gate because the sum is
          only one if either one of the inputs is one, but not both. The carry
          bit is an AND gate because both inputs need to be on (1) to give an
          output of 1.
        </p>

        <img
          src="/adderExcel.png"
          alt="adderExcel"
          className="glow-border mx-auto mt-8 w-full object-contain sm:w-[750px] lg:w-[1000px]"
        />

        <p className="mt-8 text-base leading-7 text-muted sm:text-xl">
          Things got more complicated when I started considering how the bits
          after the first would behave because along with the actual digit
          switch input, there is the additional input of the carry bit from the
          previous bit&apos;s computation. For this, I realized compounding
          gates would be useful (taking the output of one gate as the input of
          another).
        </p>

        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-center">
          <div className="flex-1 space-y-6">
            <p className="text-base leading-7 text-muted sm:text-xl">
              The sum bit follows another XOR pattern because we are quite
              literally taking the sum of the carry value and the switch
              inputs. For the carry bit, either the switch inputs are both on
              (just our original AND gate) OR the current sum and the carry are
              both on (another AND gate).
            </p>

            <p className="text-base leading-7 text-muted sm:text-xl">
              After experimenting with the logic components in Falstad, I began
              building up the full four bit system using the identified logic
              gates from above. I used an LED to represent each of the four sum
              bits plus an additional one to indicate the final carry bit.
            </p>

            <p className="text-base leading-7 text-muted sm:text-xl">
              The schematic to the right shows the simulation computing the sum
              of 10 (binary:{" "}
              <span className="font-mono text-[var(--accent-secondary)]">1010</span>) represented by the upper
              switches (reading from bottom to top) and 9 (binary:{" "}
              <span className="font-mono text-[var(--accent-secondary)]">1001</span>) represented by the bottom
              switches. The sum 19 (binary:{" "}
              <span className="font-mono text-[var(--accent-secondary)]">10011</span>) is indicated by the
              LED&apos;s (also reading bottom to top).
            </p>
          </div>

          <img
            src="/adderLogic.png"
            alt="Falstad simulation of a four-bit ripple-carry adder"
            className="glow-border mx-auto w-full max-w-[550px] object-cover md:mx-0"
          />
        </div>

        <p className="mt-14 text-base leading-7 text-muted sm:text-xl">
          <span className="text-[var(--accent-secondary)] underline">Individual Logic Gate Design:</span>
          : Now I could work on a smaller scale and create the transistor
          network for each logic gate. This was actually a simple process (at
          least for now, before I started actually building the circuit and
          faced some major issues) because I had practiced this earlier (see{" "}
          <a
            href="#understanding"
            className="text-[var(--accent)] hover:underline"
          >
            Understanding the Task
          </a>
          ). The AND gate was essentially just a series circuit of two
          transistors (both transistors need current for current to flow through
          the gate) and the OR gate was a parallel circuit of two transistors
          (at least one needs current supplied for the gate to be on). The XOR
          gate took more thinking, but it was essentially just a combination of
          OR and AND, as an AND output is inverted and then ANDed with the OR
          output:{" "}
          <span className="font-serif italic text-[var(--accent-secondary)]">
            A⊕B=(A∨B)∧¬(A∧B)
          </span>
          .
        </p>

        <video
          src="/XOR.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="glow-border mx-auto mt-6 h-auto w-full max-w-[700px] object-contain"
        />

        <div className="mt-14 flex flex-col gap-8 md:flex-row md:items-center">
          <video
            src="/oneBit.mp4"
            playsInline
            controls
            className="glow-border mx-auto h-auto w-full max-w-[300px] object-contain"
          />

          <div className="flex-1">
            <p className="text-base leading-7 text-muted sm:text-xl">
              <span className="text-[var(--accent-secondary)] underline">Building the Adder</span>
              : I followed my Falstad schematics to create my adder on
              breadboards. I used two 4 position DIP switches to represent the
              two numbers in binary as well as LED&apos;s to indicate my total
              binary sum. I attempted to be efficient with the space I took up
              on the breadboard while not making it look like a total confusing
              mess of wires and transistors (as you can guess that did not work
              out and troubleshooting was a nightmare). I was able to create my
              first bit full adder with relative ease, displayed in the video
              on the left.
              <br />
              <br />
              The real issues started showing up when I tried using the carry
              bit as input into the next XOR gate along with the sum of the
              current bit. Unfortunately when connecting a singular transistor
              network after the last transistor&apos;s emitter to the collector
              of the first transistor of the next network, the secondary
              network can affect the results of the first which is not ideal.
              The desired result is the first network&apos;s outputs to be
              independent and the second network to be dependent on the first.
              No matter how many intermediary transistors used, this issue
              persists. Unfortunately I was unaware of this and spent a few
              days just trying to troubleshoot, rewire, and rebuild.
            </p>
          </div>
        </div>

        <p className="mt-8 text-base leading-7 text-muted sm:text-xl">
          After a lot of frustration I decided to take a step back and iterate
          by creating a Falstad transistor network for an XOR gate (sum of
          current bits) and an AND gate&apos;s (previous carry bit) outputs
          being the inputs of another XOR gate. By using LED&apos;s as
          indicators for each gate, I discovered the dependency issue. After
          some research, I found my solution in a PNP transistor. So far, I
          had only been using NPN transistors for my project. A PNP transistor
          works in the opposite manner to an NPN transistor.: It turns on when
          its base is driven lower than its emitter. So, an intermediary PNP
          transistor acts as a buffer by providing current gain, preventing the
          second gate from loading down and interfering with the output of the
          first gate.
          <br />
          <br />
          I decided against directly wiring this added buffer along with
          rebuilding the entire circuit immediately, as I knew it would be a
          very confusing process which would likely lead to a variety of errors
          which also needed to be troubleshooted. Thus, I decided first to
          implement my solution into Falstad by creating compounding transistor
          networks that took the outputs of certain gates as the inputs of
          another. The one below shows an XOR gate and an AND gate being the
          inputs for a secondary XOR gate (current switch sum input and previous
          carry bit input into current bit sum value).
        </p>

        <img
          src="/compoundLogic.png"
          alt="compoundLogicNetwork"
          className="glow-border mx-auto mt-6 w-full max-w-[1000px] object-contain"
        />

        <p className="mt-8 text-base leading-7 text-muted sm:text-xl">
          This prototyping made my task quite a bit easier but I still
          wasn&apos;t ready for the amount of time and frustration that wiring
          four bits of logic would cause. After lots of troubleshooting,
          restarting, and losing track of transistors, I was finally able to
          achieve the desired result: A functional fully-transistor based
          network four bit adder! A demonstration is shown below, adding 11 + 9
          = 20 (in binary:{" "}
          <span className="font-mono text-[var(--accent-secondary)]">1011 + 1001 = 10100</span>).
        </p>

        <video
          src="/adderDemonstration.mp4"
          playsInline
          controls
          className="glow-border mx-auto mt-6 h-auto w-full max-w-[700px] object-contain"
        />

        {/* Conclusion & Reflection */}
        <p className="mt-14 text-base leading-7 text-muted sm:text-xl">
          <span className="text-[var(--accent-secondary)] underline">Conclusion & Reflection</span>
          : In the end, I was able to successfully design and build a
          functional four-bit binary adder entirely from discrete
          transistor-based logic gates. The completed system combined the logic
          gate designs I had developed, the Falstad simulations that guided
          their implementation, and the iterative troubleshooting required to
          translate the design from simulation to physical hardware. Beyond
          demonstrating binary addition, the project gave me a much deeper
          understanding of how transistors can be combined to create
          increasingly complex computational systems. Most importantly,
          working through challenges such as gate loading and signal buffering
          reinforced the importance of prototyping, testing, and refining a
          design when theoretical behavior does not perfectly match real-world
          implementation. Through this project, I not only built a working
          calculator circuit but also gained valuable experience in digital
          logic design, circuit analysis, and hardware debugging.
        </p>

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