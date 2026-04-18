import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    quote: "The packaging design perfectly reflects our brand's focus on health and purity. Clean visuals, thoughtful layout, and great attention to detail. Exactly what we needed!",
    name: "Manish Raghuvanshi",
    title: "Yool Fresh",
    initials: "MR",
    color: "rgba(234, 179, 8, 0.1)"
  },
  {
    quote: "We are highly satisfied with the logo design. The final outcome represents our company's values of reliability and professionalism.",
    name: "Aditya Kadam",
    title: "Aditya Construction",
    initials: "AK",
    color: "rgba(255, 255, 255, 0.05)"
  },
  {
    quote: "The animated product video was executed with precision and creativity. It clearly highlights our product benefits and significantly enhances our Amazon listing.",
    name: "Karan",
    title: "Momrushi Herb",
    initials: "EK",
    color: "rgba(234, 179, 8, 0.08)"
  },
  {
    quote: "Exceptional service from start to finish. They truly understand how to connect brands with their audience.",
    name: "Sujal Darekar",
    title: "Eco Green",
    initials: "SD",
    color: "rgba(255, 255, 255, 0.03)"
  },
  {
    quote: "Incredible attention to detail in the UI/UX design. Our users love the new interface!",
    name: "Omkar",
    title: "Tech Solutions",
    initials: "OS",
    color: "rgba(234, 179, 8, 0.12)"
  }
];

const TestimonialCard = ({ testimonial, index, progress, range, targetScale }: any) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start']
  });

  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={containerRef} className="h-[80vh] flex items-center justify-center sticky top-24 sm:top-32 px-6 sm:px-12 z-20">
      <motion.div
        style={{
          scale,
          background: `linear-gradient(135deg, rgba(234, 179, 8, 0.12) 0%, rgba(20, 20, 20, 0.4) 50%, rgba(234, 179, 8, 0.05) 100%)`,
          top: `calc(5% + ${index * 20}px)`
        }}
        className="relative w-full max-w-[850px] h-[360px] sm:h-[460px] rounded-[2.5rem] p-8 sm:p-12 flex flex-col justify-between border border-white/10 overflow-hidden backdrop-blur-md shadow-[0_0_50px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(255,255,255,0.05)]"
      >
        {/* Superior Mirror Reflection Layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent pointer-events-none z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(234,179,8,0.1),transparent_70%)] pointer-events-none" />
        
        {/* Prism Edge Border */}
        <div className="absolute inset-0 rounded-[2.5rem] border border-white/[0.05] pointer-events-none" />
        <div className="absolute inset-0 rounded-[2.5rem] border border-gradient-to-r from-[#EAB308]/20 via-transparent to-[#EAB308]/20 opacity-30 pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-6 sm:gap-8">
          <div className="flex items-center justify-between">
            <Quote className="w-10 sm:w-12 h-10 sm:h-12 text-[#EAB308]/40" />
            <div className="flex gap-1.5 backdrop-blur-md bg-white/5 py-1.5 px-3 rounded-full border border-white/10">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 sm:w-3.5 h-3 sm:h-3.5 fill-[#EAB308] text-[#EAB308]" />
              ))}
            </div>
          </div>
          
          <h3 className="text-xl sm:text-2xl md:text-3.5xl font-medium text-white/95 leading-snug sm:leading-relaxed selection:bg-[#EAB308]/30 tracking-tight">
            "{testimonial.quote}"
          </h3>
        </div>

        <div className="relative z-10 flex items-center justify-between mt-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#EAB308]/10 border border-[#EAB308]/30 flex items-center justify-center text-[#EAB308] text-base font-bold shadow-[0_0_15px_rgba(234,179,8,0.2)]">
              {testimonial.initials}
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white tracking-wide">{testimonial.name}</h4>
              <p className="text-[#EAB308] text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase mt-0.5 opacity-90">
                {testimonial.title}
              </p>
            </div>
          </div>
          
          <div className="hidden sm:flex text-white/5 text-6xl font-black heading-modern select-none">
            0{index + 1}
          </div>
        </div>

        {/* Diagonal Mirror Swipe (Animated Feel) */}
        <div className="absolute inset-x-[-100%] top-0 h-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent skew-x-[-45deg] pointer-events-none" />
      </motion.div>
    </div>
  );
};

const TestimonialsSection = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        .heading-modern { font-family: 'Space Grotesk', sans-serif; }
      `}</style>

      <section 
        id="testimonials" 
        ref={container}
        className="relative py-20 bg-transparent min-h-screen"
      >
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="sticky top-20 text-center mb-10 z-10">
            <motion.span 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-[#EAB308] font-semibold tracking-[0.3em] uppercase text-xs mb-3 inline-block"
            >
              Testimonials
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="heading-modern text-5xl md:text-7xl font-bold text-white selection:bg-[#EAB308]/30"
            >
              Voices of <span className="text-[#EAB308]">Trust.</span>
            </motion.h2>
          </div>

          <div className="mt-20">
            {testimonials.map((testimonial, i) => {
              const targetScale = 1 - ((testimonials.length - i) * 0.05);
              return (
                <TestimonialCard 
                  key={i} 
                  index={i} 
                  testimonial={testimonial} 
                  progress={scrollYProgress} 
                  range={[i * (1 / testimonials.length), 1]} 
                  targetScale={targetScale}
                />
              );
            })}
          </div>
        </div>

        {/* Global Progress Line (Right-side relative) */}
        <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-40 opacity-40 hover:opacity-100 transition-opacity">
          {testimonials.map((_, i) => (
            <motion.div 
              key={i}
              className="w-0.5 h-10 rounded-full bg-white/20 relative"
            >
              <motion.div 
                className="absolute top-0 left-0 w-full bg-[#EAB308] origin-top"
                style={{ 
                  scaleY: useTransform(
                    scrollYProgress, 
                    [i * (1 / testimonials.length), (i + 1) * (1 / testimonials.length)], 
                    [0, 1]
                  )
                }}
              />
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
};

export default TestimonialsSection;
