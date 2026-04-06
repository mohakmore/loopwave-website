import React, { useState, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

const PageBackground = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const springX = useSpring(0, { stiffness: 40, damping: 25 });
  const springY = useSpring(0, { stiffness: 40, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 15;
      const y = (e.clientY / window.innerHeight - 0.5) * 15;
      springX.set(x);
      springY.set(y);
      setMousePos({ x: (e.clientX / window.innerWidth) * 100, y: (e.clientY / window.innerHeight) * 100 });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [springX, springY]);

  const rotateX = useTransform(springY, (v) => -v);
  const rotateY = useTransform(springX, (v) => v);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#020202] perspective-[1000px]">
      <motion.div 
        style={{ rotateX, rotateY }}
        className="absolute inset-[-10%] w-[120%] h-[120%]"
      >
        {/* Subtle Kinetic Energy Tracers */}
        <div className="absolute inset-0 z-20">
          {/* Vertical Tracers (Top to Bottom) - REFINED OPACITY */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={`vt-${i}`}
              initial={{ y: '-20%', left: `${i * 10 + Math.random() * 5}%` }}
              animate={{ y: '120%' }}
              transition={{ duration: 5 + Math.random() * 5, repeat: Infinity, delay: Math.random() * 8, ease: "linear" }}
              className="absolute w-[1px] h-[120px] bg-gradient-to-b from-transparent via-[#EAB308]/25 to-transparent z-20"
              style={{ boxShadow: '0 0 10px rgba(234, 179, 8, 0.1)' }}
            />
          ))}

          {/* Horizontal Tracers (Left to Right) - REFINED OPACITY */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={`ht-${i}`}
              initial={{ x: '-20%', top: `${i * 10 + Math.random() * 5}%` }}
              animate={{ x: '120%' }}
              transition={{ duration: 6 + Math.random() * 6, repeat: Infinity, delay: Math.random() * 10, ease: "linear" }}
              className="absolute w-[200px] h-[1px] bg-gradient-to-r from-transparent via-[#EAB308]/20 to-transparent z-20"
              style={{ boxShadow: '0 0 10px rgba(234, 179, 8, 0.1)' }}
            />
          ))}

          {/* Upward Energy Bursts - REFINED OPACITY */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`ut-${i}`}
              initial={{ y: '120%', left: `${Math.random() * 100}%` }}
              animate={{ y: '-20%' }}
              transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 12, ease: "linear" }}
              className="absolute w-[1.5px] h-[300px] bg-gradient-to-t from-transparent via-[#EAB308]/30 to-transparent z-20"
              style={{ boxShadow: '0 0 15px rgba(234, 179, 8, 0.15)' }}
            />
          ))}
        </div>

        {/* Elegant Vertical Scanning Beam */}
        <motion.div 
          animate={{ y: ['-100%', '200%'] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#EAB308]/20 to-transparent blur-[1px] z-10"
        />

        {/* Dynamic Highlight (Subtle) */}
        <div 
          className="absolute inset-0 opacity-15"
          style={{ background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(234, 179, 8, 0.4) 0% , transparent 60%)` }}
        />

        {/* Layer 1: Dense Technical Grid (Subtle Breathing) */}
        <motion.div 
          animate={{ opacity: [0.01, 0.03, 0.01] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(234, 179, 8, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(234, 179, 8, 0.15) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Layer 2: Wide Background Matrix */}
        <motion.div 
          animate={{ backgroundPosition: ['0px 0px', '200px 200px'] }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(234, 179, 8, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(234, 179, 8, 0.2) 1px, transparent 1px)`,
            backgroundSize: '200px 200px'
          }}
        />
      </motion.div>
      
      {/* Cinematic Deep Shadow Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_130%)]" />
    </div>
  );
};

export default PageBackground;
