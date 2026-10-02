import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Compass, Cpu, Gauge, ArrowRight, CheckCircle2, X } from 'lucide-react';
import { Service } from '../types';

gsap.registerPlugin(ScrollTrigger);

const SERVICES: Service[] = [
  {
    id: 'web-dev',
    number: '01',
    title: 'Custom Web Engineering',
    shortDesc: 'End-to-end full-stack architectures engineered with React, Next.js, and TypeScript for mission-critical web platforms.',
    fullDesc: 'We build ultra-resilient, component-driven web applications that eliminate technical debt. From complex SaaS dashboards and reactive databases to dynamic customer portals, we prioritize clean modular architecture, strict type-safety, and sub-second execution.',
    deliverables: [
      'Production-Grade React / Next.js Frameworks',
      'Scalable TypeScript & Serverless Microservices',
      'Real-Time WebSockets & Collaborative Canvases',
      'API Integration & Secure Role-Based Access',
    ],
    tools: ['React 19', 'Next.js', 'Node.js', 'Tailwind', 'GraphQL'],
    highlightMetric: '99.98% System Reliability',
    iconName: 'code',
  },
  {
    id: 'ui-ux',
    number: '02',
    title: 'UI/UX Design & Spatial Systems',
    shortDesc: 'Bespoke design systems, high-character visual identities, and reactive micro-interactions that leave indelible impressions.',
    fullDesc: 'Great design is purposeful storytelling combined with spatial rigor. We create cohesive design tokens, micro-interactions, responsive typography hierarchies, and tactile feedback loops that convert passive visitors into devoted brand advocates.',
    deliverables: [
      'Comprehensive Figma Design Systems & Tokens',
      'Interactive Prototyping & Motion Choreography',
      'Accessible WCAG AA Compliant Components',
      'Creative Direction & Spatial Brand Presence',
    ],
    tools: ['Figma', 'GSAP', 'Motion', 'Design Tokens', 'Tailwind'],
    highlightMetric: '+78% Session Engagement',
    iconName: 'compass',
  },
  {
    id: 'ecommerce',
    number: '03',
    title: 'E-Commerce & Conversion Engines',
    shortDesc: 'Headless commerce storefronts optimized for friction-free checkout, rapid discovery, and high average order value.',
    fullDesc: 'We architect headless e-commerce solutions that bypass clunky template constraints. By decoupling the frontend presentation layer from the checkout engine, we achieve instant page transitions, hyper-personalized product filtering, and accelerated checkouts.',
    deliverables: [
      'Headless Shopify & Custom Cart Architecture',
      'Sub-Second Global Search & Faceted Filtering',
      'Frictionless One-Click Checkout Integrations',
      'Conversion Rate Optimization (CRO) A/B Testing',
    ],
    tools: ['Shopify Plus', 'Stripe', 'Algolia', 'Edge CDN'],
    highlightMetric: '+64% Average Order Value',
    iconName: 'cpu',
  },
  {
    id: 'seo-perf',
    number: '04',
    title: 'Technical SEO & Performance',
    shortDesc: 'Lighthouse 100 audits, edge CDN acceleration, and semantic structured data designed to dominate search engine rankings.',
    fullDesc: 'Speed is a core product feature. We optimize critical rendering paths, eliminate layout shifts, and implement deep Schema.org structured data, guaranteeing peak Core Web Vitals scores and organic algorithmic visibility across search engines.',
    deliverables: [
      'Perfect 100 Core Web Vitals Audits & Remediation',
      'Schema.org JSON-LD Rich Snippet Architectures',
      'Edge Asset Compression & Zero-Jank Hydration',
      'Internationalized Multi-Region SEO Foundations',
    ],
    tools: ['Lighthouse', 'Vercel Edge', 'Schema.org', 'Cloudflare'],
    highlightMetric: '< 0.6s Time-To-Interactive',
    iconName: 'gauge',
  },
];

interface ServicesProps {
  onSelectService?: (service: Service) => void;
}

export default function Services({ onSelectService }: ServicesProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);
  const [activeModalService, setActiveModalService] = useState<Service | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsContainerRef.current?.querySelectorAll('.service-card');
    if (!section || !cards) return;

    // Stagger fade and slide up animation using ScrollTrigger
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from(cards, {
        scrollTrigger: {
          trigger: cardsContainerRef.current,
          start: 'top 80%',
        },
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // 3D Tilt Effect on mouse move over individual cards
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;

    gsap.to(card, {
      transformPerspective: 1000,
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.35,
      ease: 'power2.out',
    });

    // Update dynamic specular glare
    const glare = card.querySelector('.card-glare') as HTMLElement | null;
    if (glare) {
      glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(6, 182, 212, 0.14) 0%, transparent 60%)`;
    }
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    gsap.to(card, {
      transformPerspective: 1000,
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: 'power3.out',
    });

    const glare = card.querySelector('.card-glare') as HTMLElement | null;
    if (glare) {
      glare.style.background = 'transparent';
    }
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'code':
        return <Code2 className="h-6 w-6 text-cyan-400" />;
      case 'compass':
        return <Compass className="h-6 w-6 text-sky-400" />;
      case 'cpu':
        return <Cpu className="h-6 w-6 text-violet-400" />;
      case 'gauge':
      default:
        return <Gauge className="h-6 w-6 text-emerald-400" />;
    }
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto"
    >
      {/* Section Header */}
      <div ref={headerRef} className="max-w-3xl mb-16">
        <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-3">
          Specialized Disciplines
        </div>
        <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
          Architected for Speed, Conversion, and Enduring Brand Equity.
        </h2>
        <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
          We combine cutting-edge frontend engineering with spatial design rigor. Every interface is handcrafted to deliver measurable business performance.
        </p>
      </div>

      {/* Services Grid with 3D Tilt and Stagger */}
      <div
        ref={cardsContainerRef}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {SERVICES.map((service) => (
          <div
            key={service.id}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            onClick={() => setActiveModalService(service)}
            data-cursor-text="EXPAND"
            className="service-card group relative p-8 sm:p-10 rounded-2xl bg-[#0e0e14] border border-white/10 hover:border-cyan-500/50 transition-colors duration-300 cursor-pointer overflow-hidden transform-gpu flex flex-col justify-between"
          >
            {/* Dynamic specular glare overlay */}
            <div className="card-glare absolute inset-0 pointer-events-none transition-opacity duration-200" />

            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-cyan-400/40 transition-colors duration-200">
                    {getIcon(service.iconName)}
                  </div>
                  <span className="font-mono text-sm font-semibold text-slate-500 tracking-wider">
                    {service.number}
                  </span>
                </div>

                {/* Highlight Metric */}
                <span className="font-mono text-xs font-medium text-cyan-400/90 tracking-wide tabular-nums">
                  {service.highlightMetric}
                </span>
              </div>

              {/* Title & Short Description */}
              <h3 className="font-display text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors duration-200">
                {service.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 font-light">
                {service.shortDesc}
              </p>

              {/* Tech Stack Unboxed Metadata */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 mb-8 font-mono">
                {service.tools.map((tool, idx) => (
                  <span key={tool} className="flex items-center gap-3">
                    <span>{tool}</span>
                    {idx < service.tools.length - 1 && <span className="text-slate-700">·</span>}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Action Affordance */}
            <div className="pt-6 border-t border-white/5 flex items-center justify-between text-xs font-medium text-slate-400 group-hover:text-white transition-colors">
              <span className="font-mono uppercase tracking-wider">Explore Capabilities</span>
              <div className="flex items-center gap-1 text-cyan-400 group-hover:translate-x-1 transition-transform duration-200">
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Service Detail Modal */}
      {activeModalService && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveModalService(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-[#0c0c12] border border-white/15 rounded-2xl p-6 sm:p-10 shadow-2xl text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModalService(null)}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Close details"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs text-cyan-400 tracking-wider">
                {activeModalService.number} / SERVICE SPECIFICATION
              </span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4">
              {activeModalService.title}
            </h3>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-light">
              {activeModalService.fullDesc}
            </p>

            <div className="mb-6">
              <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-3">
                Key Deliverables & Outcomes
              </h4>
              <div className="space-y-2.5">
                {activeModalService.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                    <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <div className="text-xs font-mono text-slate-400">
                Target Metric: <span className="text-cyan-400 font-semibold">{activeModalService.highlightMetric}</span>
              </div>
              <button
                onClick={() => {
                  if (onSelectService) onSelectService(activeModalService);
                  setActiveModalService(null);
                }}
                className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-cyan-400 rounded-full hover:bg-cyan-300 transition-colors"
              >
                Inquire About Service
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
