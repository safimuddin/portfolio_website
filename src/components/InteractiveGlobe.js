import { useEffect, useRef, useState } from "react";
import Globe from "globe.gl";
import { ContinentCard } from "./ContinentCard";
import "../styles/InteractiveGlobe.css";

const CONTINENT_INFO = {
  Asia: {
    color: "#FF6B6B",
    description: "Asia",
    details: [
      "Largest continent with emerging tech markets",
      "Building scalable backend systems",
      "Full-stack development expertise",
      "Cross-border collaboration experience"
    ],
    icon: "🌏",
    lat: 34.5553,
    lng: 100.7932
  },
  Africa: {
    color: "#4ECDC4",
    description: "Africa",
    details: [
      "Innovative problem-solving approach",
      "Cloud infrastructure optimization",
      "Real-time data processing",
      "Performance-driven development"
    ],
    icon: "🌍",
    lat: -8.7832,
    lng: 34.5085
  },
  Europe: {
    color: "#45B7D1",
    description: "Europe",
    details: [
      "Modern frontend architecture",
      "User experience optimization",
      "Best practices implementation",
      "Code quality standards"
    ],
    icon: "🏛️",
    lat: 54.5973,
    lng: 15.2551
  },
  "North America": {
    color: "#96CEB4",
    description: "North America",
    details: [
      "Rapid prototyping & MVP development",
      "React and modern JavaScript frameworks",
      "RESTful API design & integration",
      "Advanced cloud technologies"
    ],
    icon: "🚀",
    lat: 54.5260,
    lng: -105.2551
  },
  "South America": {
    color: "#FFEAA7",
    description: "South America",
    details: [
      "Creative solution implementation",
      "Team collaboration & mentoring",
      "Project leadership experience",
      "Stakeholder communication"
    ],
    icon: "🎊",
    lat: -8.7832,
    lng: -55.4915
  },
  Oceania: {
    color: "#DDA15E",
    description: "Oceania",
    details: [
      "Island innovation",
      "Flexible solutions",
      "Remote collaboration",
      "Fast execution"
    ],
    icon: "🏝️",
    lat: -22.7359,
    lng: 140.0188
  },
  Antarctica: {
    color: "#B0E0E6",
    description: "Antarctica",
    details: [
      "Extreme environment resilience",
      "Scientific exploration",
      "Frontier technology",
      "Global cooperation"
    ],
    icon: "🧊",
    lat: -82.8628,
    lng: 0
  }
};

export default function InteractiveGlobe() {
  const globeEl = useRef(null);
  const globeInstance = useRef(null);
  const [selectedContinent, setSelectedContinent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!globeEl.current) return;

    try {
      // Initialize Globe.GL
      const globe = new Globe(globeEl.current)
        .globeImageUrl("//cdn.jsdelivr.net/npm/three-globe/example/img/earth-dark.jpg")
        .backgroundColor("#000011")
        .htmlElementsData(
          Object.entries(CONTINENT_INFO).map(([continent, info]) => ({
            lat: info.lat,
            lng: info.lng,
            continent,
            ...info
          }))
        )
        .htmlElement((d) => {
          const el = document.createElement("div");
          el.className = "globe-marker";
          el.style.color = d.color;
          el.style.cursor = "pointer";
          el.style.pointerEvents = "auto";
          el.innerHTML = `
            <div class="marker-content" style="background-color: ${d.color}20; border: 2px solid ${d.color}; padding: 10px 14px; border-radius: 10px; background-image: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 100%); box-shadow: 0 8px 24px rgba(0,0,0,0.4); backdrop-filter: blur(4px); transition: all 0.3s ease; pointer-events: auto;">
              <div class="marker-icon" style="font-size: 28px; margin-bottom: 6px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">${d.icon}</div>
              <div class="marker-label" style="font-size: 13px; font-weight: 700; white-space: nowrap; letter-spacing: 0.5px; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">${d.description}</div>
            </div>
          `;
          
          el.addEventListener("click", (e) => {
            e.stopPropagation();
            setSelectedContinent(d);
            globe.pointOfView(
              { lat: d.lat, lng: d.lng, altitude: 2 },
              1000
            );
          });
          
          return el;
        });

      globeInstance.current = globe;

      // Set initial point of view
      globe.pointOfView({ lat: 20, lng: -100, altitude: 2.5 }, 0);

      // Rotate globe smoothly
      let angleY = 0;
      let animationId = null;

      const animate = () => {
        angleY += 0.0001;
        if (globe.rotation) {
          globe.rotation.y = angleY;
        }
        animationId = requestAnimationFrame(animate);
      };
      animationId = requestAnimationFrame(animate);

      // Handle window resize
      const handleResize = () => {
        if (globeEl.current && globe) {
          const width = window.innerWidth;
          const height = window.innerHeight;
          globe.width(width).height(height);
        }
      };

      window.addEventListener("resize", handleResize);

      setIsLoading(false);

      return () => {
        window.removeEventListener("resize", handleResize);
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
      };
    } catch (err) {
      console.error("Error initializing globe:", err);
      setError(err.message);
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="interactive-globe-container">
      <div ref={globeEl} className="globe-canvas" />

      <ContinentCard
        continent={selectedContinent}
        onClose={() => setSelectedContinent(null)}
      />

      {isLoading && (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <p>Loading Globe...</p>
        </div>
      )}

      {error && (
        <div className="error-message">
          <p>Error: {error}</p>
        </div>
      )}
    </div>
  );
}
