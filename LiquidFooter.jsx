import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

import { 
  Settings, Zap, Box, Cpu, Compass, Hexagon, Layers, Triangle, Waves, 
  Atom, Ruler, FlaskConical, Terminal, Globe, Wrench, Pencil, HardDrive, 
  Database, Share2, Activity, ShieldCheck, Microscope, Wind, Anchor, 
  Satellite, Radio, Link as LinkIcon, CircuitBoard, Container
} from 'lucide-react';

const engineeringIcons = [
  Settings, Zap, Box, Cpu, Compass, Hexagon, Layers, Triangle, Waves, 
  Atom, Ruler, FlaskConical, Terminal, Globe, Wrench, Pencil, HardDrive, 
  Database, Share2, Activity, ShieldCheck, Microscope, Wind, Anchor, 
  Satellite, Radio, LinkIcon, CircuitBoard, Container
];

const LiquidSilkFooter = () => {
  const containerRef = useRef(null);
  const [surprises, setSurprises] = useState([]);
  
  // Mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth springs for physics-like behavior (Heavy Silk)
  const springX = useSpring(mouseX, { stiffness: 50, damping: 40 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 40 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleClick = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const IconComponent = engineeringIcons[Math.floor(Math.random() * engineeringIcons.length)];
    
    const newSurprise = { id: Date.now(), x, y, icon: IconComponent };
    setSurprises(prev => [...prev, newSurprise]);
    
    // Remove surprise after animation
    setTimeout(() => {
      setSurprises(prev => prev.filter(s => s.id !== newSurprise.id));
    }, 2000);
  };

  return (
    <footer 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      className="relative w-full overflow-hidden bg-[rgba(10,10,10,0.85)] border-t border-[#1c1c1c] cursor-crosshair font-mono backdrop-blur-md"
    >
      {/* Liquid Silk Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <SilkBlob x={springX} y={springY} color="rgba(197, 179, 88, 0.2)" size={400} delay={0} />
        <SilkBlob x={springX} y={springY} color="rgba(197, 179, 88, 0.1)" size={300} delay={0.2} />
      </div>

      {/* Surprise Visual Elements */}
      {surprises.map(s => (
        <motion.div
          key={s.id}
          initial={{ opacity: 0, y: 0, scale: 0, rotate: -45 }}
          animate={{ opacity: [0, 1, 1, 0], y: -120, scale: 1.2, rotate: 10 }}
          transition={{ duration: 2.5, ease: [0.23, 1, 0.32, 1] }}
          style={{ 
            left: s.x, 
            top: s.y,
            filter: 'drop-shadow(0 0 10px rgba(197, 160, 89, 0.3))'
          }}
          className="absolute z-30 pointer-events-none text-[#C5A059] flex items-center justify-center"
        >
          <s.icon size={28} strokeWidth={1} />
        </motion.div>
      ))}

      {/* Glassmorphism Overlay */}
      <div className="absolute inset-0 z-10 backdrop-blur-[8px] bg-black/20"></div>

      {/* Footer Content */}
      <div className="relative z-20 w-full px-12 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-left flex items-center">
                <p className="text-[12px] tracking-[2px] text-[#555555] uppercase">
                    &copy; 2026 SYSTEM SPECIFICATION // HARDWARE-ACCELERATED INTELLIGENCE AT THE CRITICAL EDGE
                </p>
            </div>
            
            <nav className="flex gap-10 text-[13px] uppercase tracking-[2px] text-[#e0e0e0]">
                <a href="#prologue" className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all flex items-center group"><span className="text-[#555555] font-bold mr-2 group-hover:text-[#888888] transition-colors">//</span> PROLOGUE</a>
                <a href="#pedagogy" className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all flex items-center group"><span className="text-[#555555] font-bold mr-2 group-hover:text-[#888888] transition-colors">//</span> R&D SANDBOX</a>
                <a href="#infrastructure" className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all flex items-center group"><span className="text-[#555555] font-bold mr-2 group-hover:text-[#888888] transition-colors">//</span> INFRASTRUCTURE</a>
                <a href="#capabilities" className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all flex items-center group"><span className="text-[#555555] font-bold mr-2 group-hover:text-[#888888] transition-colors">//</span> CAPABILITIES</a>
            </nav>
        </div>
      </div>
    </footer>
  );
};

const SilkBlob = ({ x, y, color, size, delay, offset = 0 }) => {
  return (
    <motion.div
      style={{
        left: x,
        top: y,
        translateX: '-50%',
        translateY: '-50%',
        width: size,
        height: size,
        backgroundColor: color,
      }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ 
        scale: [1, 1.2, 1],
        borderRadius: ["40% 60% 70% 30%", "60% 40% 30% 70%", "40% 60% 70% 30%"],
        opacity: 0.3
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay
      }}
      className="absolute filter blur-[40px]"
    />
  );
};

export default LiquidSilkFooter;
