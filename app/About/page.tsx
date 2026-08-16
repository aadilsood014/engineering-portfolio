export default function About() {
  return (
    <main id="top" className="pb-6 min-h-screen bg-[#080D12]">

      {/* Navbar */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6 sm:px-8 md:px-10">
        <div className="flex items-center">
          <span className="text-xs font-medium tracking-[0.2em] text-zinc-400 sm:text-sm">
            AADIL SOOD
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
          About Me!
        </h1>

        {/* Intro Photos */}
        <div className="mt-8 grid items-center gap-2 md:grid-cols-3">
          <img
            src="/caltech.jpeg"
            alt="Caltech"
            className="mx-auto h-[250px] w-full object-contain shadow-2xl sm:h-[350px] lg:h-[500px]"
          />

          <video
            src="/robot.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="mx-auto h-[250px] w-full object-contain shadow-2xl sm:h-[350px] lg:h-[500px]"
          >
          </video>

          <img
            src="/07cf61db-1535-4201-94b4-34623634fdb4.jpg"
            alt="Me"
            className="mx-auto h-[250px] w-full object-contain shadow-2xl sm:h-[350px] lg:h-[500px]"
          />
        </div>

        <p className="mt-6 text-base leading-7 text-white sm:text-xl">
          My name is Aadil Sood and I am a second year Engineering Physics Student excited to pursue a career
          combining practical engineering aplications with theoretical physics!
        </p>

        {/* Why Engineering Physics */}
        <h2 className="mt-10 text-2xl font-semibold text-[var(--accent)] sm:text-3xl">
          Why Engineering Physics?
        </h2>

        <p className="mt-4 text-base leading-7 text-white sm:text-xl">
          Engineering Physics stood out to me because of its balance between
          understanding why something works and learning how to apply it. I especially enjoyed
          exploring the physics behind circuits and electromagnetism in my
          first year, then applying those concepts through laboratory work.
        </p>

        {/* My Design Process */}
        <h2 className="mt-10 text-2xl font-semibold text-[var(--accent)] sm:text-3xl">
          My Design Process
        </h2>

        <p className="mt-4 text-base leading-7 text-white sm:text-xl">
          I learn best by experimenting, building, and iterating. For instance, when I began
          learning CAD for competitive robotics, I developed my skills by
          experimenting, testing, and refining components based on every day objects I practiced modelling rather than relying on
          tutorials. Leading a team of three showed me how mechanical design,
          rapid prototyping, and programming can come together to solve real
          problems.
        </p>

        {/* What I'm Interested In */}
        <h2 className="mt-10 text-2xl font-semibold text-[var(--accent)] sm:text-3xl">
          What I'm Interested In
        </h2>

        <p className="mt-4 text-base leading-7 text-white sm:text-xl">
          Nuclear engineering has always fascinated me. In high school, I began
          exploring topics beyond the IB Physics curriculum, including reactor
          physics, nuclear binding energy, and radioactive decay chains. What
          interests me most is the ability to harness the enormous energy stored
          within the nucleus and turn it into a safe, reliable, and practical
          source of energy at scale.
        </p>

        {/* Beyond Engineering */}
        <h2 className="mt-10 text-2xl font-semibold text-[var(--accent)] sm:text-3xl">
          Beyond Engineering
        </h2>

        <p className="mt-4 text-base leading-7 text-white sm:text-xl">
          Outside of engineering, I enjoy following a consistent workout split 
          and playing pickleball. I'm also a big Star Wars fan and will
          happily talk about it far longer than I probably should.
        </p>

      </div>
    </main>
  );
}