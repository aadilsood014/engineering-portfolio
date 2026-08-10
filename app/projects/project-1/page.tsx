"use client";

import { useState } from "react";

export default function Project1() {
  const [isCodeExpanded, setIsCodeExpanded] = useState(false);

  const code = `#include <Servo.h>

#define TRIG_PIN 7
#define ECHO_PIN 5
#define SERVO_PIN 2
#define THRESHOLD 70     // cm

#define TRIGGER_TIME 150    // ms object must stay close
#define COOLDOWN_TIME 800   // ms before another toggle allowed

Servo myServo;

// state variables
bool servoState = false;
bool wasUnderThreshold = false;

unsigned long underStartTime = 0;
unsigned long lastToggleTime = 0;

long getDistanceCM() {
digitalWrite(TRIG_PIN, LOW);
delayMicroseconds(2);

digitalWrite(TRIG_PIN, HIGH);
delayMicroseconds(10);
digitalWrite(TRIG_PIN, LOW);

long duration = pulseIn(ECHO_PIN, HIGH, 30000);
long distance = duration * 0.034 / 2;

return distance;
}

void setup() {
pinMode(TRIG_PIN, OUTPUT);
pinMode(ECHO_PIN, INPUT);

myServo.attach(SERVO_PIN);
myServo.write(0);

Serial.begin(9600);
}

void loop() {
long distance = getDistanceCM();
bool isUnderThreshold = (distance < THRESHOLD);
unsigned long now = millis();

// Start timing when object first enters range
if (isUnderThreshold && !wasUnderThreshold) {
underStartTime = now;
}

// Trigger only if:
// 1. Object stayed close long enough
// 2. Cooldown has passed
if (isUnderThreshold &&
(now - underStartTime >= TRIGGER_TIME) &&
(now - lastToggleTime >= COOLDOWN_TIME)) {

servoState = !servoState;
lastToggleTime = now;

}

// Move servo
myServo.write(servoState ? 90 : 0);

wasUnderThreshold = isUnderThreshold;

Serial.print("Distance: ");
Serial.println(distance);

delay(30); // small smoothing delay
`;

  return (
    <main id="top">

      {/* Navbar */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6 sm:px-6 md:px-10">
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
      <div className="mx-auto max-w-6xl px-6 sm:px-8 md:px-10">

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-[var(--accent)] sm:text-5xl">
          Automated Mechanical Claw
        </h1>

        <p className="mt-6 text-base leading-7 text-white sm:text-xl">
          <span className="underline">Purpose</span>
          : To design and build a fully autonomous claw, which has the ability
          to pick up and transfer numerous objects varying in size, shape, and
          weight for a design competition in my UBC APSC 101 Class.
        </p>

        <p className="mt-6 text-base leading-7 text-white sm:text-xl">
          <span className="underline">Understanding the task</span>
          : I worked with my APSC group to take on the challenge. We had to
          create an autonomous claw which could detect when an object was
          underneath it, pick it up and automatically drop it when lowered
          into a delivery basket. This challenge was broken up into three
          different rounds, each with their own unique challenges and
          obstacles:
        </p>

        <ol className="mt-6 space-y-4 text-base leading-7 text-white sm:text-xl">
          <li className="flex gap-2">
            <span className="shrink-0">Round 1 - </span>
            <span>
              A sequence of random objects of varying shapes and sizes.
            </span>
          </li>

          <li className="flex gap-2">
            <span className="shrink-0">Round 2 - </span>
            <span>
              A batch of identically shaped blocks with the goal of picking up
              as many as possible.
            </span>
          </li>

          <li className="flex gap-2">
            <span className="shrink-0">Round 3 - </span>
            <span>
              Bulk round with a variety of larger objects that can be lifted up
              by collaborating with other teams’ claws within the same section.
            </span>
          </li>
        </ol>

        <p className="mt-6 text-base leading-7 text-white sm:text-xl">
          <span className="underline">Tools and Equipment</span>
          : We were permitted to use Arduino electronics limited to one servo
          motor, one sonar sensor, one microcontroller board, and no external
          power modules. Additionally, we were given six sheets of 15x15 cm
          sheet metal, string, popsicle sticks, and hot glue guns. Within
          studio time we could use a variety of hand tools.
        </p>

        {/* Brainstorming */}
        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-center">
          <img
            src="/brainstorm.png"
            alt="Brainstorm"
            className="mx-auto w-full max-w-[300px] object-cover shadow-2xl sm:max-w-[350px] md:mx-0"
          />

          <p className="flex-1 text-base leading-7 text-white sm:text-xl">
            <span className="underline">Brainstorming</span>
            : Each team member came up with unique ideas to tackle the problem,
            mainly considering how to transfer the fixed rotational motion of
            the servo motor into opening and closing a claw.

            <br />
            <br />

            Based on this focused prototype made by one of my team members, we
            settled on a system that had two claw plates attached to the claw
            housing with freely movable joints. These plates would be attached
            to string that could be connected to a servo motor which would
            tighten it and thus, close the claw. When the servo would spin the
            other way the string would loosen and gravity would allow the claw
            to open up.
          </p>
        </div>

        {/* TinkerCAD */}
        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-center">
          <p className="flex-1 text-base leading-7 text-white sm:text-xl">
            However, this was only half of the task, as we needed to figure out
            how to make this system autonomous. Thus, I first started playing
            around with TinkerCAD to see how a sonar sensor could interact with
            the servo motor effectively.
          </p>

          <img
            src="/tinker.png"
            alt="TinkerCAD Setup"
            className="mx-auto w-full max-w-[300px] object-cover shadow-2xl sm:max-w-[350px] md:mx-0"
          />
        </div>

        <p className="mt-6 text-base leading-7 text-white sm:text-xl">
          I setup a threshold distance that the sonar sensor would detect and
          rotate the servo accordingly. However, this was not the ideal
          solution as the servo would toggle between the two positions as I
          moved in and out of the threshold value. Thus, I realized that I
          needed to code it so that the object needed to go within the
          threshold value to toggle the position, and then out of the
          threshold value and back in again before toggling the position again.
          This required a lot of troubleshooting, but this code ended up
          working extremely well:
        </p>

        {/* Expandable Code Section */}
        <div className="mt-8 flex justify-center">
          <div className="w-full max-w-4xl overflow-hidden rounded-xl border border-[#8B7CF6]/25 bg-[#11101A]">

            {/* Code Header */}
            <div className="border-b border-[#8B7CF6]/15 bg-[#171522] px-4 py-3 sm:px-5">
              <span className="font-mono text-sm text-[#A69CF8]">
                Arduino.ino
              </span>
            </div>

            {/* Code */}
            <div
              className={`relative overflow-hidden transition-all duration-500 ${
                isCodeExpanded ? "max-h-[2000px]" : "max-h-[250px]"
              }`}
            >
              <pre className="overflow-x-auto p-3 sm:p-6">
                <code className="font-mono text-[10px] leading-[1.35] text-[#E4E1F5] sm:text-[13px]">
                  {code}
                </code>
              </pre>

              {/* Fade effect */}
              {!isCodeExpanded && (
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#11101A] to-transparent" />
              )}
            </div>

            {/* Expand Button */}
            <div className="border-t border-[#8B7CF6]/15 bg-[#171522] p-3 text-center">
              <button
                onClick={() => setIsCodeExpanded(!isCodeExpanded)}
                className="rounded-lg px-5 py-2 text-sm font-medium text-[#A69CF8] transition hover:bg-[#8B7CF6]/10 hover:text-white"
              >
                {isCodeExpanded ? "Hide Code ↑" : "View Full Code ↓"}
              </button>
            </div>

          </div>
        </div>

        <p className="mt-6 text-base leading-7 text-white sm:text-xl">
          This allowed me to easily change the threshold value to the height of
          the opened claw so when it touched the ground it would close up and
          the only way it would open and drop an object if it touched the ground
          again. I ended up having to add a cooldown time factor which was useful
          to prevent jittery opening and closing motions when the claw was near
          the threshold value.
        </p>

        <p className="mt-6 text-base leading-7 text-white sm:text-xl">
          <span className="underline">Implementing the solution</span>
          : Before we touched the actual sheet metal, we made detailed
          orthographic drawings and circuit schematics which would outline
          exactly what steps needed to be taken to implement our idea. Some of
          these are attached below:
        </p>

        {/* Orthographic drawings */}
        <div className="mt-8 grid items-center gap-6 md:grid-cols-2">
          <img
            src="/ortho1.jpg"
            alt="Ortho1"
            className="mx-auto w-full object-cover shadow-2xl"
          />

          <img
            src="/ortho2.jpg"
            alt="Ortho2"
            className="mx-auto w-full object-cover shadow-2xl"
          />
        </div>

        {/* Circuit */}
        <img
          src="/circuit.png"
          alt="circuit"
          className="mx-auto mt-8 w-full max-w-[700px] object-cover shadow-2xl"
        />

        {/* Final Claw */}
        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-center">
          <p className="flex-1 text-base leading-7 text-white sm:text-xl">
            When assembling the claw a few problems arose that needed to be
            addressed. For instance, the range of motion of the claw was
            relatively limited due to the servo only rotating 180 degrees. To
            address this, I realized that if I used a popsicle stick and
            attached it on top of the servo motor the strings could be attached
            to the ends of the stick which was advantageous because the stick
            was longer than the servo attachment points, meaning that even with
            the same 180 degree rotation, the strings could be further tightened
            from covering a larger circumference. This allowed a complete
            vertical open position of the claw as well as completely closed
            position that the Arduino could toggle between. The result was a
            very successful claw that was able to perform in all three
            challenges, its boxy shape and tape barrier allowing various larger
            objects to be picked up, as well as multiple blocks at the same time.
          </p>

          <img
            src="/finalClaw.jpg"
            alt="Final Claw"
            className="mx-auto w-full max-w-[300px] object-cover shadow-2xl sm:max-w-[350px] md:mx-0"
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