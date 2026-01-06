import { useRef } from "react";
import { ScrollProgress } from "./ScrollProgress";

const dummyContent = Array.from({ length: 10 }, (_, i) => (
  <p key={i} className="pb-4 font-mono text-sm text-zinc-500">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam
    lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra
    nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget
    libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut
    porta lorem lacinia consectetur. Donec ut libero sed arcu vehicula ultricies
    a non tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </p>
));

export function ScrollProgressBasic1() {
  const containerRef = useRef(null);

  return (
    <div 
      className="h-96 overflow-auto px-8 pb-16 pt-16" 
      ref={containerRef}
      style={{
        height: '350px',
        overflowY: 'auto',
        paddingLeft: '32px',
        paddingRight: '32px',
        paddingTop: '64px',
        paddingBottom: '64px',
      }}
    >
      <div
        style={{
          pointerEvents: 'none',
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: '48px',
          width: '100%',
          background: 'white',
          backdropFilter: 'blur(12px)',
          WebkitMaskImage: 'linear-gradient(to top, white, transparent)',
          maskImage: 'linear-gradient(to top, white, transparent)',
        }}
      />
      <div style={{ pointerEvents: 'none', position: 'absolute', left: 0, top: 0, width: '100%' }}>
        <div 
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '4px',
            width: '100%',
            background: '#E6F4FE',
          }} 
        />
        <ScrollProgress 
          containerRef={containerRef} 
          className="absolute top-0" 
          style={{ background: '#0090FF' }}
        />
      </div>
      {dummyContent}
    </div>
  );
}

export function ScrollProgressBasic2() {
  const containerRef = useRef(null);

  return (
    <div 
      className="h-96 overflow-auto px-8 pb-4 pt-16" 
      ref={containerRef}
      style={{
        height: '350px',
        overflowY: 'auto',
        paddingLeft: '32px',
        paddingRight: '32px',
        paddingTop: '64px',
        paddingBottom: '16px',
      }}
    >
      <div 
        style={{
          borderBottom: '1px solid #e5e7eb',
          position: 'absolute',
          left: 0,
          top: 0,
          zIndex: 10,
          height: '40px',
          width: '100%',
          background: 'white',
        }}
      >
        <ScrollProgress 
          className="absolute top-0" 
          containerRef={containerRef}
          style={{ 
            background: '#e5e7eb',
            height: '40px',
          }}
        />
        <div 
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            display: 'flex',
            height: '40px',
            alignItems: 'center',
            paddingLeft: '32px',
            paddingRight: '32px',
            gap: '24px',
            fontWeight: 450,
          }}
        >
          <a href="#" style={{ color: '#3f3f46', textDecoration: 'none' }}>
            Magazine
          </a>
          <a href="#" style={{ color: '#3f3f46', textDecoration: 'none' }}>
            Blog
          </a>
          <a href="#" style={{ color: '#3f3f46', textDecoration: 'none' }}>
            About
          </a>
        </div>
      </div>
      {dummyContent}
    </div>
  );
}

export function ScrollProgressBasic3() {
  const containerRef = useRef(null);

  return (
    <div 
      className="h-96 overflow-auto px-8 pb-16 pt-16" 
      ref={containerRef}
      style={{
        height: '350px',
        overflowY: 'auto',
        paddingLeft: '32px',
        paddingRight: '32px',
        paddingTop: '64px',
        paddingBottom: '64px',
      }}
    >
      <div
        style={{
          pointerEvents: 'none',
          position: 'absolute',
          left: 0,
          top: 0,
          height: '96px',
          width: '100%',
          background: 'white',
          backdropFilter: 'blur(12px)',
          WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)',
          maskImage: 'linear-gradient(to bottom, black, transparent)',
        }}
      />
      <div style={{ pointerEvents: 'none', position: 'absolute', left: 0, top: 0, width: '100%' }}>
        <div 
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '2px',
            width: '100%',
            background: '#111111',
          }}
        />
        <ScrollProgress
          className="absolute top-0"
          containerRef={containerRef}
          springOptions={{ stiffness: 280, damping: 18, mass: 0.3 }}
          style={{
            height: '2px',
            background: 'linear-gradient(to right, rgba(0,0,0,0), #111111 75%, #111111 100%)',
          }}
        />
      </div>
      {dummyContent}
    </div>
  );
}
