import Link from "next/link";

export default function Home() {
  return (
    <main>
      {/* Navbar */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 md:px-10">
        <div className="text-lg font-bold text-white">
          AADIL SOOD
        </div>

        <div className="flex flex-wrap justify-end gap-6 sm:gap-3">
          <a
            href="/About"
            className="project-button inline-block rounded-lg bg-white px-2 py-2 text-sm font-medium text-zinc-950 sm:px-3"
          >
            About
          </a>

          <a
            href="#projects"
            className="project-button inline-block rounded-lg bg-white px-2 py-2 text-sm font-medium text-zinc-950 sm:px-3"
          >
            Projects
          </a>

          <a
            href="#contact"
            className="project-button inline-block rounded-lg bg-white px-2 py-2 text-sm font-medium text-zinc-950 sm:px-3"
          >
            Contact
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 md:px-10 lg:pt-12 lg:pb-12 sm:px-6">
        <div className="grid items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">

          {/* Left side */}
          <div>
            <p className="mb-5 text-sm font-medium tracking-[0.2em] text-zinc-400">
              ENGINEERING PHYSICS @ UBC
            </p>

            <h1 className="text-5xl font-bold tracking-tight text-[var(--accent)] sm:text-6xl lg:text-7xl">
              Hi, I'm Aadil!
            </h1>

            <p className="mt-7 max-w-2xl text-xl leading-relaxed text-zinc-200 sm:text-2xl">
              I'm passionate about learning, and excited to pursue the{" "}
              <span className="text-[var(--accent)]">
                intersection of physics and engineering.
              </span>
            </p>

            <p className="mt-5 text-base leading-7 text-zinc-400 sm:text-lg">
              My experience spans mechanical design, robotics, precision metrology, and instrumentation. I am particularly interested in exploring particle and nuclear physics and developing a deeper understanding of their practical applications. I enjoy applying physics and engineering principles to build practical systems and am eager to expand my experience in these fields.

            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="project-button rounded-lg bg-white px-6 py-3 font-medium text-zinc-950"
              >
                View My Projects →
              </a>

              <a
                href="#contact"
                className="rounded-lg border border-zinc-700 px-6 py-3 font-medium text-zinc-300 transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                Get in Touch
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-5 gap-y-2 text-sm text-zinc-500">
              <span>Mechanical Design</span>
              <span>•</span>
              <span>Robotics</span>
              <span>•</span>
              <span>CAD</span>
              <span>•</span>
              <span>Metrology</span>
              <span>•</span>
              <span>Rapid Prototyping</span>
            </div>
          </div>

          {/* Right side */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="absolute -bottom-4 -right-4 h-full w-full max-w-[350px] rounded-2xl border border-[var(--accent)]/80" />

            <img
              src="/07cf61db-1535-4201-94b4-34623634fdb4.jpg"
              alt="Aadil"
              className="relative w-full max-w-[350px] rounded-2xl object-cover shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Projects */}
      <section
        id="projects"
        className="mx-auto max-w-6xl px-6 md:px-10"
      >
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:mt-6 sm:px-6">
          <Link
            href="/projects/project-1"
            className="project-card block rounded-xl border border-zinc-800 bg-zinc-900 p-8"
          >
            <img
              src="claw1.png"
              alt="Claw"
              className="mb-4 mx-35 relative w-full max-w-[150px] object-cover shadow-2xl"
            />

            <h3 className="text-2xl font-semibold text-[var(--accent)]">
              Automated Mechanical Claw
            </h3>

            <p className="mt-4 leading-relaxed text-zinc-400">
              Designed and fabricated an automated mechanical claw capable of detecting objects and triggering servo-controlled actuation. Developed the mechanical structure using sheet metal and hand tools, then programmed an Arduino to process ultrasonic sensor input and control the servo motor.
            </p>
            <p className="mt-4 leading-relaxed text-zinc-400">
              Skills: C++ · Arduino · Ultrasonic Sensor · Servo Motor · Mechanical Fabrication
            </p>
          </Link>

          <Link
            href="/projects/project-2"
            className="project-card block rounded-xl border border-zinc-800 bg-zinc-900 p-8"
          >
            <h3 className="text-2xl font-semibold">
              Project 2
            </h3>

            <p className="mt-4 leading-relaxed text-zinc-400">
              Info
            </p>
          </Link>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="mx-auto max-w-6xl px-6 py-24 md:px-10"
      >
        <p>GET IN TOUCH</p>

        <h2>Let's build something.</h2>
      </section>
    </main>
  );
}