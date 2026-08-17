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

        {/* Purpose */}
        <p className="mt-6 text-base leading-7 text-white sm:text-xl">
          <span className="underline">Purpose</span>
          : To design and build a competitive VEX robot capable of collecting
          and scoring discs, controlling field rollers, and maximizing points
          through strategic field coverage for the VEX Robotics Competition
          Spin Up challenge.
        </p>

        {/* Understanding the Task */}
        <p className="mt-14 text-base leading-7 text-white sm:text-xl">
          <span className="underline">Understanding the Task</span>
          : I worked with two other teammates to take on the VEX Robotics
          Competition Spin Up challenge. Our first step was understanding the
          game manual and breaking down the different scoring opportunities,
          rules, and requirements that would influence our robot design. The
          game required us to score Discs into the High and Low Goals,
          manipulate Rollers, and contribute to the Endgame while competing in
          both an Autonomous Period and a Driver-Controlled Period. This meant
          that our robot needed to combine multiple subsystems efficiently and
          seamlessly.
        </p>

        <img
          src="/field.png"
          alt="Spin Up competition field"
          className="mx-auto mt-8 h-[250px] w-full object-contain shadow-2xl sm:h-[350px] lg:h-[500px]"
        />

        <p className="mt-8 text-base leading-7 text-white sm:text-xl">
          Because we were a team of three, all new to robotics, we also
          established basic team roles early in the design process based on
          general interest. I took the role of design lead, focusing on
          mechanical design and CAD, while my teammates focused on
          programming/autonomous development and driving, and strategy.
          Although we had individual responsibilities, we worked
          collaboratively when making major design decisions.

          <br />
          <br />

          We identified the main subsystems our robot would need:
        </p>

        <ol className="mt-6 space-y-4 text-base leading-7 text-white sm:text-xl">
          <li className="flex gap-2">
            <span className="shrink-0">Drivetrain - </span>
            <span>
              A fast and controllable base capable of navigating the field and
              positioning accurately.
            </span>
          </li>

          <li className="flex gap-2">
            <span className="shrink-0">Disc Intake - </span>
            <span>
              A mechanism capable of collecting Discs quickly while respecting
              the three-Disc possession limit.
            </span>
          </li>

          <li className="flex gap-2">
            <span className="shrink-0">Scoring Mechanism - </span>
            <span>
              A reliable system for transferring and launching Discs into the
              High Goal.
            </span>
          </li>

          <li className="flex gap-2">
            <span className="shrink-0">Roller Mechanism - </span>
            <span>
              A way to interact with and change the colour of the field Rollers.
            </span>
          </li>

          <li className="flex gap-2">
            <span className="shrink-0">Autonomous System - </span>
            <span>
              A programmed routine capable of navigating the field and
              completing scoring objectives without driver input.
            </span>
          </li>

          <li className="flex gap-2">
            <span className="shrink-0">Endgame Expansion - </span>
            <span>
              A mechanism that allowed us to compete for the final scoring
              opportunities during the Endgame.
            </span>
          </li>
        </ol>

        {/* Tools & Constraints */}
        <div className="mt-14 flex flex-col gap-8 md:flex-row md:items-center">
          <div className="flex-1">
            <p className="text-base leading-7 text-white sm:text-xl">
              <span className="underline">Tools & Constraints</span>
              : For the project, we primarily used the VEX V5 robotics platform,
              including the V5 Brain, Controller, sensors, gears, wheels, and
              structural components to build and operate the robot, as well as
              8 motors (as was the limit). For programming, we used VEXcode V5
              to develop both the robot&apos;s driver-control code and
              autonomous routines. Fusion 360 was used for CAD modelling,
              allowing us to design and visualize custom components and
              mechanisms before constructing them. Alongside the VEX equipment,
              we used common workshop tools such as hex keys, screwdrivers, and
              wrenches.
            </p>
          </div>

          <img
            src="/v5.jpg"
            alt="VEX V5 system"
            className="mx-auto w-full max-w-[300px] object-cover shadow-2xl sm:max-w-[350px] md:mx-0"
          />
        </div>

        {/* Drivetrain & Scoring */}
        <p className="mt-14 text-base leading-7 text-white sm:text-xl">
          <span className="underline">Drivetrain & Scoring</span>
          : We began by deciding how to use our limited eight-motor allowance.
          For the drivetrain, we wanted to preserve motors for scoring, so we
          chose a simple four-motor drivetrain optimized for speed with a
          straightforward gear ratio.
        </p>

        <div className="mt-6 flex flex-col gap-8 md:flex-row md:items-center">
          <img
            src="/temp.jpeg"
            alt="Temporary robot"
            className="mx-auto w-full max-w-[300px] object-cover shadow-2xl md:mx-0"
          />

          <div className="flex-1">
            <p className="text-base leading-7 text-white sm:text-xl">
              Our research narrowed the scoring mechanism down to a flywheel or
              catapult. After comparing cycle time, reliability, complexity, and
              autonomous performance, we ultimately chose a catapult because of
              its reliability and consistency. However, the specific gears and
              pinions required for our catapult were not in our stock and had to
              be ordered. To compete in earlier tournaments, we built a makeshift
              flywheel using the parts we already had, allowing us to continue
              testing while waiting for the required components.
            </p>
          </div>
        </div>

        {/* Roller & Endgame */}
        <p className="mt-14 text-base leading-7 text-white sm:text-xl">
          <span className="underline">Roller & Endgame</span>
          : We deliberately left the Roller and Expansion systems until later
          since they were less critical and mechanically simpler. Our prototypes
          used a motor-driven wheel for the Rollers and a pneumatic string
          expansion system for the Endgame.
        </p>

        {/* Intake */}
        <p className="mt-14 text-base leading-7 text-white sm:text-xl">
          <span className="underline">Intake Development</span>
          : For our intake, we initially planned to use flexwheels, which were
          widely used in Spin Up because their flexible surfaces provided
          excellent grip on the Discs. However, flexwheels were in extremely
          high demand, making them expensive and difficult to obtain. We
          therefore explored alternatives rather than designing around a
          component we could not reliably access.
        </p>

        <div className="mt-6 flex flex-col gap-8 md:flex-row md:items-center">
          <div className="flex-1 text-base leading-7 text-white sm:text-xl">
            <p>
              Our first alternative was a chain-based conveyor system using VEX
              flaps to carry Discs into the robot. While the concept worked, the
              flaps would frequently slip on the Discs, making the intake
              inconsistent. While working with the pneumatic plastic tubing
              used for our expansion system, I noticed that it had significantly
              more grip than the materials we had been testing. I designed an
              alternative intake that used bearings with short segments of
              pneumatic tubing threaded through them, creating a flexible,
              high-traction surface that could grab and pull Discs into the
              robot without requiring flexwheels.
            </p>
          </div>

          <img
            src="/intake.png"
            alt="Intake"
            className="mx-auto w-full max-w-[300px] object-cover shadow-2xl sm:max-w-[350px] md:mx-0"
          />
        </div>

        {/* Implementing the Catapult */}
        <p className="mt-14 text-base leading-7 text-white sm:text-xl">
          <span className="underline">Implementing the Catapult</span>
          : Once our required gears and pinions arrived, we began implementing
          the catapult mechanism. Although the concept looked straightforward
          in CAD, the physical implementation required significantly more
          testing and mechanical refinement than we initially expected. In Fusion
          360, I modelled the catapult using a rotary joint with a restricted
          range of motion, which allowed me to visualize where the mechanism would
          move. However, CAD could not accurately model the torque, acceleration,
          and forces produced by the motor and gear system.
        </p>

        <div className="mt-6 flex flex-col gap-8 md:flex-row md:items-center">
          <div className="w-full md:w-[42%] md:shrink-0">
            <video
              src="/catapult.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="mx-auto w-full object-cover shadow-2xl"
            />
          </div>

          <div className="flex-1 text-base leading-7 text-white sm:text-xl">
            <p>
              To achieve the required motion in practice, we had to tune the gear
              ratio and physical position of the mechanism through repeated
              testing. One of our main methods of adjustment was carefully
              shaving teeth from the larger gear, changing the final position
              and range of the catapult. Because removing a tooth was permanent,
              we could not simply reverse an adjustment if we went too far. We
              therefore tested the mechanism incrementally, making small and
              conservative changes until we reached the ideal range of motion for
              consistently launching Discs into the High Goal.
            </p>
          </div>
        </div>

        <p className="mt-6 text-base leading-7 text-white sm:text-xl">
          This process taught me an important limitation of CAD: a mechanism can
          appear correct geometrically while still behaving very differently once
          real forces are introduced. The final catapult was therefore the result
          of both the CAD design and a careful test-and-refine engineering process.
        </p>

        {/* Conclusion & Reflection */}
        <p className="mt-14 text-base leading-7 text-white sm:text-xl">
          <span className="underline">Conclusion & Reflection</span>
          : Our final robot combined the mechanical systems we had developed with
          the CAD work and iterative testing that guided their implementation. I
          was able to present our completed robot design, CAD models, and
          subsystem animations during a tournament interview, demonstrating not
          only the robot itself but also the engineering process behind it.
          Alongside our competition performance, our ability to clearly
          communicate our design decisions and development process contributed
          to our team receiving the Judges Award at the Penguin Robotics
          tournament.
        </p>

        {/* Final Images */}
        <div className="mt-8 grid items-center gap-2 md:grid-cols-3">
          <img
            src="/vexbot.JPG"
            alt="Award"
            className="mx-auto h-[250px] w-full object-contain shadow-2xl sm:h-[350px] lg:h-[500px]"
          />

          <video
            src="/robot.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="mx-auto h-[250px] w-full object-contain shadow-2xl sm:h-[350px] lg:h-[500px]"
          />

          <img
            src="/tempbot.jpg"
            alt="Temporary robot"
            className="mx-auto h-[250px] w-full object-contain shadow-2xl sm:h-[350px] lg:h-[500px]"
          />
        </div>

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