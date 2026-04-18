import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, Phone, Send, Instagram, Facebook, ArrowUpRight } from 'lucide-react';
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
      `}</style>

      <section className="py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-24">

            {/* RIGHT SIDE FORM */}
            <div className="p-12 lg:p-16 rounded-[3rem]">
              <form onSubmit={handleSubmit} className="space-y-8">

                {/* NAME */}
                <input
                  type="text"
                  placeholder="What's your name?"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="custom-input w-full px-8 py-5 rounded-2xl 
                  text-black placeholder:text-gray-500 outline-none"
                />

                {/* EMAIL */}
                <input
                  type="email"
                  placeholder="And your email?"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="custom-input w-full px-8 py-5 rounded-2xl 
                  text-black placeholder:text-gray-500 outline-none"
                />

                {/* PHONE */}
                <input
                  type="tel"
                  placeholder="Phone Number (+91...)"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="custom-input w-full px-8 py-5 rounded-2xl 
                  text-black placeholder:text-gray-500 outline-none"
                />

                <Button
                  type="submit"
                  className="w-full bg-[#EAB308] text-black py-6 rounded-xl"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                  {!isSubmitting && <Send className="ml-2 w-4 h-4" />}
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
