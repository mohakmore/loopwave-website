import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Send, Instagram, Facebook, ArrowUpRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const scriptUrl = 'https://script.google.com/macros/s/AKfycbyqBGwdZfehvCdHZLcAXcfSt-gmsDYMtQffybAa1Kd51PoJVHDYoA0Flngz1cWKzRb0Yg/exec';

      const response = await fetch(scriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.result === 'success') {
        toast({
          title: 'Transmission Received',
          description: "We've recorded your signal. Our team will reach out within 24 hours.",
        });
        setFormData({ name: '', email: '', phone: '' });
      } else {
        throw new Error(data.message || 'Error occurred');
      }
    } catch (error) {
      console.error('Submission Error:', error);
      toast({
        variant: 'destructive',
        title: 'Signal Interrupted',
        description: 'Please try again or contact us directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { icon: Instagram, href: 'https://www.instagram.com/loopwave.media', label: 'Instagram' },
    { icon: Facebook, href: 'https://www.facebook.com', label: 'Facebook' },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Poppins:wght@200;300;400;500;600&display=swap');
        
        .contact-modern {
          font-family: 'Poppins', sans-serif;
        }

        .heading-contact {
          font-family: 'Space Grotesk', sans-serif;
        }

        .contact-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .contact-card:hover {
          background: rgba(234, 179, 8, 0.05);
          border-color: rgba(234, 179, 8, 0.3);
          transform: translateY(-5px);
        }

        .custom-input {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.4s ease;
        }

        .custom-input:focus {
          background: rgba(234, 179, 8, 0.05);
          border-color: #EAB308;
          box-shadow: 0 0 20px rgba(234, 179, 8, 0.1);
        }

        .floating-text {
          position: absolute;
          font-size: 15rem;
          font-weight: 900;
          color: white;
          opacity: 0.02;
          white-space: nowrap;
          pointer-events: none;
          z-index: 0;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-family: 'Space Grotesk', sans-serif;
        }

        /* 🔥 ONLY THIS IS ADDED */
        @media (max-width: 768px) {
          input.custom-input {
            color: #000 !important;
          }

          input.custom-input::placeholder {
            color: #6b7280 !important;
          }
        }
      `}</style>

      <section id="contact" className="contact-modern py-32 bg-transparent relative overflow-hidden">
        <div className="floating-text">CONTACT US</div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 items-start">
            
            {/* Left Side: Info */}
            <div className="space-y-12">
               <div>
                  <h2 className="heading-contact text-6xl md:text-8xl font-bold text-white mb-8 tracking-tighter">
                    Let's <span className="text-[#EAB308]">Build</span> <br /> Something.
                  </h2>
                  <p className="text-white/50 text-xl font-light leading-relaxed max-w-md">
                    Ready to scale your brand? Drop us a line and let's turn your vision into digital reality.
                  </p>
               </div>

               <div className="grid gap-6">
                  <div className="contact-card p-8 rounded-3xl group cursor-pointer relative overflow-hidden">
                     <div className="flex items-center gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-[#EAB308]/10 flex items-center justify-center group-hover:bg-[#EAB308] transition-all duration-500">
                           <Mail className="w-6 h-6 text-[#EAB308] group-hover:text-black transition-colors" />
                        </div>
                        <div>
                           <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Email Our Team</p>
                           <p className="text-white text-lg font-medium">loopwavemedia.india@gmail.com</p>
                        </div>
                     </div>
                     <ArrowUpRight className="absolute top-8 right-8 w-5 h-5 text-white/20 group-hover:text-[#EAB308] transition-colors" />
                  </div>

                  <div className="contact-card p-8 rounded-3xl group cursor-pointer relative overflow-hidden">
                     <div className="flex items-center gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-[#EAB308]/10 flex items-center justify-center group-hover:bg-[#EAB308] transition-all duration-500">
                           <Phone className="w-6 h-6 text-[#EAB308] group-hover:text-black transition-colors" />
                        </div>
                        <div>
                           <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Direct Line</p>
                           <p className="text-white text-lg font-medium">+91 9987206344</p>
                        </div>
                     </div>
                     <ArrowUpRight className="absolute top-8 right-8 w-5 h-5 text-white/20 group-hover:text-[#EAB308] transition-colors" />
                  </div>
               </div>

               <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center hover:border-[#EAB308]/50 hover:bg-[#EAB308]/10 transition-all duration-500"
                    >
                      <social.icon className="w-6 h-6 text-white/40 hover:text-[#EAB308]" />
                    </a>
                  ))}
               </div>
            </div>

            {/* Right Side: Form */}
            <div className="contact-card p-12 lg:p-16 rounded-[3rem] relative">
               <div className="mb-10 text-left">
                  <h3 className="heading-contact text-3xl font-bold text-white mb-2">Send a Message</h3>
                  <p className="text-white/40 font-light">We typically respond within 24 hours.</p>
               </div>

               <form onSubmit={handleSubmit} className="space-y-8">
                  <input
                    type="text"
                    placeholder="What's your name?"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="custom-input w-full px-8 py-5 rounded-2xl text-white outline-none placeholder:text-white/20"
                  />

                  <input
                    type="email"
                    placeholder="And your email?"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="custom-input w-full px-8 py-5 rounded-2xl text-white outline-none placeholder:text-white/20"
                  />

                  <input
                    type="tel"
                    placeholder="Phone Number (+91...)"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="custom-input w-full px-8 py-5 rounded-2xl text-white outline-none placeholder:text-white/20"
                  />

                  <Button 
                    type="submit" 
                    className="w-full bg-[#EAB308] hover:bg-[#EAB308]/90 text-black font-bold py-8 rounded-2xl"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'INITIATING TRANSMISSION...' : 'START CONVERSATION'}
                    {!isSubmitting && <Send className="w-5 h-5 ml-2" />}
                  </Button>
               </form>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default ContactSection;
