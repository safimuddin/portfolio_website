import React from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";

export default function ScrollProgressBar({
  type = "circle",
  position = "bottom-right",
  color = "#AA367C",
  strokeSize = 2,
  showPercentage = false,
}) {
  const { scrollYProgress } = useScroll();

  const scrollPercentage = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const [percentage, setPercentage] = React.useState(0);

  useMotionValueEvent(scrollPercentage, "change", (latest) => {
    setPercentage(Math.round(latest));
  });

  if (type === "bar") {
    return (
      <div
        className="fixed start-0 end-0 top-0 pointer-events-none z-50"
        style={{ height: `${strokeSize + 2}px` }}
      >
        <span
          className="h-full w-full block"
          style={{
            backgroundColor: color,
            width: `${percentage}%`,
          }}
        ></span>
      </div>
    );
  }

  const positionClass = {
    "top-right": "top-6 right-6",
    "bottom-right": "bottom-6 right-6",
    "top-left": "top-6 left-6",
    "bottom-left": "bottom-6 left-6",
  }[position];

  return (
    <div
      className={`fixed flex items-center justify-center pointer-events-none z-50 ${positionClass}`}
    >
      {percentage > 0 && (
        <>
          <svg width="100" height="100" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="30"
              fill="none"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth={strokeSize}
            />
            <motion.circle
              cx="50"
              cy="50"
              r="30"
              pathLength="1"
              stroke={color}
              fill="none"
              strokeDashoffset="0"
              strokeWidth={strokeSize}
              strokeLinecap="round"
              style={{ pathLength: scrollYProgress }}
            />
          </svg>
          {showPercentage && (
            <span className="absolute text-sm font-semibold text-white" style={{ color }}>
              {percentage}%
            </span>
          )}
        </>
      )}
    </div>
  );
}
