"use client";

type GearProps = {
  teeth: number;
  rotation: number;
};

const TOOTH_PITCH = 14;
const TOOTH_HEIGHT = 5;
const ROOT_DEPTH = 3;

export function getGearRadius(teeth: number) {
  return (
    (teeth * TOOTH_PITCH) /
    (2 * Math.PI)
  );
}

function createGearPath(
  cx: number,
  cy: number,
  teeth: number,
  pitchRadius: number
): string {
  const points: [number, number][] = [];

  const rootRadius =
    pitchRadius - ROOT_DEPTH;

  const outerRadius =
    pitchRadius + TOOTH_HEIGHT;

  for (let i = 0; i < teeth; i++) {
    const centerAngle =
      (i * 2 * Math.PI) / teeth;

    const angles = [
      centerAngle -
        (Math.PI / teeth) * 0.50,

      centerAngle -
        (Math.PI / teeth) * 0.20,

      centerAngle +
        (Math.PI / teeth) * 0.20,

      centerAngle +
        (Math.PI / teeth) * 0.50,
    ];

    const radii = [
      rootRadius,
      outerRadius,
      outerRadius,
      rootRadius,
    ];

    for (let j = 0; j < 4; j++) {
      points.push([
        cx +
          Math.cos(angles[j]) *
            radii[j],

        cy +
          Math.sin(angles[j]) *
            radii[j],
      ]);
    }
  }

  return (
    points
      .map(
        ([x, y], i) =>
          `${i === 0 ? "M" : "L"} ${x} ${y}`
      )
      .join(" ") + " Z"
  );
}

export default function Gear({
  teeth,
  rotation,
}: GearProps) {
  const pitchRadius =
    getGearRadius(teeth);

  const outerRadius =
    pitchRadius + TOOTH_HEIGHT;

  /*
    Give the SVG exactly enough room
    for the gear.

    No extra 10px padding.
  */
  const svgSize =
    outerRadius * 2;

  const center = outerRadius;

  const gearPath =
    createGearPath(
      center,
      center,
      teeth,
      pitchRadius
    );

  return (
    <div
      className="absolute"
      style={{
        width: svgSize,
        height: svgSize,

        transform:
          `translate(-50%, -50%) ` +
          `rotate(${rotation}deg)`,
      }}
    >
      <svg
        width={svgSize}
        height={svgSize}
        viewBox={`0 0 ${svgSize} ${svgSize}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={gearPath}
          fill="#3aedb1"
        />

        {/* Center hole */}
        <circle
          cx={center}
          cy={center}
          r={pitchRadius * 0.38}
          fill="#0a0a0a"
        />
      </svg>
    </div>
  );
}