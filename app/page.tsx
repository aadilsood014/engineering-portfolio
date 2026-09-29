import Link from "next/link";

export default function Home() {
  return (
    <main>

      {/* Navbar */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-8 py-6 sm:px-10 md:px-10">
        <h2 className="mono-label text-base font-semibold sm:text-lg">
          AADIL SOOD
        </h2>

        <div className="flex flex-wrap justify-end gap-2 sm:gap-3">
          <a
            href="/About"
            className="project-button inline-block rounded-lg border border-[var(--accent)]/50 px-3 py-2 text-sm font-medium text-[var(--accent)] hover:text-white sm:px-3"
          >
            About
          </a>

          <a
            href="#projects"
            className="project-button inline-block rounded-lg border border-[var(--accent)]/50 px-3 py-2 text-sm font-medium text-[var(--accent)] hover:text-white sm:px-5"
          >
            Projects
          </a>

          <a
            href="#contact"
            className="project-button inline-block rounded-lg border border-[var(--accent)]/50 px-3 py-2 text-sm font-medium text-[var(--accent)] hover:text-white sm:px-5"
          >
            Contact
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="border-t border-white/10 pt-16 mx-auto max-w-6xl px-8 sm:px-10 md:px-10 lg:pb-12 lg:pt-12">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">

          {/* Left side */}
          <div>
            <p className="animate-in mono-label mb-5 text-xs font-medium text-muted sm:text-sm">
              ENGINEERING PHYSICS @ UBC
            </p>

            <h1 className="animate-in delay-1 gradient-text text-5xl font-bold tracking-tight sm:text-7xl lg:text-8xl">
              Hi, I'm Aadil!
            </h1>

            <p className="animate-in delay-2 mt-6 max-w-2xl text-lg leading-relaxed text-zinc-200 sm:mt-7 sm:text-2xl">
              I'm passionate about learning, and excited to pursue the{" "}
              <span className="text-[var(--accent-secondary)]">
                intersection of physics and engineering.
              </span>
            </p>

            <p className="animate-in delay-3 mt-5 text-base leading-7 text-muted sm:text-lg">
              My experience spans mechanical design, robotics, precision
              metrology, and instrumentation. I am particularly interested in
              exploring particle and nuclear physics and developing a deeper
              understanding of their practical applications. I enjoy applying
              physics and engineering principles to build practical systems
              and am eager to expand my experience in these fields.
            </p>

            <div className="animate-in delay-4 mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="#projects"
                className="project-button rounded-lg bg-[var(--accent)] px-5 py-3 text-sm font-medium text-white sm:px-8 sm:text-base"
              >
                View My Projects →
              </a>

              <a
                href="#contact"
                className="project-card rounded-lg px-5 py-3 text-sm font-medium text-zinc-300 transition hover:text-[var(--accent-secondary)] sm:px-8 sm:text-base"
              >
                Get in Touch
              </a>
            </div>

            <div className="animate-in delay-4 mono-label mt-8 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted sm:mt-10 sm:gap-x-5">
              <span>Mechanical Design</span>
              <span className="text-[var(--accent)]">•</span>
              <span>Robotics</span>
              <span className="text-[var(--accent)]">•</span>
              <span>CAD</span>
              <span className="text-[var(--accent)]">•</span>
              <span>Metrology</span>
              <span className="text-[var(--accent)]">•</span>
              <span>Rapid Prototyping</span>
            </div>
          </div>

          {/* Right side */}
          <div className="relative mt-4 flex justify-center lg:mt-0 lg:justify-end">
            <div className="absolute -bottom-4 -right-3 h-full w-full max-w-[350px] rounded-2xl border border-[var(--accent-secondary)]/60 sm:-right-4" />

            <img
              src="/pfp.jpeg"
              alt="Aadil"
              className="glow-border relative w-full max-w-[300px] rounded-2xl object-cover sm:max-w-[350px]"
            />
          </div>
        </div>
      </section>

      {/* Projects */}
      <section
        id="projects"
        className="mx-auto max-w-6xl px-8 sm:px-10 md:px-10"
      >
        <p className="mono-label mt-10 text-xs text-[var(--accent-secondary)] sm:mt-12">
          / PROJECTS
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">

          <Link
            href="/projects/fourBit"
            className="project-card block rounded-xl p-6 sm:p-10"
          >
            <div className="mx-auto mb-4 flex h-[220px] w-full max-w-[300px] items-center justify-center">
              <img
                src="/4main.jpeg"
                alt="4Bit"
                className="h-full w-full object-contain"
              />
            </div>

            <h3 className="gradient-text text-2xl font-semibold">
              4-Bit Transistor Network Binary Adder
            </h3>

            <p className="mt-4 leading-relaxed text-muted">
                Designed and built a functional 4-bit binary adder using discrete transistor-based 
                logic gates on a breadboard. Prototyped and tested the transistor logic circuits using Falstad circuit simulation.
                Implemented XOR and AND logic from individual NPN and PNP transistors and combined them into full-adder circuits 
                to perform multi-bit binary addition. 
            </p>

            <p className="mono-label mt-4 text-xs leading-relaxed text-[var(--accent-secondary)]">
              Digital Logic · Transistor Circuits · Boolean Logic · Falstad · Breadboard Prototyping
            </p>
          </Link>

          <Link
            href="/projects/lsm"
            className="project-card block rounded-xl p-6 sm:p-10"
          >
            <div className="mx-auto mb-4 flex h-[220px] w-full max-w-[300px] items-center justify-center">
              <img
                src="/lsm.jpeg"
                alt="LSM"
                className="h-full w-full object-contain"
              />
            </div>

            <h3 className="gradient-text text-2xl font-semibold">
              Laser Scan Micrometer Automation
            </h3>

            <p className="mt-4 leading-relaxed text-muted">
              Automated a LSM measurement workflow to streamline precision measurement and data collection. 
              Developed a Python script to communicate with the instrument over serial communication, capture measurement 
              readings, and automatically export results to Excel template, simplifying the 
              workflow for future technicians.
            </p>

            <p className="mono-label mt-4 text-xs leading-relaxed text-[var(--accent-secondary)]">
              Python · Serial Communication · Excel Automation · Precision Metrology
            </p>
          </Link>

          <Link
            href="/projects/project-1"
            className="project-card block rounded-xl p-6 sm:p-10"
          >
            <div className="mx-auto mb-4 flex h-[220px] w-full max-w-[300px] items-center justify-center">
              <img
                src="/claw1.png"
                alt="Claw"
                className="h-full w-full object-contain"
              />
            </div>

            <h3 className="gradient-text text-2xl font-semibold">
              Automated Mechanical Claw
            </h3>

            <p className="mt-4 leading-relaxed text-muted">
              Designed and fabricated an automated mechanical claw capable of
              detecting objects and triggering servo-controlled actuation.
              Developed the mechanical structure using sheet metal and hand
              tools, then programmed an Arduino to process ultrasonic sensor
              input and control the servo motor.
            </p>

            <p className="mono-label mt-4 text-xs leading-relaxed text-[var(--accent-secondary)]">
              C++ · Arduino · Engineering Drawing ·
              Mechanical Fabrication
            </p>
          </Link>

          <Link
            href="/projects/project-2"
            className="project-card block rounded-xl p-6 sm:p-10"
          >
            <div className="mx-auto mb-4 flex h-[220px] w-full max-w-[300px] items-center justify-center">
              <img
                src="/vexbot.JPG"
                alt="vexbot"
                className="h-full w-full object-contain"
              />
            </div>

            <h3 className="gradient-text text-2xl font-semibold">
              VEX Robotics - Spin Up
            </h3>

            <p className="mt-4 leading-relaxed text-muted">
              Designed and built VEX robots for the Spin Up competition, developing drivetrain and 
              catapult systems through CAD modeling and iterative prototyping. Used Fusion 360 to 
              refine mechanical assemblies and improve robot performance, reliability, and efficiency.
            </p>

            <p className="mono-label mt-4 text-xs leading-relaxed text-[var(--accent-secondary)]">
              Fusion 360 · CAD · Mechanical Design · Subsystem Design · Iterative Design
            </p>
          </Link>

        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="mx-auto max-w-6xl px-8 py-20 sm:px-10 sm:py-24 md:px-10"
      >
          <div className="border-t border-white/10 pt-16">
            <p className="mono-label mb-3 text-sm font-medium text-[var(--accent-secondary)]">
              / CONTACT
            </p>

            <h2 className="gradient-text text-3xl font-semibold tracking-tight sm:text-4xl">
              Let's build something.
            </h2>
          </div>

        <div className="mt-6 flex flex-wrap justify-center gap-2 sm:gap-3">
          <a
            href="https://www.linkedin.com/in/aadilsood14"
            className="project-button inline-block rounded-lg border border-[var(--accent)]/50 px-3 py-2 text-sm font-medium text-[var(--accent)] hover:text-white sm:px-3"
          >
            LinkedIn
          </a>

          <a
            href="mailto:aadilsood014@gmail.com"
            className="project-button inline-block rounded-lg border border-[var(--accent)]/50 px-3 py-2 text-sm font-medium text-[var(--accent)] hover:text-white sm:px-5"
          >
            Email
          </a>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="project-button inline-block rounded-lg border border-[var(--accent)]/50 px-3 py-2 text-sm font-medium text-[var(--accent)] hover:text-white sm:px-5"
          >
            Resume
          </a>
        </div>

      </section>

    </main>
  );
}