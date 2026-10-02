import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, CheckCircle2, ArrowUp, Mail, Phone, MapPin, Globe } from 'lucide-react';

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
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      });

      gsap.from(formRef.current, {
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from(detailsRef.current, {
        scrollTrigger: {
          trigger: detailsRef.current,
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: 0.15,
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
    <footer id="contact" ref={sectionRef} className="relative pt-24 pb-12 bg-[#050507] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Massive Bold Headline */}
        <div ref={headlineRef} className="mb-20">
          <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-4">
            Initiate Collaboration
          </div>
          <h2 className="font-display text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight text-white max-w-5xl leading-[1.05]">
            Let’s Build Something{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400">
              Extraordinary.
            </span>
          </h2>
        </div>

        {/* Form and Contact Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-20 border-b border-white/10">
          {/* Interactive Form with Floating Labels */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="p-10 rounded-3xl bg-[#0e0e14] border border-cyan-500/40 text-left animate-in fade-in zoom-in-95 duration-300">
                <div className="h-12 w-12 rounded-full bg-cyan-400/10 flex items-center justify-center text-cyan-400 mb-6">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-2">
                  Inquiry Received.
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6 font-light">
                  Thank you for reaching out, {formData.name}. Our principal architect will review your project parameters and respond within 4 business hours to schedule a technical discovery call.
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
                  className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-cyan-400 rounded-full hover:bg-cyan-300 transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                {/* Name Floating Field */}
                <div className="relative">
                  <input
                    type="text"
                    id="contact-name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder=" "
                    className="peer w-full rounded-xl bg-[#0c0c12] border border-white/15 px-4 pt-6 pb-2 text-white text-sm focus:border-cyan-400 focus:outline-hidden transition-colors"
                  />
                  <label
                    htmlFor="contact-name"
                    className="absolute left-4 top-2 text-xs font-mono text-slate-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-cyan-400"
                  >
                    Your Full Name *
                  </label>
                  {errors.name && <p className="text-xs text-rose-400 mt-1">{errors.name}</p>}
                </div>

                {/* Email Floating Field */}
                <div className="relative">
                  <input
                    type="email"
                    id="contact-email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder=" "
                    className="peer w-full rounded-xl bg-[#0c0c12] border border-white/15 px-4 pt-6 pb-2 text-white text-sm focus:border-cyan-400 focus:outline-hidden transition-colors"
                  />
                  <label
                    htmlFor="contact-email"
                    className="absolute left-4 top-2 text-xs font-mono text-slate-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-cyan-400"
                  >
                    Work Email Address *
                  </label>
                  {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email}</p>}
                </div>

                {/* Service and Budget Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-2">
                      Primary Service Discipline
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full rounded-xl bg-[#0c0c12] border border-white/15 px-4 py-3 text-white text-sm focus:border-cyan-400 focus:outline-hidden"
                    >
                      <option value="Custom Web Engineering">Custom Web Engineering</option>
                      <option value="UI/UX Design & Spatial Systems">UI/UX Design & Spatial Systems</option>
                      <option value="E-Commerce & Headless">E-Commerce & Headless</option>
                      <option value="Technical SEO & Performance">Technical SEO & Performance</option>
                      <option value="End-to-End Agency Retainer">End-to-End Agency Retainer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-2">
                      Estimated Project Budget
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full rounded-xl bg-[#0c0c12] border border-white/15 px-4 py-3 text-white text-sm focus:border-cyan-400 focus:outline-hidden"
                    >
                      <option value="$15k – $30k">$15k – $30k</option>
                      <option value="$30k – $60k">$30k – $60k</option>
                      <option value="$60k – $120k">$60k – $120k</option>
                      <option value="$120k+">$120k+ (Enterprise Tier)</option>
                    </select>
                  </div>
                </div>

                {/* Message Floating Field */}
                <div className="relative">
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder=" "
                    className="peer w-full rounded-xl bg-[#0c0c12] border border-white/15 px-4 pt-6 pb-2 text-white text-sm focus:border-cyan-400 focus:outline-hidden transition-colors resize-none"
                  />
                  <label
                    htmlFor="contact-message"
                    className="absolute left-4 top-2 text-xs font-mono text-slate-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-cyan-400"
                  >
                    Project Scope & Desired Timeline *
                  </label>
                  {errors.message && <p className="text-xs text-rose-400 mt-1">{errors.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  data-cursor-text="SEND"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-400 rounded-full hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all duration-200"
                >
                  <span>Submit Project Inquiry</span>
                  <Send className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>

          {/* Agency Details Column */}
          <div ref={detailsRef} className="lg:col-span-5 flex flex-col justify-between space-y-10">
            <div className="space-y-8">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-3">
                  Direct Inquiries
                </h4>
                <div className="space-y-3">
                  <a
                    href="mailto:hello@kinetic.studio"
                    className="flex items-center gap-3 text-white hover:text-cyan-400 transition-colors text-base font-mono"
                  >
                    <Mail className="h-4 w-4 text-cyan-400" />
                    <span>hello@kinetic.studio</span>
                  </a>
                  <a
                    href="tel:+14158904220"
                    className="flex items-center gap-3 text-white hover:text-cyan-400 transition-colors text-base font-mono"
                  >
                    <Phone className="h-4 w-4 text-cyan-400" />
                    <span>+1 (415) 890-4220</span>
                  </a>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-3">
                  Physical Hubs
                </h4>
                <div className="space-y-4 text-sm text-slate-300">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-cyan-400 shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-white">San Francisco, CA</div>
                      <div className="text-slate-400 text-xs font-light">
                        550 Montgomery St, Financial District
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Globe className="h-4 w-4 text-violet-400 shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-white">Zurich, Switzerland</div>
                      <div className="text-slate-400 text-xs font-light">
                        Talstrasse 62, 8001 Zürich
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-3">
                  Availability Notice
                </h4>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 font-light leading-relaxed">
                  Currently booking new full-scale engineering and design engagements starting in Q3/Q4. We take on at most 3 client partnerships per quarter to ensure partner-level attention.
                </div>
              </div>
            </div>

            {/* Social Network Links */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-3">
                Social Networks & Accreditations
              </h4>
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
                  GitHub
                </a>
                <span>·</span>
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
                  X (Twitter)
                </a>
                <span>·</span>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
                  LinkedIn
                </a>
                <span>·</span>
                <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
                  Dribbble
                </a>
                <span>·</span>
                <a href="https://awwwards.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
                  Awwwards
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Quiet Sub-Footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <div>
            © {new Date().getFullYear()} Kinetic Digital Studio Inc. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span>SF (UTC-7) · ZRH (UTC+2)</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-white transition-colors"
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
