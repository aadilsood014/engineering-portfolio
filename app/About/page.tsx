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
            src="/07cf61db-1535-4201-94b4-34623634fdb4.jpg"
            alt="Me"
            className="glow-border mx-auto h-[250px] w-full rounded-xl object-contain sm:h-[350px] lg:h-[500px]"
          />
        </div>

        <p className="mt-8 text-base leading-7 text-muted sm:text-xl">
          My name is Aadil Sood and I am a second year Engineering Physics Student excited to pursue a career
          combining practical engineering aplications with theoretical physics!
        </p>

        {/* Why Engineering Physics */}
        <h2 className="gradient-text mt-12 text-2xl font-semibold sm:text-3xl">
          Why Engineering Physics?
        </h2>

        <p className="mt-4 text-base leading-7 text-muted sm:text-xl">
          Engineering Physics stood out to me because of its balance between
          understanding why something works and learning how to apply it. I especially enjoyed
          exploring the physics behind circuits and electromagnetism in my
          first year, then applying those concepts through laboratory work.
        </p>

        {/* My Design Process */}
        <h2 className="gradient-text mt-12 text-2xl font-semibold sm:text-3xl">
          My Design Process
        </h2>

        <p className="mt-4 text-base leading-7 text-muted sm:text-xl">
          I learn best by experimenting, building, and iterating. For instance, when I began
          learning CAD for competitive robotics, I developed my skills by
          experimenting, testing, and refining components based on every day objects I practiced modelling rather than relying on
          tutorials. Leading a team of three showed me how mechanical design,
          rapid prototyping, and programming can come together to solve real
          problems.
        </p>

        {/* What I'm Interested In */}
        <h2 className="gradient-text mt-12 text-2xl font-semibold sm:text-3xl">
          What I'm Interested In
        </h2>

        <p className="mt-4 text-base leading-7 text-muted sm:text-xl">
          Nuclear engineering has always fascinated me. In high school, I began
          exploring topics beyond the IB Physics curriculum, including reactor
          physics, nuclear binding energy, and radioactive decay chains. What
          interests me most is the ability to harness the enormous energy stored
          within the nucleus and turn it into a safe, reliable, and practical
          source of energy at scale.
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