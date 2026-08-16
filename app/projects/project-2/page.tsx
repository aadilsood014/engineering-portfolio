export default function Project1() {
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
          VEX Robotics - Spin Up
        </h1>

        <p className="mt-6 text-base leading-7 text-white sm:text-xl">
          <span className="underline">Purpose</span>
          : To design and build a competitive VEX robot capable of collecting
          and scoring discs, controlling field rollers, and maximizing points
          through strategic field coverage for the VEX Robotics Competition
          Spin Up challenge.
        </p>

        <p className="mt-6 text-base leading-7 text-white sm:text-xl">
          <span className="underline">Understanding the task</span>
          :
        </p>

        <p className="mt-6 text-base leading-7 text-white sm:text-xl">
          <span className="underline">Tools and Equipment</span>
          :
        </p>

        {/* Brainstorming */}
        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-center">

          <p className="flex-1 text-base leading-7 text-white sm:text-xl">
            <span className="underline">Brainstorming</span>
            :
          </p>
        </div>

        <p className="mt-6 text-base leading-7 text-white sm:text-xl">
          <span className="underline">Implementing the solution</span>
          : 
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