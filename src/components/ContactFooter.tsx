import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, CheckCircle2, ArrowUp, Mail, Phone, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ContactFooter() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const detailsRef = useRef<HTMLDivElement | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Custom Web Engineering',
    budget: '$30k – $60k',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from(headlineRef.current, {
        scrollTrigger: {
          trigger: headlineRef.current,
          start: 'top 85%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from(formRef.current, {
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from(detailsRef.current, {
        scrollTrigger: {
          trigger: detailsRef.current,
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: 0.1,
        ease: 'power3.out',
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please provide your name';
    if (!formData.email.trim()) {
      errs.email = 'Please provide your work email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email format';
    }
    if (!formData.message.trim()) errs.message = 'Please share a brief summary of your project';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" ref={sectionRef} className="relative pt-24 pb-12 bg-black border-t border-white/[0.08]">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Apple Style Bold Headline */}
        <div ref={headlineRef} className="mb-20">
          <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-4">
            Initiate Collaboration
          </div>
          <h2 className="font-display text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight text-white max-w-4xl leading-[1.05]">
            Let’s Build Something <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-200 to-neutral-500">
              Extraordinary.
            </span>
          </h2>
        </div>

        {/* Form and Contact Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-white/[0.08]">
          {/* Interactive Form with Minimal Floating Labels */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="p-8 sm:p-10 rounded-2xl bg-neutral-900/60 border border-white/20 text-left animate-in fade-in duration-300">
                <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-white mb-4">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-2">
                  Inquiry Received.
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed mb-6 font-light">
                  Thank you, {formData.name}. Our principal engineer will review your project parameters and respond within 4 hours to arrange an introductory architecture call.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      service: 'Custom Web Engineering',
                      budget: '$30k – $60k',
                      message: '',
                    });
                  }}
                  className="px-5 py-2.5 text-xs font-semibold text-black bg-white rounded-full hover:bg-neutral-200 transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                {/* Name Field */}
                <div className="relative">
                  <input
                    type="text"
                    id="contact-name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder=" "
                    className="peer w-full rounded-xl bg-neutral-900/50 border border-white/10 px-4 pt-6 pb-2 text-white text-sm focus:border-white focus:outline-hidden transition-colors"
                  />
                  <label
                    htmlFor="contact-name"
                    className="absolute left-4 top-2 text-xs font-mono text-neutral-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-neutral-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-white"
                  >
                    Your Full Name *
                  </label>
                  {errors.name && <p className="text-xs text-rose-400 mt-1">{errors.name}</p>}
                </div>

                {/* Email Field */}
                <div className="relative">
                  <input
                    type="email"
                    id="contact-email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder=" "
                    className="peer w-full rounded-xl bg-neutral-900/50 border border-white/10 px-4 pt-6 pb-2 text-white text-sm focus:border-white focus:outline-hidden transition-colors"
                  />
                  <label
                    htmlFor="contact-email"
                    className="absolute left-4 top-2 text-xs font-mono text-neutral-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-neutral-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-white"
                  >
                    Work Email Address *
                  </label>
                  {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email}</p>}
                </div>

                {/* Service and Budget Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-neutral-400 mb-2">
                      Primary Service Focus
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full rounded-xl bg-neutral-900/50 border border-white/10 px-4 py-3 text-white text-sm focus:border-white focus:outline-hidden"
                    >
                      <option value="Custom Web Engineering">Custom Web Engineering</option>
                      <option value="UI/UX Design & Spatial Systems">UI/UX Design & Spatial Systems</option>
                      <option value="E-Commerce & Headless">E-Commerce & Headless</option>
                      <option value="Technical SEO & Performance">Technical SEO & Performance</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-400 mb-2">
                      Estimated Project Budget
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full rounded-xl bg-neutral-900/50 border border-white/10 px-4 py-3 text-white text-sm focus:border-white focus:outline-hidden"
                    >
                      <option value="$15k – $30k">$15k – $30k</option>
                      <option value="$30k – $60k">$30k – $60k</option>
                      <option value="$60k – $120k">$60k – $120k</option>
                      <option value="$120k+">$120k+ (Enterprise Tier)</option>
                    </select>
                  </div>
                </div>

                {/* Message Field */}
                <div className="relative">
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder=" "
                    className="peer w-full rounded-xl bg-neutral-900/50 border border-white/10 px-4 pt-6 pb-2 text-white text-sm focus:border-white focus:outline-hidden transition-colors resize-none"
                  />
                  <label
                    htmlFor="contact-message"
                    className="absolute left-4 top-2 text-xs font-mono text-neutral-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-neutral-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-white"
                  >
                    Project Scope & Desired Timeline *
                  </label>
                  {errors.message && <p className="text-xs text-rose-400 mt-1">{errors.message}</p>}
                </div>

                {/* Apple Style Submit Button */}
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs font-medium text-black bg-white rounded-full hover:bg-neutral-200 transition-colors shadow-sm active:scale-95"
                >
                  <span>Submit Project Inquiry</span>
                  <Send className="h-3.5 w-3.5" />
                </button>
              </form>
            )}
          </div>

          {/* Minimal Agency Details Column */}
          <div ref={detailsRef} className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-3">
                  Direct Inquiries
                </h4>
                <div className="space-y-2">
                  <a
                    href="mailto:hello@kinetic.studio"
                    className="flex items-center gap-2.5 text-white hover:text-neutral-300 transition-colors text-sm font-mono"
                  >
                    <Mail className="h-4 w-4 text-neutral-400" />
                    <span>hello@kinetic.studio</span>
                  </a>
                  <a
                    href="tel:+14158904220"
                    className="flex items-center gap-2.5 text-white hover:text-neutral-300 transition-colors text-sm font-mono"
                  >
                    <Phone className="h-4 w-4 text-neutral-400" />
                    <span>+1 (415) 890-4220</span>
                  </a>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-3">
                  Locations
                </h4>
                <div className="space-y-3 text-sm text-neutral-300">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="h-4 w-4 text-neutral-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-white">San Francisco, CA</div>
                      <div className="text-neutral-500 text-xs font-light">
                        Financial District
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <MapPin className="h-4 w-4 text-neutral-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-white">Zurich, Switzerland</div>
                      <div className="text-neutral-500 text-xs font-light">
                        Talstrasse 62
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Made by Ahmad Hassan - Apple Style Hero Badge */}
              <div className="pt-4 border-t border-white/[0.08]">
                <div className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                  <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest mb-1">
                    Design & Engineering Credit
                  </div>
                  <div className="text-sm font-display font-semibold text-white tracking-tight flex items-center justify-between">
                    <span>Made by Ahmad Hassan</span>
                    <span className="text-xs font-mono text-neutral-400">Lead Architect</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Minimal Social Links */}
            <div>
              <div className="flex items-center gap-5 text-xs font-mono text-neutral-400">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  GitHub
                </a>
                <span>·</span>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  LinkedIn
                </a>
                <span>·</span>
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  X
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Quiet Sub-Footer with Made by Ahmad Hassan */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-mono">
          <div className="flex flex-wrap items-center gap-3">
            <span>© {new Date().getFullYear()} Kinetic Studio.</span>
            <span>·</span>
            <span className="text-neutral-300 font-medium">Made by Ahmad Hassan</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
