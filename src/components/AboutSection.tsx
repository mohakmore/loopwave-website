import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Poppins:wght@200;300;400;500;600;700&display=swap');
        
        .about-minimal {
          font-family: 'Poppins', sans-serif;
        }

        .heading-minimal {
          font-family: 'Space Grotesk', sans-serif;
          letter-spacing: -0.05em;
          line-height: 0.85;
        }

        .minimal-line {
          height: 1px;
          background: linear-gradient(to right, rgba(234, 179, 8, 0.4), transparent);
          width: 100px;
        }
      `}</style>

      <section id="about" className="about-minimal py-40 bg-transparent relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          
          <div className="max-w-6xl mx-auto">
             {/* Simple Top Label */}
             <div className="flex items-center gap-6 mb-20 animate-fade-in-up">
                <span className="text-[#EAB308] text-sm font-bold uppercase tracking-[0.6em]">DNA</span>
                <div className="minimal-line" />
             </div>

             {/* The Massive Headline */}
             <motion.h2 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 1, ease: "easeOut" }}
               viewport={{ once: true }}
               className="heading-minimal text-[12vw] md:text-[10vw] lg:text-[8vw] font-bold text-white mb-24"
             >
               We <span className="text-[#EAB308]">Engineer</span> <br />
               Digital <span className="italic font-light opacity-50">Impact.</span>
             </motion.h2>

             {/* Minimalist Message Grid */}
             <div className="grid lg:grid-cols-2 gap-20 items-start">
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  viewport={{ once: true }}
                  className="text-white/40 text-2xl md:text-3xl font-light leading-relaxed"
                >
                  At LoopWave Media, we strip away the noise to deliver surgical growth for elite brands. No templates. No fluff. Just results.
                </motion.p>
                
                <div className="flex flex-col gap-10">
                   <div className="space-y-4">
                      <span className="text-[#EAB308] text-xs font-bold uppercase tracking-widest block">The Philosophy</span>
                      <p className="text-white/20 text-lg leading-relaxed">
                        Data is the foundation. Design is the bridge. Together, they create ecosystems that dominate.
                      </p>
                   </div>
                   
                   <div className="pt-12 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-12">
                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="flex flex-col group cursor-default transition-all duration-500"
                      >
                         <span className="text-[#EAB308] font-bold text-4xl md:text-5xl heading-minimal group-hover:text-glow transition-all">Strategy.</span>
                         <span className="text-white/60 text-xs uppercase font-bold tracking-[0.4em] mt-3 group-hover:text-[#EAB308] transition-colors">Logic First</span>
                      </motion.div>
                      
                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="flex flex-col group cursor-default transition-all duration-500"
                      >
                         <span className="text-[#EAB308] font-bold text-4xl md:text-5xl heading-minimal group-hover:text-glow transition-all">Growth.</span>
                         <span className="text-white/60 text-xs uppercase font-bold tracking-[0.4em] mt-3 group-hover:text-[#EAB308] transition-colors">ROI Focused</span>
                      </motion.div>
                   </div>
                </div>
             </div>

          </div>

        </div>
      </section>
    </>
  );
};

export default AboutSection;
