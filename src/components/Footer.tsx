import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-8 border-t border-border bg-transparent">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
<div className="flex items-center gap-2 h-16">
  <img
    src="/logo.png"
    alt="LoopWave Media Logo"
    className="h-full w-auto object-contain"
  />
</div>


          {/* Copyright */}
          <p className="text-muted-foreground text-sm flex items-center gap-1">
            © 2026 Loop Wave Media. Built with
            <Heart className="w-4 h-4 text-primary fill-primary" />
          </p>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-muted-foreground hover:text-primary text-sm transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary text-sm transition-colors"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
