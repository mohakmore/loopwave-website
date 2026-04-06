import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, ArrowRight, Play } from 'lucide-react';
import GlobeCanvas from './GlobeCanvas';

interface HeroSectionProps {
  onPortfolioOpen?: () => void;
}

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Contact', href: '#contact' },
];

const HeroSection = ({ onPortfolioOpen }: HeroSectionProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700;800&display=swap');

        #home {
          font-family: 'Poppins', sans-serif;
        }

        .heading-modern {
          font-family: 'Space Grotesk', sans-serif;
        }

        .modern-gradient-text {
          background: linear-gradient(135deg, hsl(var(--foreground)) 0%, hsl(var(--primary)) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>

      <section
        id="home"
        className="relative min-h-[90vh] lg:min-h-screen flex flex-col justify-start overflow-x-hidden overflow-y-visible bg-transparent"
      >


        {/* Navbar */}
        <nav
          className={`w-full transition-all duration-500 z-50 fixed top-0 left-0 ${isScrolled
            ? 'bg-background/80 backdrop-blur-xl border-b border-foreground/5 shadow-sm py-3'
            : 'bg-transparent py-5'
            }`}
        >
          <div className="w-full px-6 lg:pl-32 lg:pr-32">
            <div className="flex items-center justify-between">
              <a href="#home" className="flex items-center group relative z-50">
                <img
                  src="/logo.png"
                  alt="LoopWave Media Logo"
                  className={`w-auto object-contain transition-all duration-500 origin-left hover:opacity-80 ${isScrolled ? 'h-20' : 'h-24 lg:h-28'}`}
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </a>

              <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
                <div className="flex items-center gap-1 bg-white/5 backdrop-blur-xl border border-white/10 px-2 py-1.5 rounded-full shadow-2xl">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="relative px-5 py-2 text-sm font-medium tracking-wide text-white/70 hover:text-white transition-all duration-300 group overflow-hidden rounded-full"
                    >
                      <span className="relative z-10">{link.name}</span>
                      <span className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-full scale-0 group-hover:scale-100" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 z-50">
                <div className="hidden lg:block">
                  <a href="#contact">
                    <Button variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 active:scale-95 rounded-full px-6 py-5 shadow-lg transition-all duration-300 font-bold tracking-wider text-xs border-none">
                      CONTACT US
                    </Button>
                  </a>
                </div>
                <button
                  className="lg:hidden text-foreground p-3 bg-foreground/5 rounded-full backdrop-blur-md relative z-50"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden fixed inset-0 bg-background/98 backdrop-blur-xl z-[45] transition-all duration-500 ease-out flex items-center justify-center ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
        >
          <div className="flex flex-col items-center gap-8 w-full px-8">
            {navLinks.map((link, i) => (
              <a
                key={link.name}
                href={link.href}
                className="text-4xl heading-modern font-bold text-foreground/90 hover:text-primary transition-all duration-300"
                style={{ transitionDelay: `${i * 50}ms`, transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)', opacity: isMobileMenuOpen ? 1 : 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="w-full mt-6" style={{ transitionDelay: '300ms' }}>
              <a href="#contact" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="default" className="w-full rounded-full py-8 text-xl bg-primary shadow-lg border border-primary/50">
                  CONTACT US
                </Button>
              </a>
            </div>
          </div>
        </div>

        <div className="w-full px-6 lg:pl-32 lg:pr-32 relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-between mt-40 lg:mt-12 gap-10 pt-24 pb-20">
          
          {/* Left: Text */}
          <div className="w-full lg:w-[55%] flex flex-col items-start text-left z-20">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md mb-8 lg:mb-10 animate-fade-in-up">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary shadow-[0_0_8px_rgba(var(--primary),0.8)]"></span>
              </span>
              <span className="text-primary font-semibold tracking-[0.15em] text-xs sm:text-sm uppercase">
                A Complete loop Digital Excellence
              </span>
            </div>

            <h1 className="heading-modern font-bold text-5xl sm:text-6xl md:text-7xl xl:text-[5.5rem] mb-6 lg:mb-8 leading-[1.05] tracking-tight text-foreground animate-slide-up">
              Transform Your
              <br />
              Brand's <span className="modern-gradient-text">Digital</span>
              <br />
              <span className="relative inline-block mt-1">
                <span className="relative z-10 modern-gradient-text px-2">Presence</span>
                <span className="absolute bottom-1 left-0 w-full h-4 sm:h-6 lg:h-8 bg-primary/30 -rotate-2 z-0 scale-105 skew-x-12"></span>
              </span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-foreground/70 max-w-2xl mb-12 leading-relaxed font-light animate-slide-up delay-200">
              We create smart marketing strategies that boost your reach, engage your audience, and <strong className="font-semibold text-foreground/90">grow your business.</strong>
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto animate-slide-up delay-300">
              <a href="#contact" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto overflow-hidden relative group bg-primary text-primary-foreground hover:bg-primary active:scale-95 rounded-full px-10 py-7 text-lg tracking-wide shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:shadow-[0_0_40px_rgba(var(--primary),0.5)] transition-all duration-300">
                  <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">
                    CONTACT US
                    <span className="bg-white/20 p-1.5 rounded-full ml-2 group-hover:bg-white/30 transition-colors">
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out z-0"></span>
                </Button>
              </a>

              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto group rounded-full px-10 py-7 text-lg font-medium tracking-wide bg-transparent hover:bg-foreground/5 border-foreground/10 hover:border-foreground/20 transition-all duration-300 active:scale-95"
                onClick={onPortfolioOpen}
              >
                <div className="relative flex items-center justify-center w-10 h-10 rounded-full border border-foreground/20 mr-4 group-hover:border-primary/50 transition-colors duration-300">
                  <Play className="w-4 h-4 text-foreground group-hover:text-primary transition-colors ml-1" />
                </div>
                Checkout Portfolio
              </Button>
            </div>
          </div>

          {/* Right: react-globe.gl Globe with concentric rings */}
          <div className="hidden lg:flex w-full lg:w-[45%] relative h-[500px] sm:h-[620px] lg:h-[760px] mt-10 lg:mt-0 justify-center lg:justify-end items-center z-10 animate-fade-in-up delay-400">

            {/* Globe container with concentric rings */}
            <div className="relative w-full max-w-[700px] aspect-square z-10 lg:scale-100">
              {/* Outer concentric rings - moved inside to stay aligned with globe */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="absolute w-[115%] aspect-square rounded-full border border-primary/10 bg-primary/[0.02]" />
                <div className="absolute w-[135%] aspect-square rounded-full border border-dashed border-primary/[0.06] bg-primary/[0.01]" />
                <div className="absolute w-[165%] aspect-square rounded-full border border-white/[0.04]" />
              </div>

              {/* Globe component */}
              <GlobeCanvas />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;