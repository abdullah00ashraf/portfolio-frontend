import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';

// ── ERROR BOUNDARY ────────────────────────────────────────────────────────────
class WebGLErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("MonolithicChronographLayer WebGL pipeline crashed:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Elegant brushed obsidian fallback using inline CSS gradients
      return (
        <div 
          className="fixed inset-0 w-full h-full z-[-2] pointer-events-none"
          style={{
            backgroundColor: '#050505',
            backgroundImage: 'radial-gradient(circle at center, #0e0e11 0%, #050505 100%)',
          }}
        />
      );
    }

    return this.props.children;
  }
}

// ── SHADER CODE ───────────────────────────────────────────────────────────────
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uAspect;
  varying vec2 vUv;

  // Constant-width sharp circle rendering using screen space derivatives (fwidth)
  float circleLine(float r, float radius, float width) {
      float dist = abs(r - radius);
      return smoothstep(width, 0.0, dist / fwidth(r));
  }

  // Sharp status light dot with organic exponential glass-like glow
  vec3 renderNode(vec2 uv, vec2 center, float pulse, vec3 inactiveCol, vec3 activeCol) {
      float d = distance(uv, center);
      
      // Sharp 2px status light dot
      float dotMask = smoothstep(1.5, 0.0, d / fwidth(d));
      
      // Premium optical glass glow using exponential decay
      float glowMask = exp(-d * 40.0) * pulse;
      
      vec3 dotColor = mix(inactiveCol, activeCol, pulse);
      return dotColor * dotMask + activeCol * glowMask * 0.28;
  }

  void main() {
      // Normalize UV to centered coordinates corrected for aspect ratio
      vec2 uv = (vUv - 0.5) * 2.0;
      uv.x *= uAspect;
      
      // Calculate vectors for gravitational mesh bending
      vec2 toMouse = uMouse - uv;
      float dist = length(toMouse);
      
      float radius = 0.65;      // strict boundary displacement radius
      float strength = 0.075;   // physical mesh compression elasticity
      float influence = smoothstep(radius, 0.0, dist);
      
      // Warp coordinates elastically (rigid grid mesh under physical cursor pressure)
      vec2 distortedUv = uv - normalize(toMouse) * influence * strength * (1.0 - smoothstep(0.0, radius, dist));
      
      // 1. Brushed Obsidian Base Background with radial highlight
      vec3 bgColor = vec3(0.019, 0.019, 0.019); // #050505 base
      float bgHighlight = 1.0 - length(uv) * 0.35;
      vec3 finalBg = bgColor * max(0.45, bgHighlight);
      
      // 2. Chronograph Blueprint Line System
      // Cartesian grid lines (constant 1-pixel width fwidth anti-aliased)
      float gridSpacing = 0.2;
      vec2 gridFract = fract(distortedUv / gridSpacing);
      vec2 gridDeriv = fwidth(distortedUv / gridSpacing);
      vec2 gridLines = smoothstep(1.0, 0.0, abs(gridFract - 0.5) / gridDeriv);
      float grid = max(gridLines.x, gridLines.y) * 0.25; // extremely faint grid line
      
      // concentric structural sub-dials (Swiss mechanical watch dialect)
      float r = length(distortedUv);
      float rings = 0.0;
      rings += circleLine(r, 0.2, 0.95);
      rings += circleLine(r, 0.4, 0.95);
      
      // Dashed chronograph rings
      float angle = atan(distortedUv.y, distortedUv.x);
      float dashedRing = circleLine(r, 0.6, 0.95) * step(0.0, sin(angle * 120.0));
      float fineDashedRing = circleLine(r, 0.8, 0.95) * step(0.0, sin(angle * 240.0));
      rings += dashedRing * 0.9 + fineDashedRing * 0.65;
      
      // Central Crosshairs
      float crosshairH = smoothstep(0.8, 0.0, abs(distortedUv.y) / fwidth(distortedUv.y));
      float crosshairV = smoothstep(0.8, 0.0, abs(distortedUv.x) / fwidth(distortedUv.x));
      float crosshairs = max(crosshairH, crosshairV);
      
      // Axis tick marks (Tesla UI precise indicators)
      float ticks = 0.0;
      if (abs(distortedUv.y) < 0.015) {
          float xTick = fract(distortedUv.x * 10.0);
          float xTickLine = smoothstep(0.8, 0.0, abs(xTick - 0.5) / fwidth(distortedUv.x * 10.0));
          ticks += xTickLine * step(0.15, abs(distortedUv.x)) * step(abs(distortedUv.x), 1.2);
      }
      if (abs(distortedUv.x) < 0.015) {
          float yTick = fract(distortedUv.y * 10.0);
          float yTickLine = smoothstep(0.8, 0.0, abs(yTick - 0.5) / fwidth(distortedUv.y * 10.0));
          ticks += yTickLine * step(0.15, abs(distortedUv.y)) * step(abs(distortedUv.y), 0.9);
      }
      
      // Assemble blueprint mask
      float blueprint = 0.0;
      blueprint = max(blueprint, grid * 0.35);
      blueprint = max(blueprint, rings * 0.65);
      blueprint = max(blueprint, crosshairs * 0.8);
      blueprint = max(blueprint, ticks * 0.65);
      
      // Premium muted slate gray #16161a lines
      vec3 lineColor = vec3(0.086, 0.086, 0.102); 
      vec3 finalBlueprint = lineColor * blueprint;
      
      // 3. Status micro-telemetry diagnostic lights (Crimson Red #b91c1c pulsing)
      vec3 nodesColor = vec3(0.0);
      vec3 inactiveCol = vec3(0.086, 0.086, 0.102); // matches grid line color
      vec3 activeCol = vec3(0.725, 0.110, 0.110);   // Crimson Red #b91c1c
      
      // Pulsing states driven by time offsets for asynchronous cycles
      float p1 = sin(uTime * 1.3) * 0.5 + 0.5;
      float p2 = sin(uTime * 1.9 + 1.2) * 0.5 + 0.5;
      float p3 = sin(uTime * 1.6 + 2.5) * 0.5 + 0.5;
      float p4 = sin(uTime * 2.2 + 3.7) * 0.5 + 0.5;
      float p5 = sin(uTime * 1.1 + 0.8) * 0.5 + 0.5;
      float p6 = sin(uTime * 1.7 + 1.9) * 0.5 + 0.5;
      float p7 = sin(uTime * 2.5 + 2.1) * 0.5 + 0.5;
      float p8 = sin(uTime * 2.0 + 0.5) * 0.5 + 0.5;
      
      // Pulse status light nodes perfectly aligned with grid intersections
      nodesColor += renderNode(distortedUv, vec2(0.4, 0.4), p1, inactiveCol, activeCol);
      nodesColor += renderNode(distortedUv, vec2(-0.4, 0.4), p2, inactiveCol, activeCol);
      nodesColor += renderNode(distortedUv, vec2(0.4, -0.4), p3, inactiveCol, activeCol);
      nodesColor += renderNode(distortedUv, vec2(-0.4, -0.4), p4, inactiveCol, activeCol);
      
      nodesColor += renderNode(distortedUv, vec2(0.8, 0.2), p5, inactiveCol, activeCol);
      nodesColor += renderNode(distortedUv, vec2(-0.8, -0.2), p6, inactiveCol, activeCol);
      nodesColor += renderNode(distortedUv, vec2(0.0, 0.6), p7, inactiveCol, activeCol);
      nodesColor += renderNode(distortedUv, vec2(0.0, -0.6), p8, inactiveCol, activeCol);
      
      // Combine base, blueprint lines, and pulsing telemetry diagnostics
      vec3 finalColor = finalBg + finalBlueprint + nodesColor;
      
      gl_FragColor = vec4(finalColor, 1.0);
  }
`;

// ── R3F CHRONOGRAPH PLANE ──────────────────────────────────────────────────────
const ChronographPlane = () => {
  const meshRef = useRef();
  const targetMouse = useRef({ x: 0, y: 0 });

  const uniforms = useRef({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uAspect: { value: window.innerWidth / window.innerHeight },
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const currentAspect = window.innerWidth / window.innerHeight;
      // Normalize mouse coordinates matching the centered GLSL system
      targetMouse.current.x = ((e.clientX / window.innerWidth) * 2 - 1) * currentAspect;
      targetMouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleResize = () => {
      const currentAspect = window.innerWidth / window.innerHeight;
      uniforms.current.uAspect.value = currentAspect;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useFrame((state) => {
    uniforms.current.uTime.value = state.clock.getElapsedTime();
    
    // Hydraulic delay LERP for luxury automotive tactical grid feedback
    const lerpFactor = 0.085;
    uniforms.current.uMouse.value.x += (targetMouse.current.x - uniforms.current.uMouse.value.x) * lerpFactor;
    uniforms.current.uMouse.value.y += (targetMouse.current.y - uniforms.current.uMouse.value.y) * lerpFactor;
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms.current}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
};

// ── MAIN EXPORT COMPONENT ─────────────────────────────────────────────────────
const MonolithicChronographLayer = () => {
  return (
    <WebGLErrorBoundary>
      <div 
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{
          zIndex: -2, // Behind main contents (z-10), yet overlays standard base HTML background
          backgroundColor: '#050505'
        }}
      >
        <Canvas
          gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
          style={{ width: '100%', height: '100%' }}
        >
          <OrthographicCamera 
            makeDefault 
            position={[0, 0, 1]} 
            left={-1} 
            right={1} 
            top={1} 
            bottom={-1} 
            near={0.1} 
            far={10} 
          />
          <ChronographPlane />
          <EffectComposer enabled={true}>
            <Bloom 
              intensity={0.35} 
              luminanceThreshold={0.1} 
              luminanceSmoothing={0.9} 
            />
            <Vignette eskil={false} offset={0.5} darkness={0.65} />
          </EffectComposer>
        </Canvas>
      </div>
    </WebGLErrorBoundary>
  );
};

export default MonolithicChronographLayer;
