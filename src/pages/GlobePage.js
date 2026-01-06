import React, { useEffect } from "react";
import { NavBar } from "../components/NavBar";
import InteractiveGlobe from "../components/InteractiveGlobe";
import ASMRBackground from "../components/ASMRBackground";
import ScrollComet from "../components/ScrollComet";
import ScrollProgressBar from "../components/ScrollProgressBar";
import { GlowingStarsBackgroundCard } from "../components/GlowingStarsCard";
import "../styles/GlobePage.css";

export default function GlobePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="globe-page">
      <ASMRBackground />
      <ScrollComet />
      <ScrollProgressBar 
        type="circle" 
        position="bottom-right" 
        color="#AA367C" 
        showPercentage={true} 
      />
      <div className="glowing-stars-background">
        <GlowingStarsBackgroundCard />
      </div>
      <NavBar />
      <main className="globe-page-content">
        <InteractiveGlobe />
      </main>
    </div>
  );
}
