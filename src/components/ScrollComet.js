import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const ScrollComet = () => {
  const { scrollYProgress } = useScroll();
  const [comets, setComets] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    // Create comets with fixed starting positions at the top
    const cometArray = [
      { 
        id: 1, 
        startProgress: 0, 
        xOffset: "10%", 
        yOffset: "-20%", 
        scale: 0.6,
        speed: 0.8,
        size: 6, // Reduced from 20
        color: "rgba(255, 255, 255, 0.9)",
        trailColor: "rgba(173, 216, 230, 0.8)"
      },
      { 
        id: 2, 
        startProgress: 0.1, 
        xOffset: "40%", 
        yOffset: "-15%", 
        scale: 0.5,
        speed: 1.1,
        size: 5, // Reduced from 16
        color: "rgba(255, 255, 255, 0.8)",
        trailColor: "rgba(255, 200, 230, 0.8)"
      },
      { 
        id: 3, 
        startProgress: 0.2, 
        xOffset: "70%", 
        yOffset: "-25%", 
        scale: 0.5,
        speed: 0.7,
        size: 6, // Reduced from 18
        color: "rgba(255, 255, 255, 0.85)",
        trailColor: "rgba(200, 230, 255, 0.8)"
      },
      { 
        id: 4, 
        startProgress: 0.35, 
        xOffset: "25%", 
        yOffset: "-30%", 
        scale: 0.4,
        speed: 1.3,
        size: 4, // Reduced from 14
        color: "rgba(255, 255, 255, 0.75)",
        trailColor: "rgba(230, 255, 200, 0.8)"
      },
      { 
        id: 5, 
        startProgress: 0.5, 
        xOffset: "85%", 
        yOffset: "-10%", 
        scale: 0.7,
        speed: 0.9,
        size: 7, // Reduced from 22
        color: "rgba(255, 255, 255, 0.95)",
        trailColor: "rgba(255, 230, 200, 0.8)"
      },
    ];
    setComets(cometArray);
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="scroll-comet-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden'
      }}
    >
      {comets.map((comet) => (
        <CometPath 
          key={comet.id} 
          scrollYProgress={scrollYProgress} 
          comet={comet}
        />
      ))}
    </div>
  );
};

const CometPath = ({ scrollYProgress, comet }) => {
  // Control animation based on scroll
  const pathLength = useTransform(
    scrollYProgress, 
    [comet.startProgress, Math.min(comet.startProgress + 0.4, 1)], 
    [0, 1]
  );
  
  const cometOpacity = useTransform(
    scrollYProgress,
    [comet.startProgress, Math.min(comet.startProgress + 0.3, 1)],
    [0, 1]
  );

  // Generate a simple diagonal path from top to bottom
  const getCometPath = () => {
    // Convert percentage offsets to numbers
    const xOffsetNum = parseFloat(comet.xOffset);
    
    // Start at the comet's xOffset position, slightly above the screen
    const startX = xOffsetNum;
    const startY = -20; // Start above the screen
    const endX = startX + (Math.random() * 40 - 20); // Slight curve
    const endY = 120; // End below the screen
    
    // Create a gentle curve
    const controlX1 = startX + (Math.random() * 30 - 15);
    const controlY1 = startY + 30;
    const controlX2 = startX + (Math.random() * 30 - 15);
    const controlY2 = startY + 60;
    
    return `M ${startX}% ${startY}% C ${controlX1}% ${controlY1}%, ${controlX2}% ${controlY2}%, ${endX}% ${endY}%`;
  };

  const cometPath = getCometPath();

  return (
    <>
      {/* Comet Trail - SVG Path */}
      <svg
        width="100%"
        height="100%"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          overflow: 'visible',
          pointerEvents: 'none'
        }}
      >
        <defs>
          {/* Main trail gradient */}
          <linearGradient id={`cometTrailGradient-${comet.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={comet.color} stopOpacity="0.2" />
            <stop offset="30%" stopColor={comet.trailColor} stopOpacity="0.8" />
            <stop offset="70%" stopColor={comet.trailColor} stopOpacity="0.4" />
            <stop offset="100%" stopColor={comet.trailColor} stopOpacity="0" />
          </linearGradient>
          
          {/* Bright center line */}
          <linearGradient id={`cometCenterLine-${comet.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.9)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0.2)" />
          </linearGradient>
          
          {/* Comet head gradient */}
          <radialGradient id={`cometHeadGlow-${comet.id}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 1)" />
            <stop offset="60%" stopColor={comet.color} />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
          </radialGradient>
          
          {/* Glow filter */}
          <filter id={`glow-${comet.id}`}>
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Comet Trail - Main line */}
        <motion.path
          d={cometPath}
          stroke={`url(#cometTrailGradient-${comet.id})`}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          style={{
            pathLength,
            opacity: cometOpacity,
            filter: `url(#glow-${comet.id})`
          }}
        />

        {/* Comet Trail - Bright center line */}
        <motion.path
          d={cometPath}
          stroke={`url(#cometCenterLine-${comet.id})`}
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          style={{
            pathLength,
            opacity: cometOpacity
          }}
        />
      </svg>

      {/* Comet Head - Now as an SVG element for better sync with path */}
      <svg
        width="100%"
        height="100%"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          overflow: 'visible',
          pointerEvents: 'none'
        }}
      >
        <motion.g
          style={{
            offsetPath: `path('${cometPath}')`,
            offsetDistance: pathLength,
          }}
        >
          {/* Outer glow */}
          <circle
            cx="0"
            cy="0"
            r={comet.size * 1.5}
            fill={`url(#cometHeadGlow-${comet.id})`}
            filter={`url(#glow-${comet.id})`}
            opacity={0.6}
          />
          
          {/* Inner glow */}
          <circle
            cx="0"
            cy="0"
            r={comet.size}
            fill={comet.color}
            filter="drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))"
          />
          
          {/* Core */}
          <circle
            cx="0"
            cy="0"
            r={comet.size * 0.6}
            fill="rgba(255, 255, 255, 1)"
            filter="drop-shadow(0 0 4px rgba(255, 255, 255, 1))"
          />
        </motion.g>
      </svg>

      {/* Particle trail effect - smaller stars */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="particle"
          style={{
            position: 'absolute',
            width: `${Math.random() * 2 + 0.5}px`, // Much smaller: 0.5px to 2.5px
            height: `${Math.random() * 2 + 0.5}px`,
            background: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '50%',
            left: comet.xOffset,
            top: comet.yOffset,
            opacity: 0,
            boxShadow: '0 0 3px 1px rgba(255, 255, 255, 0.5)'
          }}
          animate={{
            x: [
              0, 
              Math.random() * 60 - 30, 
              Math.random() * 80 - 40, 
              Math.random() * 100 - 50
            ],
            y: [
              0, 
              50 + Math.random() * 30, 
              120 + Math.random() * 40, 
              200 + Math.random() * 50
            ],
            opacity: [0, 0.9, 0.6, 0],
            scale: [0, 1, 0.8, 0]
          }}
          transition={{
            duration: 2 + Math.random() * 1,
            delay: i * 0.05 + comet.id * 0.3,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </>
  );
};

export default ScrollComet;