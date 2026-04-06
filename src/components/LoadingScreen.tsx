import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        document.body.style.overflow = '';
      }, 1000);
    }, 4500);

    return () => {
      document.body.style.overflow = '';
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          id="global-loader"
          key="loader"
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#050505] overflow-hidden"
          initial={{ y: 0 }}
          exit={{
            y: '-100%',
            transition: {
              duration: 1.2,
              ease: [0.85, 0, 0.15, 1],
              delay: 0.2
            }
          }}
        >
          {/* Subtle Aesthetic Overlays */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/[0.04] blur-[150px] rounded-full"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 2 }}
            />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-center">

            {/* Logo Part */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
              animate={{
                opacity: 1,
                scale: 1,
                filter: 'blur(0px)',
                x: [0, 0, -40, -50]
              }}
              transition={{
                duration: 1.2,
                x: { delay: 1.6, duration: 1.2, ease: [0.76, 0, 0.24, 1] }
              }}
              className="flex-shrink-0"
            >
              <img
                src="/logo.png"
                alt="Logo"
                className="h-24 md:h-32 lg:h-40 w-auto object-contain drop-shadow-[0_0_30px_rgba(255,191,0,0.4)]"
              />
            </motion.div>

            {/* Text Part - Reveal Animation */}
            <div className="relative overflow-hidden pt-6 md:pt-0 md:-ml-8">
              <motion.div
                initial={{ x: '-105%', opacity: 0 }}
                animate={{
                  x: 0,
                  opacity: 1
                }}
                transition={{
                  delay: 1.9,
                  duration: 1.3,
                  ease: [0.76, 0, 0.24, 1]
                }}
                className="flex flex-col items-center md:items-start pl-4 md:pl-10"
              >
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black heading-modern text-gradient tracking-tighter uppercase whitespace-nowrap leading-[0.9]">
                  YOUR HOME OF
                </h1>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extralight heading-modern text-white/30 tracking-[0.4em] md:tracking-[0.6em] uppercase whitespace-nowrap -mt-1 md:-mt-2">
                  DIGITAL PRESENCE
                </h1>
              </motion.div>

              {/* Animated reveal border */}
              <motion.div
                className="absolute left-0 top-1/4 bottom-1/4 w-[2px] bg-primary/40 hidden md:block"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 1.9, duration: 0.6 }}
              />
            </div>
          </div>


          <style>{`
            .text-gradient {
              background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
            .heading-modern {
              font-family: 'Space Grotesk', sans-serif;
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
