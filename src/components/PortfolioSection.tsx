import { useState } from 'react';
import { ExternalLink } from 'lucide-react';

const portfolioItems = [
  {
    category: 'Social Media Marketing',
    title: 'Social Media Campaign',
    description: 'Comprehensive social media strategy that increased engagement by 400% and grew follower base across multiple platforms with targeted content and community management.',
    color: 'from-primary/20 to-yellow-dark/20',
  },
  {
    category: 'Email Marketing',
    title: 'Email Marketing Dashboard',
    description: 'Advanced email marketing automation system with real-time analytics, A/B testing capabilities, and personalized customer journeys that achieved 45% open rates.',
    color: 'from-primary/30 to-primary/10',
  },
  {
    category: 'Web Development',
    title: 'Website Redesign Project',
    description: 'Complete website transformation focusing on user experience, modern design principles, and conversion optimization resulting in 250% increase in user engagement.',
    color: 'from-yellow-dark/20 to-primary/20',
  },
  {
    category: 'Brand Strategy',
    title: 'Brand Identity Overhaul',
    description: 'Full brand refresh including logo design, visual identity system, and brand guidelines that repositioned the company as an industry leader.',
    color: 'from-primary/15 to-yellow-bright/15',
  },
  {
    category: 'SEO Optimization',
    title: 'E-commerce SEO Campaign',
    description: 'Technical and content SEO strategy that boosted organic traffic by 320% and improved search rankings for 50+ high-value keywords.',
    color: 'from-yellow-bright/20 to-primary/20',
  },
  {
    category: 'Content Strategy',
    title: 'Content Marketing Suite',
    description: 'Multi-channel content strategy with blog posts, videos, and infographics that established thought leadership and generated 200% more qualified leads.',
    color: 'from-primary/25 to-yellow-dark/25',
  },
];

const PortfolioSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
        #portfolio, #portfolio * { font-family: 'Poppins', sans-serif !important; }
      `}</style>

      <section id="portfolio" className="py-24 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-bold text-3xl md:text-5xl mb-4">
              Our <span className="text-gradient">Portfolio</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore our showcase of successful digital marketing projects. Each campaign
              demonstrates our commitment to delivering exceptional results and innovative solutions.
            </p>
          </div>

          {/* Portfolio Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioItems.map((item, index) => (
              <div
                key={index}
                className="group relative rounded-2xl overflow-hidden cursor-pointer card-hover"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color}`} />

                {/* Pattern Overlay */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
                    backgroundSize: '20px 20px',
                  }}
                />

                {/* Content */}
                <div className="relative p-8 h-full min-h-[320px] flex flex-col bg-card/80 backdrop-blur-sm border border-border group-hover:border-primary/50 transition-all duration-500">
                  {/* Category Badge */}
                  <div className="inline-flex self-start items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span className="text-primary text-xs font-medium">{item.category}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-xl mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm flex-grow">
                    {item.description}
                  </p>

                  {/* View Project Link */}
                  <div className="flex items-center gap-2 text-primary mt-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <span className="font-medium text-sm">View Project</span>
                    <ExternalLink className="w-4 h-4" />
                  </div>

                  {/* Corner Accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default PortfolioSection;