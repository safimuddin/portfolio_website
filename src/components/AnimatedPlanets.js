import React, { useEffect, useRef } from 'react';

/**
 * AnimatedPlanets Component
 * Creates a Three.js-like space scene with animated planets
 * rendered on an HTML5 Canvas with orbital mechanics
 */
const AnimatedPlanets = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Main orbital planets (centered)
    const planets = [
      {
        name: 'Mercury',
        radius: 6,
        distance: 80,
        speed: 0.04,
        color: '#8C7853',
        angle: Math.random() * Math.PI * 2
      },
      {
        name: 'Venus',
        radius: 10,
        distance: 140,
        speed: 0.015,
        color: '#FFC649',
        angle: Math.random() * Math.PI * 2
      },
      {
        name: 'Earth',
        radius: 11,
        distance: 200,
        speed: 0.01,
        color: '#4A90E2',
        angle: Math.random() * Math.PI * 2,
        hasRing: true
      },
      {
        name: 'Mars',
        radius: 8,
        distance: 260,
        speed: 0.008,
        color: '#E27B58',
        angle: Math.random() * Math.PI * 2
      },
      {
        name: 'Jupiter',
        radius: 20,
        distance: 350,
        speed: 0.005,
        color: '#C88B3A',
        angle: Math.random() * Math.PI * 2,
        hasRing: true
      },
      {
        name: 'Saturn',
        radius: 18,
        distance: 420,
        speed: 0.003,
        color: '#F4D03F',
        angle: Math.random() * Math.PI * 2,
        hasRing: true
      }
    ];

    // Distant background planets (scattered in background - STATIONARY)
    const distantPlanets = [
      {
        name: 'Jupiter',
        radius: 16,
        x: window.innerWidth * 0.15,
        y: window.innerHeight * 0.2,
        color: '#C88B3A',
        opacity: 0.4,
        hasRing: true
      },
      {
        name: 'Saturn',
        radius: 14,
        x: window.innerWidth * 0.85,
        y: window.innerHeight * 0.15,
        color: '#F4D03F',
        opacity: 0.35,
        hasRing: true
      },
      {
        name: 'Uranus',
        radius: 10,
        x: window.innerWidth * 0.1,
        y: window.innerHeight * 0.8,
        color: '#4FD0E7',
        opacity: 0.32,
        hasRing: true
      },
      {
        name: 'Mars',
        radius: 8,
        x: window.innerWidth * 0.9,
        y: window.innerHeight * 0.75,
        color: '#E27B58',
        opacity: 0.38
      }
    ];

    let animationFrameId;

    const drawPlanet = (planet, centerX, centerY) => {
      // Calculate orbital position
      const x = centerX + Math.cos(planet.angle) * planet.distance;
      const y = centerY + Math.sin(planet.angle) * planet.distance;

      // Draw glow
      const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, planet.radius * 2);
      glowGradient.addColorStop(0, planet.color + '40');
      glowGradient.addColorStop(1, planet.color + '00');
      ctx.fillStyle = glowGradient;
      ctx.fillRect(x - planet.radius * 2.5, y - planet.radius * 2.5, planet.radius * 5, planet.radius * 5);

      // Draw planet body
      ctx.beginPath();
      ctx.arc(x, y, planet.radius, 0, Math.PI * 2);
      ctx.fillStyle = planet.color;
      ctx.fill();

      // Draw planet shine
      const shineGradient = ctx.createRadialGradient(
        x - planet.radius * 0.3,
        y - planet.radius * 0.3,
        0,
        x,
        y,
        planet.radius
      );
      shineGradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
      shineGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0)');
      shineGradient.addColorStop(1, 'rgba(0, 0, 0, 0.2)');
      ctx.fillStyle = shineGradient;
      ctx.fill();

      // Draw orbital ring if planet has one
      if (planet.hasRing) {
        ctx.strokeStyle = planet.color + '30';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(x, y, planet.radius * 2.2, planet.radius * 0.8, 0.3, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Update angle for next frame (skip for Earth)
      if (planet.name !== 'Earth') {
        planet.angle += planet.speed;
      }
    };

    const drawDistantPlanet = (planet) => {
      // Use fixed position (no orbiting)
      const x = planet.x;
      const y = planet.y;

      // Save current globalAlpha
      const savedAlpha = ctx.globalAlpha;
      ctx.globalAlpha = planet.opacity;

      // Draw glow
      const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, planet.radius * 2.5);
      glowGradient.addColorStop(0, planet.color + '40');
      glowGradient.addColorStop(1, planet.color + '00');
      ctx.fillStyle = glowGradient;
      ctx.fillRect(x - planet.radius * 3, y - planet.radius * 3, planet.radius * 6, planet.radius * 6);

      // Draw planet body
      ctx.beginPath();
      ctx.arc(x, y, planet.radius, 0, Math.PI * 2);
      ctx.fillStyle = planet.color;
      ctx.fill();

      // Draw shine
      const shineGradient = ctx.createRadialGradient(
        x - planet.radius * 0.3,
        y - planet.radius * 0.3,
        0,
        x,
        y,
        planet.radius
      );
      shineGradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
      shineGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0)');
      shineGradient.addColorStop(1, 'rgba(0, 0, 0, 0.15)');
      ctx.fillStyle = shineGradient;
      ctx.fill();

      // Draw orbital ring if planet has one
      if (planet.hasRing) {
        ctx.strokeStyle = planet.color + '50';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.ellipse(x, y, planet.radius * 2.5, planet.radius * 0.9, 0.4, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Restore globalAlpha
      ctx.globalAlpha = savedAlpha;
    };

    const drawOrbitalPath = (planet, centerX, centerY) => {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 4]);
      ctx.beginPath();
      ctx.arc(centerX, centerY, planet.distance, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    };

    const animate = () => {
      // Clear canvas with semi-transparent background for trail effect
      ctx.fillStyle = 'rgba(10, 14, 39, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Draw distant planets first (background layer)
      distantPlanets.forEach(planet => {
        drawDistantPlanet(planet);
      });

      // Draw orbital paths for main planets
      planets.forEach(planet => {
        drawOrbitalPath(planet, centerX, centerY);
      });

      // Draw main planets (foreground layer)
      planets.forEach(planet => {
        drawPlanet(planet, centerX, centerY);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="animated-planets-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 5,
        pointerEvents: 'none',
        opacity: 0.6
      }}
    />
  );
};

export default AnimatedPlanets;
