import { useState, useRef } from 'react';
import {
  Share2,
  Users,
  Palette,
  Search,
  FileText,
  Video,
  TrendingUp,
  ArrowRight,
  MousePointer2
} from 'lucide-react';

const services = [
  {
    icon: Share2,
    title: 'Social Media Marketing',
    description: 'Strategizing and managing your social presence to build engaged communities that convert into loyal brand advocates.',
    category: 'Engagement'
  },
  {
    icon: Users,
    title: 'Influencer Marketing',
    description: 'Connecting your brand with the right voices to amplify your message and reach highly targeted audiences effectively.',
    category: 'Collaboration'
  },
  {
    icon: Palette,
    title: 'Graphic Design',
    description: 'Crafting unique visual languages and logos that define your brand and separate you from the competition.',
    category: 'Visuals'
  },
  {
    icon: Search,
    title: 'SEO',
    description: 'Comprehensive search engine optimization to place your brand at the very top of search rankings and drive organic traffic.',
    category: 'Optimization'
  },
  {
    icon: FileText,
    title: 'Content Marketing',
    description: 'High-value storytelling and content creation that educates, inspires, and drives meaningful customer action.',
    category: 'Storytelling'
  },
  {
    icon: Video,
    title: 'Video Editing',
    description: 'High-end cinematic editing and storytelling that captures your brand essence in every frame and pixel.',
    category: 'Creativity'
  },
  {
    icon: TrendingUp,
    title: 'Strategy Marketing',
    description: 'Data-backed growth roadmaps and market strategies designed to scale your business and maximize your marketing ROI.',
    category: 'Growth'
  }
];

const ServicesSection = () => {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovering, setIsHovering] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Poppins:wght@200;300;400;500;600;700&display=swap');
        
        .spotlight-section {
          font-family: 'Poppins', sans-serif;
          cursor: none;
          mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent);
          -webkit-mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent);
        }

        .heading-spotlight {
          font-family: 'Space Grotesk', sans-serif;
        }

        .spotlight-reveal {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle 250px at var(--x) var(--y),
            rgba(234, 179, 8, 0.15) 0%,
            transparent 100%
          );
          pointer-events: none;
          z-index: 2;
        }

        .custom-cursor {
          position: absolute;
          width: 40px;
          height: 40px;
          border: 1px solid #EAB308;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          left: var(--x);
          top: var(--y);
          pointer-events: none;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          mix-blend-mode: difference;
          transition: width 0.3s, height 0.3s;
        }

        .spotlight-section:hover .custom-cursor {
          width: 60px;
          height: 60px;
        }

        .service-tile {
          transition: all 0.5s ease;
          opacity: 0.15;
          filter: grayscale(1) blur(2px);
        }

        /* Target the tile under the spotlight using proximity logic is hard with pure CSS, 
           so we use a simpler 'active' feel */
        .service-tile:hover {
          opacity: 1;
          filter: grayscale(0) blur(0);
          transform: scale(1.05);
        }

        .text-glow {
          text-shadow: 0 0 20px rgba(234, 179, 8, 0.3);
        }
      `}</style>

      <section
        ref={sectionRef}
        id="services"
        className="spotlight-section py-32 relative overflow-hidden min-h-screen flex flex-col justify-center bg-transparent"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        style={{ '--x': `${mousePos.x}px`, '--y': `${mousePos.y}px` } as any}
      >
        {/* The Spotlight Mask */}
        <div className="spotlight-reveal" />

        {/* Custom Interactive Cursor */}
        {isHovering && (
          <div className="custom-cursor">
            <div className="w-1 h-1 bg-[#EAB308] rounded-full" />
          </div>
        )}



        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          {/* Header */}
          <div className="mb-24 flex flex-col items-center text-center">
            <div className="flex items-center gap-2 mb-6">
              <span className="h-[1px] w-12 bg-[#EAB308]/30" />
              <span className="text-[#EAB308] text-sm font-bold uppercase tracking-[0.4em]">Our Services</span>
              <span className="h-[1px] w-12 bg-[#EAB308]/30" />
            </div>
            <h2 className="heading-spotlight text-6xl md:text-8xl font-bold text-white mb-8 tracking-tighter opacity-80 hover:opacity-100 transition-opacity">
              Illuminate Your <span className="text-[#EAB308]">Creative</span> Presence
            </h2>
            <p className="text-white/40 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
              Move your cursor to shed <span className="text-[#EAB308]">spotlight</span> on our specialized solutions designed for the digital frontier.
            </p>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-24">
            {services.map((service, i) => (
              <div
                key={service.title}
                className="service-tile group relative flex flex-col items-start"
              >
                {/* Category Label */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-[#EAB308] text-[10px] font-bold tracking-[0.3em] uppercase">
                    {service.category}
                  </span>
                  <div className="h-[1px] w-8 bg-[#EAB308]/20 group-hover:w-16 transition-all duration-700" />
                </div>

                {/* Main Content */}
                <div className="flex items-start gap-8">
                  <div className="w-14 h-14 rounded-full border border-[#EAB308]/20 flex items-center justify-center shrink-0 group-hover:bg-[#EAB308] group-hover:border-[#EAB308] transition-all duration-500 overflow-hidden">
                    <service.icon className="w-6 h-6 text-[#EAB308] group-hover:text-black transition-colors" />
                  </div>

                  <div>
                    <h3 className="heading-spotlight text-3xl font-bold text-white mb-4 group-hover:text-[#EAB308] transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-white/50 text-base font-light leading-relaxed group-hover:text-white/80 transition-colors">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Interaction Indicator */}
                <div className="mt-8 flex items-center gap-2 text-[#EAB308]/40 group-hover:text-[#EAB308] transition-all">
                  <span className="text-xs font-bold uppercase tracking-widest translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all">Explore</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesSection;