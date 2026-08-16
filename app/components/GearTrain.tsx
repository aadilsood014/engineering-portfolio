"use client";

import { useEffect, useState } from "react";
import Gear, { getGearRadius } from "./Gear";

const LARGE_TEETH = 20;
const SMALL_TEETH = 10;

const GEAR_OVERLAP = 8;
const LARGE_GEAR_SCALE = 0.85;

export default function GearTrain() {
  const [mounted, setMounted] = useState(false);

  const [scrollRotation, setScrollRotation] = useState(0);

  const [screenWidth, setScreenWidth] = useState(0);

  const [screenHeight, setScreenHeight] = useState(0);

  // ============================
  // MOUNT
  // ============================

  useEffect(() => {
    setMounted(true);
  }, []);

  // ============================
  // SCREEN SIZE
  // ============================

  useEffect(() => {
    if (!mounted) return;

    const updateScreenSize = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    };

    updateScreenSize();

    window.addEventListener("resize", updateScreenSize);

    return () => {
      window.removeEventListener("resize", updateScreenSize);
    };
  }, [mounted]);

  // ============================
  // SCROLL ROTATION
  // ============================

  useEffect(() => {
    if (!mounted) return;

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      const difference = currentScrollY - lastScrollY;

      setScrollRotation((previous) => previous + difference);

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [mounted]);

  // ============================
  // DON'T RENDER UNTIL CLIENT
  // IS READY
  // ============================

  if (!mounted) {
    return null;
  }

  // ============================
  // REMOVE GEAR TRAIN ON MOBILE
  // ============================

  if (screenWidth < 640) {
    return null;
  }

  // ============================
  // RESPONSIVE SCALE
  // ============================

  let trainScale = 1;

  if (screenWidth < 1024) {
    trainScale = 0.75;
  } else {
    trainScale = 1;
  }

  // ============================
  // GEAR RADII
  // ============================

  const largeRadius = getGearRadius(LARGE_TEETH);

  const smallRadius = getGearRadius(SMALL_TEETH);

  // ============================
  // GEAR SPACING
  // ============================

  const centerDistance =
    largeRadius +
    smallRadius -
    GEAR_OVERLAP;

  const horizontalOffset =
    largeRadius -
    smallRadius;

  const verticalDistance =
    Math.sqrt(
      Math.max(
        0,
        centerDistance * centerDistance -
          horizontalOffset * horizontalOffset
      )
    );

  // ============================
  // NUMBER OF GEARS
  // ============================

  const numberOfGears =
    Math.ceil(
      screenHeight /
        (verticalDistance * trainScale)
    ) + 5;

  // ============================
  // EDGE OFFSET
  // ============================

  let edgeOffset = 50;

  if (screenWidth < 1024) {
    edgeOffset = 30;
  }

  // ============================
  // RENDER TRAIN
  // ============================

  const renderTrain = (
    side: "left" | "right"
  ) => {
    return Array.from({
      length: numberOfGears,
    }).map((_, i) => {
      const isLarge = i % 2 === 0;

      const teeth = isLarge
        ? LARGE_TEETH
        : SMALL_TEETH;

      const radius = isLarge
        ? largeRadius
        : smallRadius;

      // ------------------------
      // CENTER
      // ------------------------

      const centerX = isLarge
        ? largeRadius
        : largeRadius +
          horizontalOffset;

      const centerY =
        radius +
        i * verticalDistance;

      // ------------------------
      // POSITION
      // ------------------------

      const left =
        centerX - radius;

      const top =
        centerY - radius;

      // ------------------------
      // ROTATION
      // ------------------------

      const rotation = isLarge
        ? scrollRotation
        : -scrollRotation * 2;

      // ------------------------
      // PHASE
      // ------------------------

      const phase = isLarge
        ? 0
        : 180 / SMALL_TEETH;

      // ------------------------
      // SCALE
      // ------------------------

      const gearScale = isLarge
        ? LARGE_GEAR_SCALE
        : 1;

      return (
        <div
          key={`${side}-${i}`}
          className="absolute"
          style={{
            left:
              side === "left"
                ? `${edgeOffset + left * trainScale}px`
                : undefined,

            right:
              side === "right"
                ? `${edgeOffset + left * trainScale}px`
                : undefined,

            top: `${top * trainScale}px`,

            transform: `scale(${trainScale})`,

            transformOrigin:
              "center center",
          }}
        >
          <Gear
            teeth={teeth}
            rotation={rotation + phase}
            scale={gearScale}
          />
        </div>
      );
    });
  };

  // ============================
  // RENDER
  // ============================

  return (
    <>
      {/* LEFT */}

      <div
        className="pointer-events-none fixed inset-0 overflow-visible"
        style={{
          zIndex: 0,
        }}
      >
        {renderTrain("left")}
      </div>

      {/* RIGHT */}

      <div
        className="pointer-events-none fixed inset-0 overflow-visible"
        style={{
          zIndex: 0,
        }}
      >
        {renderTrain("right")}
      </div>
    </>
  );
}