import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring } from 'framer-motion';
import { ArrowLeft, Play, Pause, Volume2, VolumeX, ArrowUpRight, Sparkles } from 'lucide-react';
import PageBackground from './PageBackground';

interface PortfolioPageProps { onBack?: () => void; }

const PROJECTS = [
  {
    id: 1,
    num: '01',
    title: 'Brand Presence',
    kicker: 'Creative Narrative',
    src: '/IMG_7098.MP4',
    tags: ['Marketing', 'Video', 'Social'],
    desc: 'Crafting cinematic narratives that forge deep emotional connections through high-performance digital production.',
  },
  {
    id: 2,
    num: '02',
    title: 'Yool Fressh',
    kicker: 'Visual Identity',
    src: '/Final .mp4',
    tags: ['Packaging', 'Identity'],
    desc: 'Vibrant packaging systems communicating freshness and nutrition through bold visual hierarchy.',
  },
  {
    id: 3,
    num: '03',
    title: 'ICICI Bank',
    kicker: 'Motion Storytelling',
    src: '/video3.mp4',
    tags: ['2D Animation', 'Ad'],
    desc: 'Transforming complex banking concepts into a modern, cinematic visual story for global audiences.',
  },
];


/* ──────────────────────────────────────────
   SLIDING CARD SECTION
────────────────────────────────────────── */
function SlidingCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const ref = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  // Scroll Tracking
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  // Kinetic Text Anims
  const xLeft = useTransform(scrollYProgress, [0, 1], ['100%', '-100%']);
  const xRight = useTransform(scrollYProgress, [0, 1], ['-100%', '100%']);
  
  // Card Entrance Anims
  const side = index % 2 === 0 ? -1 : 1;
  const slideX = useTransform(scrollYProgress, [0, 0.5, 1], [300 * side, 0, -300 * side]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [15 * side, 0, -15 * side]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <motion.section 
      ref={ref} 
      className="relative min-h-[120vh] flex flex-col items-center justify-center overflow-hidden py-32"
    >
      {/* Background Kinetic Text (Strictly Z-Behind) */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 -z-[20] pointer-events-none overflow-hidden h-[40vh] flex flex-col justify-center gap-12 opacity-[0.03]">
        <motion.div 
          style={{ x: index % 2 === 0 ? xLeft : xRight }}
          className="text-[15rem] md:text-[25rem] font-black text-white uppercase italic whitespace-nowrap leading-none"
        >
          {project.title} • {project.title}
        </motion.div>
        <motion.div 
          style={{ x: index % 2 === 0 ? xRight : xLeft }}
          className="text-[15rem] md:text-[25rem] font-black text-primary uppercase italic whitespace-nowrap leading-none"
        >
          {project.kicker} • {project.kicker}
        </motion.div>
      </div>

      <div className="w-full max-w-6xl mx-auto flex flex-col gap-10">
        
        {/* Dedicated Text Lane (Above Video) */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="px-12 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 text-primary text-[10px] font-black tracking-[0.4em] uppercase mb-4">
               <span>PROJECT {project.num}</span>
               <div className="w-12 h-px bg-primary/30" />
               <span className="text-white/40">{project.kicker}</span>
            </div>
            <h3 className="text-5xl md:text-7xl font-black italic tracking-tighter text-white uppercase leading-none mb-6">
              {project.title}
            </h3>
            <p className="text-white/40 text-sm font-medium leading-relaxed max-w-md">
              {project.desc}
            </p>
          </div>
          
          <div className="flex gap-2 mb-2">
            {project.tags.map(t => <span key={t} className="px-4 py-2 rounded-full border border-white/10 text-[9px] font-bold uppercase tracking-widest text-white/60">{t}</span>)}
          </div>
        </motion.div>

        {/* Clean Sliding Cinematic Video (No Text Inside) */}
        <motion.div
          style={{ x: slideX, rotateY, scale, opacity }}
          className="relative w-full aspect-video rounded-[3rem] overflow-hidden group shadow-[0_40px_100px_rgba(0,0,0,0.6)] border border-white/5 mx-6 cursor-pointer z-10"
        >
          <video
            ref={videoRef}
            src={project.src}
            muted={muted} loop playsInline autoPlay
            className="w-full h-full object-cover transition-opacity duration-700 opacity-80 group-hover:opacity-100"
          />
          
          <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent pointer-events-none" />

          <div className="absolute top-10 right-10 flex gap-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
             <button 
              onClick={(e) => { e.stopPropagation(); setMuted(!muted); if (videoRef.current) videoRef.current.muted = !muted; }}
              className="w-14 h-14 rounded-full bg-black/60 backdrop-blur-3xl border border-white/15 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
             >
              {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
             </button>
             <div className="w-14 h-14 rounded-full bg-primary text-black flex items-center justify-center hover:scale-110 transition-transform">
              <ArrowUpRight size={22} />
             </div>
          </div>
        </motion.div>

      </div>

      {/* Floating Number Detail */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="absolute bottom-12 text-[10px] font-black uppercase tracking-[0.5em] text-white/20"
      >
        Sequence — {project.num}
      </motion.div>
    </motion.section>
  );
}

/* ──────────────────────────────────────────
   MAIN PORTFOLIO
────────────────────────────────────────── */
export default function PortfolioPage({ onBack }: PortfolioPageProps) {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Enhanced Line Animation Component for Portfolio with Tilt Logic
  const DynamicBackground = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const springX = useSpring(0, { stiffness: 45, damping: 30 });
    const springY = useSpring(0, { stiffness: 45, damping: 30 });

    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
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
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#020202] perspective-[1000px]">
        {/* Deep Vignette */}
        <div className="absolute inset-0 z-50 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#000_150%)]" />

        <motion.div 
          style={{ rotateX, rotateY }}
          className="absolute inset-[-10%] w-[120%] h-[120%]"
        >
          {/* Layered Yellow & Golden Atmospheric Gradients */}
          <div className="absolute inset-0 z-0">
             <div
               className="absolute inset-0 opacity-40"
               style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(234,179,8,0.4) 0%, rgba(180,120,0,0.1) 60%, transparent 80%)' }}
             />
             <div
               className="absolute inset-0 opacity-20"
               style={{ background: 'radial-gradient(circle at 80% 100%, rgba(234,179,8,0.3) 0%, transparent 50%)' }}
             />
             <div
               className="absolute inset-0 opacity-15"
               style={{ background: 'radial-gradient(circle at 10% 80%, rgba(200,140,0,0.25) 0%, transparent 40%)' }}
             />
          </div>

          {/* Drifting Primary Gold Orbs */}
          <motion.div
            animate={{ x: ['-20%', '20%', '-20%'], y: ['-15%', '15%', '-15%'], scale: [1, 1.25, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-0 left-0 w-[80vw] h-[80vw] rounded-full mix-blend-screen opacity-[0.22]"
            style={{ background: 'radial-gradient(circle, #EAB308 0%, transparent 60%)', filter: 'blur(100px)' }}
          />
          <motion.div
            animate={{ x: ['15%', '-15%', '15%'], y: ['20%', '-20%', '20%'], scale: [1.2, 1, 1.2] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-0 right-0 w-[90vw] h-[90vw] rounded-full mix-blend-screen opacity-[0.18]"
            style={{ background: 'radial-gradient(circle, #F59E0B 0%, transparent 55%)', filter: 'blur(120px)' }}
          />

          {/* Kinetic Tracers Layer — Horizontal Lines Only */}
          <div className="absolute inset-0">
            {/* Horizontal Moving Lines (45 Lines) */}
            {[...Array(45)].map((_, i) => (
              <motion.div
                key={`h-${i}`}
                initial={{ x: '-100%', top: `${Math.random() * 100}%`, opacity: 0 }}
                animate={{ x: '210%', opacity: [0, 0.5, 0] }}
                transition={{
                  duration: 5 + Math.random() * 8,
                  repeat: Infinity,
                  delay: Math.random() * 12,
                  ease: "linear"
                }}
                className="absolute h-[1.5px] w-[30%] bg-gradient-to-r from-transparent via-white/85 to-transparent shadow-[0_0_12px_rgba(255,255,255,0.3)]"
              />
            ))}

            {/* Diagonal Shooting Stars — Brighter Motion */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={`diag-${i}`}
                initial={{ x: '-10%', y: '-10%', opacity: 0 }}
                animate={{ x: '110%', y: '110%', opacity: [0, 0.7, 0] }}
                transition={{
                  duration: 2.5 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 10,
                  ease: "linear"
                }}
                style={{ left: `${Math.random() * 95}%`, top: `${Math.random() * -30}%`, rotate: '45deg' }}
                className="absolute w-[2px] h-[220px] bg-gradient-to-b from-transparent via-white to-transparent blur-[1px] shadow-[0_0_20px_rgba(255,255,255,0.4)]"
              />
            ))}
          </div>

          {/* Elegant Vertical Scanning Beam — Slightly more glow */}
          <motion.div
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-primary/80 to-transparent shadow-[0_0_35px_rgba(234,179,8,0.5)] z-10"
          />

          {/* Intense Moving Radial Highlight */}
          <div 
            className="absolute inset-0 opacity-35"
            style={{ background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(234, 179, 8, 0.6) 0% , transparent 60%)` }}
          />
        </motion.div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-transparent text-white selection:bg-primary/30 relative font-sans overflow-x-hidden persist-3d">
      <DynamicBackground />

      <nav className="fixed top-8 inset-x-8 z-[100] flex justify-between items-center px-10">
        <img
          src="/logo.png" alt="Logo"
          className="h-40 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={onBack}
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
        />
        <button
          onClick={onBack}
          className="group flex items-center gap-4 text-xs font-black uppercase tracking-[0.3em] text-white/50 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back
        </button>
      </nav>

      <main className="relative z-10 p-0">
        <section className="h-screen flex flex-col items-center justify-center text-center px-10">
           <div className="flex flex-col items-center gap-10">

              {/* Word-mask reveal animation for CREATIVE VISION. */}
              <h1 className="text-7xl md:text-[14rem] font-black italic tracking-tighter leading-[0.75] uppercase text-white">
                {['CREATIVE', 'VISION.'].map((word, wi) => (
                  <div key={wi} className="block overflow-hidden">
                    <motion.span
                      className="block"
                      initial={{ y: '100%' }}
                      animate={{ y: '0%' }}
                      transition={{ duration: 0.9, delay: 0.2 + wi * 0.15, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {word}
                    </motion.span>
                  </div>
                ))}
              </h1>

              {/* Subtitle fade-in */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="max-w-md mx-auto text-sm text-white/40 tracking-wider leading-relaxed"
              >
                High-fidelity cinematic motion and strategic brand systems engineered for the modern digital era.
              </motion.p>
           </div>

           <motion.div animate={{ y: [0, 15, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-16 w-px h-16 bg-gradient-to-b from-white/20 to-transparent" />
        </section>

        <div className="flex flex-col">
          {PROJECTS.map((p, i) => <SlidingCard key={p.id} project={p} index={i} />)}
        </div>

        <section className="h-screen flex flex-col items-center justify-center text-center px-6">
           <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="flex flex-col items-center gap-12">
             <h2 className="text-6xl md:text-[16rem] font-black italic tracking-tighter text-white/5 uppercase leading-none">LET'S START.</h2>
             <button 
                onClick={onBack}
                className="group relative bg-white text-black font-black px-16 py-7 rounded-full text-sm uppercase tracking-widest hover:bg-primary transition-all duration-500 hover:scale-110 active:scale-95"
              >
                Let's Build Something
             </button>
           </motion.div>
        </section>
      </main>

      <style>{`
        :root { --primary: #EAB308; }
        .persist-3d { perspective: 1000px; }
      `}</style>
    </div>
  );
}