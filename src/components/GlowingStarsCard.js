import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const GlowingStarsBackgroundCard = ({ className, children }) => {
  const [mouseEnter, setMouseEnter] = useState(false);

  return (
    <div
      onMouseEnter={() => {
        setMouseEnter(true);
      }}
      onMouseLeave={() => {
        setMouseEnter(false);
      }}
      className={`bg-gradient-to-b from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700 ${className || ""}`}
      style={{
        maxWidth: "500px",
        maxHeight: "450px",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <div className="flex justify-center items-center flex-shrink-0">
        <Illustration mouseEnter={mouseEnter} />
      </div>
      <div className="px-4 py-6 flex-grow overflow-auto">{children}</div>
    </div>
  );
};

export const GlowingStarsDescription = ({ className, children }) => {
  return (
    <p className={`text-base text-white max-w-sm ${className || ""}`}>
      {children}
    </p>
  );
};

export const GlowingStarsTitle = ({ className, children }) => {
  return (
    <h2 className={`font-bold text-2xl text-gray-100 ${className || ""}`}>
      {children}
    </h2>
  );
};

export const Illustration = ({ mouseEnter }) => {
  const stars = 108;
  const columns = 18;

  const [glowingStars, setGlowingStars] = useState([]);

  const highlightedStars = useRef([]);

  useEffect(() => {
    const interval = setInterval(() => {
      highlightedStars.current = Array.from({ length: 5 }, () =>
        Math.floor(Math.random() * stars)
      );
      setGlowingStars([...highlightedStars.current]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: "1px",
        height: "192px",
        padding: "4px",
        width: "100%"
      }}
    >
      {[...Array(stars)].map((_, starIdx) => {
        const isGlowing = glowingStars.includes(starIdx);
        const delay = (starIdx % 10) * 0.1;
        const staticDelay = starIdx * 0.01;
        return (
          <div
            key={`matrix-col-${starIdx}`}
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Star
              isGlowing={mouseEnter ? true : isGlowing}
              delay={mouseEnter ? staticDelay : delay}
            />
            {mouseEnter && <Glow delay={staticDelay} />}
            <AnimatePresence mode="wait">
              {isGlowing && <Glow delay={delay} />}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

const Star = ({ isGlowing, delay }) => {
  return (
    <motion.div
      key={delay}
      initial={{
        scale: 1,
      }}
      animate={{
        scale: isGlowing ? [1, 1.2, 2.5, 2.2, 1.5] : 1,
        background: isGlowing ? "#fff" : "#666",
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        delay: delay,
      }}
      style={{
        backgroundColor: "#666",
        height: "1px",
        width: "1px",
        borderRadius: "50%",
        position: "relative",
        zIndex: 20
      }}
    />
  );
};

const Glow = ({ delay }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        delay: delay,
      }}
      exit={{
        opacity: 0,
      }}
      style={{
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 10,
        height: "4px",
        width: "4px",
        borderRadius: "50%",
        backgroundColor: "#3b82f6",
        boxShadow: "0 0 20px 5px rgba(59, 130, 246, 0.5), 0 0 40px 10px rgba(59, 130, 246, 0.3)"
      }}
    />
  );
};
