import { useState, useRef } from 'react';
import {
  Share2,
  Users,
  Palette,
  Search,
  FileText,
  Video,
  TrendingUp,
  ArrowRight
} from 'lucide-react';

const services = [
  { icon: Share2, title: 'Social Media Marketing', description: 'Strategizing and managing your social presence to build engaged communities that convert into loyal brand advocates.', category: 'Engagement' },
  { icon: Users, title: 'Influencer Marketing', description: 'Connecting your brand with the right voices to amplify your message and reach highly targeted audiences effectively.', category: 'Collaboration' },
  { icon: Palette, title: 'Graphic Design', description: 'Crafting unique visual languages and logos that define your brand and separate you from the competition.', category: 'Visuals' },
  { icon: Search, title: 'SEO', description: 'Comprehensive search engine optimization to place your brand at the very top of search rankings and drive organic traffic.', category: 'Optimization' },
  { icon: FileText, title: 'Content Marketing', description: 'High-value storytelling and content creation that educates, inspires, and drives meaningful customer action.', category: 'Storytelling' },
  { icon: Video, title: 'Video Editing', description: 'High-end cinematic editing and storytelling that captures your brand essence in every frame and pixel.', category: 'Creativity' },
  { icon: TrendingUp, title: 'Strategy Marketing', description: 'Data-backed growth roadmaps and market strategies designed to scale your business and maximize your marketing ROI.', category: 'Growth' }
];

const ServicesSection = () => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const sectionRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;

    requestAnimationFrame(() => {
      const rect = sectionRef.current!.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100
      });
    });
  };

  return (
    <>
      <style>{`
        .spotlight-section {
          font-family: 'Poppins', sans-serif;
        }

        .heading-spotlight {
          font-family: 'Space Grotesk', sans-serif;
        }

        /* 🔥 BIGGER + STRONGER SPOTLIGHT */
        .spotlight-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 2;
          background: radial-gradient(
            circle 350px at var(--x) var(--y),
            rgba(234,179,8,0.25),
            rgba(0,0,0,0.92) 65%
          );
          transition: background 0.08s linear;
        }

        /* 🔥 CLEAN PERFORMANCE CARDS */
        .service-tile {
          opacity: 0.25;
          transition: transform 0.4s ease, opacity 0.4s ease;
          will-change: transform;
        }

        .service-tile:hover {
          opacity: 1;
          transform: translateY(-6px) scale(1.04);
        }

        /* 🔥 PERFECT ROUND ICON */
        .icon-circle {
          width: 64px;
          height: 64px;
          border-radius: 999px;
          border: 1px solid rgba(234,179,8,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(234,179,8,0.08);
          transition: all 0.4s ease;
        }

        .service-tile:hover .icon-circle {
          background: #EAB308;
          transform: scale(1.1);
          box-shadow: 0 0 25px rgba(234,179,8,0.4);
        }

        /* MOBILE */
        @media (max-width: 1023px) {
          .spotlight-overlay {
            display: none;
          }
          .service-tile {
            opacity: 1;
          }
        }
      `}</style>

      <section
        ref={sectionRef}
        id="services"
        className="spotlight-section py-32 relative overflow-hidden min-h-screen flex flex-col justify-center"
        onMouseMove={handleMouseMove}
        style={{
          '--x': `${mousePos.x}%`,
          '--y': `${mousePos.y}%`
        } as any}
      >
        {/* Spotlight */}
        <div className="spotlight-overlay" />

        <div className="container mx-auto px-6 lg:px-12 relative z-10">

          {/* Header */}
          <div className="mb-24 text-center">
            <h2 className="heading-spotlight text-6xl md:text-8xl font-bold text-white mb-6">
              Illuminate Your <span className="text-[#EAB308]">Creative</span> Presence
            </h2>
            <p className="text-white/40 text-lg max-w-2xl mx-auto">
              Move your cursor to reveal our specialized solutions.
            </p>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
            {services.map((service) => (
              <div key={service.title} className="service-tile group">

                {/* Category */}
                <div className="mb-4 text-[#EAB308] text-xs tracking-widest uppercase">
                  {service.category}
                </div>

                <div className="flex gap-6 items-start">
                  
                  {/* 🔥 ROUND ICON */}
                  <div className="icon-circle">
                    <service.icon className="w-6 h-6 text-[#EAB308] group-hover:text-black transition-colors" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#EAB308] transition">
                      {service.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2 text-[#EAB308]/50 group-hover:text-[#EAB308] transition">
                  <span className="text-xs tracking-widest">EXPLORE</span>
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
