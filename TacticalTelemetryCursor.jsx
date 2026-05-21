import React, { useEffect, useRef, useState } from 'react';

const TacticalTelemetryCursor = () => {
  const reticleRef = useRef(null);
  const geofenceRef = useRef(null);
  const telemetryRef = useRef(null);
  
  const mouseRef = useRef({ x: 0, y: 0 });
  const delayRef = useRef({ x: 0, y: 0 });
  
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [status, setStatus] = useState('ACTIVE');

  useEffect(() => {
    // 1. Globally hide native cursor
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
      * {
        cursor: none !important;
      }
      a, button, input, select, textarea, [role="button"], 
      .ap-button, .ap-obsidian-card, .subsys-card, .nav-links a {
        cursor: none !important;
      }
    `;
    document.head.appendChild(styleEl);

    // 2. Event listeners for mouse tracking
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseDown = () => {
      setIsClicked(true);
    };

    const handleMouseUp = () => {
      setIsClicked(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });

    // 3. Scan DOM for interactive items to bind hover states
    const updateHoverListeners = () => {
      const interactives = document.querySelectorAll(
        'a, button, input, select, textarea, [role="button"], .ap-button, .ap-obsidian-card, .subsys-card, .nav-links a, .subsys-card button, .subsys-card a'
      );

      const handleEnter = () => {
        setIsHovered(true);
        setStatus('LINK_INTERCEPTED');
      };

      const handleLeave = () => {
        setIsHovered(false);
        setStatus('ACTIVE');
      };

      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', handleEnter);
        el.removeEventListener('mouseleave', handleLeave);
        el.addEventListener('mouseenter', handleEnter);
        el.addEventListener('mouseleave', handleLeave);
      });
    };

    updateHoverListeners();
    // Ingest updates every second to catch dynamically rendered components
    const intervalId = setInterval(updateHoverListeners, 1000);

    // 4. 60FPS High-Performance LERP loop using requestAnimationFrame
    let animationFrameId;
    let counter = 0;

    const tick = () => {
      counter++;

      // Direct DOM mutation for absolute 60fps locked translation bypassing React render lag
      if (reticleRef.current) {
        reticleRef.current.style.transform = `translate3d(${mouseRef.current.x}px, ${mouseRef.current.y}px, 0)`;
      }

      // Physics interpolation (LERP): outer geofence follows with soft delay damping
      const dampingFactor = 0.14;
      delayRef.current.x += (mouseRef.current.x - delayRef.current.x) * dampingFactor;
      delayRef.current.y += (mouseRef.current.y - delayRef.current.y) * dampingFactor;

      if (geofenceRef.current) {
        geofenceRef.current.style.transform = `translate3d(${delayRef.current.x}px, ${delayRef.current.y}px, 0)`;
      }

      // Smooth coordinate update directly to DOM without causing React state re-renders
      if (counter % 3 === 0 && telemetryRef.current) {
        telemetryRef.current.textContent = `X: ${Math.round(mouseRef.current.x)} | Y: ${Math.round(mouseRef.current.y)}`;
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      styleEl.remove();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      clearInterval(intervalId);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[999999] select-none font-mono">
      {/* 1. RETICLE (Center Core): Crimson Red #cc0000 3x3px Dot (Instant mapping, no CSS transition on transform) */}
      <div
        ref={reticleRef}
        className="fixed top-0 left-0 pointer-events-none will-change-transform flex items-center justify-center"
        style={{
          width: '6px',
          height: '6px',
          marginLeft: '-3px',
          marginTop: '-3px',
          transition: 'none' // Critical: ensure absolute instant hardware tracking without transition lag
        }}
      >
        <div className="w-[3px] h-[3px] bg-[#cc0000] rounded-full shadow-[0_0_8px_#cc0000]" />
      </div>

      {/* 2. DYNAMIC GEOFENCE (Outer Ring): Terminal Green #00ff41 or Tactical Amber #ffb000 */}
      {/* Outer wrapper manages the smooth coordinates translation (no CSS transition on transform) */}
      <div
        ref={geofenceRef}
        className="fixed top-0 left-0 pointer-events-none will-change-transform flex items-center justify-center"
        style={{
          width: '24px',
          height: '24px',
          marginLeft: '-12px',
          marginTop: '-12px',
          transition: 'none' // Critical: prevent position clashing with the LERP calculations
        }}
      >
        {/* Inner element manages the visual sizing, border-radius, color, and blur transitions */}
        <div
          className={`w-full h-full flex items-center justify-center pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
            ${isClicked 
              ? 'scale-0 opacity-0' 
              : isHovered 
                ? 'scale-[1.5] rounded-none border border-[#ffb000] bg-[#ffb000]/10 shadow-[0_0_15px_rgba(255,176,0,0.5)]' 
                : 'scale-100 rounded-full border border-[#00ff41] bg-[#00ff41]/5 backdrop-blur-[1px] shadow-[0_0_8px_rgba(0,255,65,0.2)]'
            }
          `}
        >
          {/* Dynamic target markings shown on hover */}
          {isHovered && (
            <div className="absolute inset-0.5 border border-white/20 pointer-events-none scale-95" />
          )}
        </div>

        {/* 3. TELEMETRY STREAM (Label Stack): Monospace micro-typography at bottom-right */}
        <div
          className={`absolute left-6 top-6 flex flex-col text-[8px] font-bold tracking-widest leading-none pointer-events-none select-none uppercase transition-colors duration-300 whitespace-nowrap
            ${isHovered ? 'text-[#ffb000]' : 'text-zinc-500'}
          `}
          style={{ textShadow: '1px 1px 1px rgba(0,0,0,0.95)' }}
        >
          <span ref={telemetryRef}>X: 0 | Y: 0</span>
          <span className="mt-1">SYS.STATUS: {status}</span>
        </div>
      </div>
    </div>
  );
};

export default TacticalTelemetryCursor;
