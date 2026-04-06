import React, { useEffect, useState, useRef, useMemo } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

/**
 * CyberRiverBackground Component
 * 
 * Features:
 * - High-fidelity "Waterfall of Light" / "Cyber River" aesthetic.
 * - Optimized SVG-based animation with cinematic glow effects.
 * - Interactive mouse parallax and perspective tilt.
 * - Seamlessly looping energy trails in Cyan, Teal, and White.
 */

interface TrailProps {
  id: number;
  color: string;
  delay: number;
  duration: number;
  startX: number;
  pathId: string;
}

const CyberRiverBackground: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const springX = useSpring(0, { stiffness: 50, damping: 20 });
  const springY = useSpring(0, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      springX.set(x);
      springY.set(y);
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [springX, springY]);

  const rotateX = useTransform(springY, (v) => -v);
  const rotateY = useTransform(springX, (v) => v);

  // Generate a cluster of fiber-optic paths
  const paths = useMemo(() => {
    return [...Array(18)].map((_, i) => ({
      id: i,
      // Randomize x-offset at the top to create a "bundle" feel
      xOffset: (i - 9) * 25, 
      // Paths that curve from top-center to the bottom-forward
      d: `M ${500 + (i - 9) * 15} -100 
          V 300 
          C ${500 + (i - 9) * 15} 600, ${500 + (i - 9) * 40} 800, ${500 + (i - 9) * 80} 1200`,
      color: i % 3 === 0 ? '#00FFFF' : i % 3 === 1 ? '#FFFFFF' : '#3B82F6',
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
      width: 1 + Math.random() * 1.5
    }));
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#020202] pointer-events-none perspective-[1200px]">
      <motion.div 
        style={{ rotateX, rotateY }}
        className="absolute inset-[-10%] w-[120%] h-[120%]"
      >
        {/* Cinematic Depth Ambiance */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.05)_0%,transparent_70%)]" />

        <svg
          viewBox="0 0 1000 1000"
          className="absolute inset-0 w-full h-full preserve-3d"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {paths.map((p) => (
              <linearGradient key={`grad-${p.id}`} id={`grad-${p.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="20%" stopColor={p.color} stopOpacity="0.2" />
                <stop offset="50%" stopColor={p.color} stopOpacity="1" />
                <stop offset="80%" stopColor={p.color} stopOpacity="0.2" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            ))}
            
            {/* Filter for extreme luminescence */}
            <filter id="bloom" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          <g filter="url(#bloom)">
            {paths.map((p) => (
              <motion.path
                key={p.id}
                d={p.d}
                fill="none"
                stroke={`url(#grad-${p.id})`}
                strokeWidth={p.width}
                strokeLinecap="round"
                initial={{ pathLength: 0.3, pathOffset: -1 }}
                animate={{ pathOffset: 2 }}
                transition={{
                  duration: p.duration,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            ))}
          </g>

          {/* Secondary Layer for sharper core lines */}
          <g>
            {paths.map((p) => (
              <motion.path
                key={`core-${p.id}`}
                d={p.d}
                fill="none"
                stroke={p.color}
                strokeWidth={0.5}
                strokeOpacity={0.4}
                initial={{ pathLength: 0.2, pathOffset: -1 }}
                animate={{ pathOffset: 2 }}
                transition={{
                  duration: p.duration,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            ))}
          </g>
        </svg>

        {/* Moving Lens Flares following mouse */}
        <div 
          className="absolute w-[600px] h-[600px] rounded-full opacity-[0.07] pointer-events-none"
          style={{
            background: 'radial-gradient(circle, #00FFFF 0%, transparent 70%)',
            left: `calc(50% + ${mousePos.x * 20}px)`,
            top: `calc(50% + ${mousePos.y * 20}px)`,
            transform: 'translate(-50%, -50%)',
            filter: 'blur(80px)'
          }}
        />
      </motion.div>

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-[#020202] opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#000_120%)]" />
      
      {/* High-Performance Noise Texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none pf-noise-bg" />

      <style>{`
        .pf-noise-bg {
          background-image: url('https://grainy-gradients.vercel.app/noise.svg');
        }
        .preserve-3d { 
          transform-style: preserve-3d; 
        }
      `}</style>
    </div>
  );
};

export default CyberRiverBackground;
