import { useState } from 'react';
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
  { icon: Share2, title: 'Social Media Marketing', description: 'Strategizing and managing your social presence...', category: 'Engagement' },
  { icon: Users, title: 'Influencer Marketing', description: 'Connecting your brand with the right voices...', category: 'Collaboration' },
  { icon: Palette, title: 'Graphic Design', description: 'Crafting unique visual languages...', category: 'Visuals' },
  { icon: Search, title: 'SEO', description: 'Comprehensive search engine optimization...', category: 'Optimization' },
  { icon: FileText, title: 'Content Marketing', description: 'High-value storytelling and content creation...', category: 'Storytelling' },
  { icon: Video, title: 'Video Editing', description: 'High-end cinematic editing...', category: 'Creativity' },
  { icon: TrendingUp, title: 'Strategy Marketing', description: 'Data-backed growth strategies...', category: 'Growth' }
];

const ServicesSection = () => {
  const [activeIndex, setActiveIndex] = useState(4); // center default

  return (
    <>
      <style>{`
        .spotlight-wrapper {
          position: relative;
        }

        /* 🔥 BIG CENTER GLOW */
        .center-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(234,179,8,0.25), transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        /* 🔥 CARD STATES */
        .service-card {
          transition: all 0.4s ease;
          opacity: 0.15;
          transform: scale(0.95);
        }

        .service-card.active {
          opacity: 1;
          transform: scale(1);
        }

        .service-card:hover {
          opacity: 1;
          transform: scale(1.03);
        }

        /* 🔥 CENTER CARD STYLE */
        .highlight-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(234,179,8,0.3);
          border-radius: 24px;
          padding: 28px;
          box-shadow: 0 0 60px rgba(234,179,8,0.15);
        }

        /* ICON */
        .icon-circle {
          width: 60px;
          height: 60px;
          border-radius: 999px;
          background: #EAB308;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-circle svg {
          color: black;
        }
      `}</style>

      <section className="py-32 relative text-white">
        <div className="spotlight-wrapper">

          {/* CENTER GLOW */}
          <div className="center-glow" />

          <div className="container mx-auto px-6 lg:px-12 relative z-10">

            {/* HEADER */}
            <div className="text-center mb-24">
              <h2 className="text-6xl md:text-8xl font-bold mb-6">
                Illuminate Your <span className="text-[#EAB308]">Creative</span> Presence
              </h2>
              <p className="text-white/40 text-lg">
                Move your cursor to reveal our specialized solutions.
              </p>
            </div>

            {/* GRID */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">

              {services.map((service, i) => {
                const isActive = i === activeIndex;

                return (
                  <div
                    key={service.title}
                    onMouseEnter={() => setActiveIndex(i)}
                    className={`
                      service-card 
                      ${isActive ? 'active highlight-card' : ''}
                    `}
                  >

                    {/* CATEGORY */}
                    <div className="text-[#EAB308] text-xs tracking-widest mb-4 uppercase">
                      {service.category}
                    </div>

                    <div className="flex gap-5">

                      {/* ICON */}
                      <div className="icon-circle">
                        <service.icon className="w-5 h-5" />
                      </div>

                      <div>
                        <h3 className="text-2xl font-bold mb-2 text-[#EAB308]">
                          {service.title}
                        </h3>

                        <p className="text-white/60 text-sm leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    {/* EXPLORE */}
                    <div className="mt-6 flex items-center gap-2 text-[#EAB308] text-sm tracking-widest">
                      EXPLORE <ArrowRight className="w-4 h-4" />
                    </div>

                  </div>
                );
              })}

            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesSection;
