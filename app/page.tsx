import Link from "next/link";
export default function Home() {
  return (
    <main className="min-h-screen bg-[#080D12]">
      <nav className="mx-auto mt-8 max-w-6xl px6 flex items-center justify-between">
        <h2 className="mx-6">AADIL SOOD</h2>

        <div>
          <a href="/About"
          className="mx-2 project-button inline-block rounded-lg bg-white px-2 
          py-2 font-medium text-zinc-950">About</a>

          <a href="#projects"
          className="mx-2 project-button inline-block rounded-lg bg-white px-2 
          py-2 font-medium text-zinc-950"
          >Projects</a>

          <a href="#contact"
          className="mx-2 project-button inline-block rounded-lg bg-white px-2 
          py-2 font-medium text-zinc-950">
          Contact</a>
        </div>
      </nav>

      <section id="about" className="mx-auto max-w-6xl px-6 py-24">
        <p className="mb-4 text-sm font-medium tracking-widest text-zinc-400">
          ENGINEERING PHYSICS @ UBC
          </p>

        <h1 className="max-w-4xl text-5xl font-bold tracking-tight sm:text-7xl">
          Hi, I'm Aadil. 🚀
        </h1>

        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-zinc-300">
          I’m an Engineering Physics student at UBC interested in
          engineering design, physics, and building practical systems.
        </p>

        <p>
          I'm an Engineering Physics student at the University of
          British Columbia with a passion for engineering design,
          physics, and hands-on problem solving. I enjoy taking
          ideas from theory and turning them into practical systems.
        </p>

        <p className="mt-6 max-w-2xl text-zinc-400 leading-relaxed">
          My experience ranges from mechanical design and competitive robotics
          to precision metrology and instrumentation. I enjoy taking ideas from
          theory and turning them into practical systems.
        </p>

        <a
          href="#projects"
          className="project-button mt-8 inline-block rounded-lg bg-white px-6 
          py-3 font-medium text-zinc-950"
            >
          View My Projects →
        </a>
      </section>

      <section
        id="projects"
        className="mx-auto max-w-6xl px-6 py-24"
      >
        <div className="mt-10 grid gap-6 md:grid-cols-2">

          <Link
            href="/projects/project-1"
            className="project-card block rounded-xl border border-zinc-800 bg-zinc-900 p-8"
          >
            <h3 className="text-2xl font-semibold">
              Project 1
            </h3>

            <p className="mt-4 leading-relaxed text-zinc-400">
              Info
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

      <section id="contact">
        <p>GET IN TOUCH</p>

        <h2>Let's build something.</h2>
      </section>
    </main>
  );
}