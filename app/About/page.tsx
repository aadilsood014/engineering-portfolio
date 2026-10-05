export default function About() {
  return (
    <main id="top" className="pb-6 min-h-screen">

      {/* Navbar */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6 sm:px-8 md:px-10">
        <div className="flex items-center">
          <span className="mono-label text-xs font-medium text-muted sm:text-sm">
            AADIL SOOD
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
          / ABOUT
        </p>

        <h1 className="animate-in delay-1 gradient-text mt-4 text-5xl font-bold tracking-tight sm:text-6xl">
          About Me!
        </h1>

        {/* Intro Photos */}
        <div className="animate-in delay-2 mt-8 grid items-center gap-4 md:grid-cols-3">
          <img
            src="/caltech.jpeg"
            alt="Caltech"
            className="glow-border mx-auto h-[250px] w-full rounded-xl object-contain sm:h-[350px] lg:h-[500px]"
          />

          <video
            src="/robot.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="glow-border mx-auto h-[250px] w-full rounded-xl object-contain sm:h-[350px] lg:h-[500px]"
          >
          </video>

          <img
            src="/pfp.jpeg"
            alt="Me"
            className="glow-border mx-auto h-[250px] w-full rounded-xl object-contain sm:h-[350px] lg:h-[500px]"
          />
        </div>

        <p className="mt-8 text-base leading-7 text-muted sm:text-xl">
          My name is Aadil Sood, and I’m a second-year Engineering Physics student interested in building practical solutions at the intersection of electrical systems, hardware, and software.
        </p>

        {/* Why Engineering Physics */}
        <h2 className="gradient-text mt-12 text-2xl font-semibold sm:text-3xl">
          Why Engineering Physics?
        </h2>

        <p className="mt-4 text-base leading-7 text-muted sm:text-xl">
          Engineering Physics stood out to me because of the balance it provides between lectures, laboratory work, and hands-on engineering. I enjoy being able to learn the theory behind a concept in the classroom and then see it come to life through experiments and practical projects. I also value the interdisciplinary nature of the program, as it encourages me to approach problems from different perspectives and draw on ideas across engineering and the physical sciences. That combination of breadth and practical experience is what makes Engineering Physics a great fit for how I like to learn and solve problems.
        </p>

        {/* What I'm Interested In */}
        <h2 className="gradient-text mt-12 text-2xl font-semibold sm:text-3xl">
          What I'm Interested In
        </h2>

        <p className="mt-4 text-base leading-7 text-muted sm:text-xl">
          Electrical engineering has increasingly become one of my strongest interests. Through my engineering projects and work with UBC’s Mars Colony Design Team, I have become fascinated by how electrical systems bring together hardware and software to make complex technologies work reliably. I especially enjoy understanding how signals, sensors, and embedded systems interact to control and monitor physical systems. What interests me most is the opportunity to design electrical systems that solve real-world problems, particularly in areas such as energy and advanced technology where reliability and efficiency are essential.
        </p>

        {/* Beyond Engineering */}
        <h2 className="gradient-text mt-12 text-2xl font-semibold sm:text-3xl">
          Beyond Engineering
        </h2>

        <p className="mt-4 text-base leading-7 text-muted sm:text-xl">
          Outside of engineering, I enjoy following a consistent workout split 
          and playing pickleball. I'm also a big Star Wars fan and will
          happily talk about it far longer than I probably should.
        </p>

      </div>
    </main>
  );
}