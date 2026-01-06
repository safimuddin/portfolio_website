'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

const DEFAULT_SPRING_OPTIONS = {
  stiffness: 200,
  damping: 50,
  restDelta: 0.001,
};

export function ScrollProgress({
  className = '',
  springOptions = DEFAULT_SPRING_OPTIONS,
  containerRef = null,
}) {
  const { scrollYProgress } = useScroll({
    container: containerRef,
    layoutEffect: containerRef?.current !== null,
  });

  const scaleY = useSpring(scrollYProgress, {
    ...(springOptions || DEFAULT_SPRING_OPTIONS),
  });

  return (
    <motion.div
      className={`inset-y-0 left-0 w-1 origin-top ${className}`}
      style={{
        scaleY,
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        width: '4px',
        transformOrigin: 'top',
        background: 'white',
        zIndex: 50,
      }}
    />
  );
}
