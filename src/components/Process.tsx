import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Palette, Terminal, Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Discovery & Strategic Architecture',
    subtitle: 'Aligning business metrics with technical requirements',
    description:
      'We deconstruct your market positioning, conversion bottlenecks, and technical requirements. We define user flows, design tokens, and select the optimal modern stack to ensure long-term scalability.',
    deliverables: ['Conversion Architecture Blueprint', 'Tech Stack Evaluation', 'Competitive Spatial Audit'],
    duration: 'Week 1–2',
    icon: Search,
  },
  {
    step: '02',
    title: 'UI/UX Design & Kinetic Prototyping',
    subtitle: 'Crafting the visual language and spatial motion rhythm',
    description:
      'We design high-fidelity interfaces with bespoke typography, subtle glassmorphism, and intentional micro-interactions. Every transition and hover curve is tested for tactile delight.',
    deliverables: ['Figma Design System & Tokens', 'Interactive Motion Prototypes', 'Responsive Layout System'],
    duration: 'Week 3–4',
    icon: Palette,
  },
  {
    step: '03',
    title: 'Production Engineering & Motion',
    subtitle: 'Zero-compromise full-stack code implementation',
    description:
      'We bring designs to life using modern React, TypeScript, GSAP, and Tailwind. We implement butter-smooth Lenis scrolling, compositor-only animations, and resilient state architecture.',
    deliverables: ['Production React/Next.js Codebase', 'GSAP & ScrollTrigger Choreography', 'API & Database Integration'],
    duration: 'Week 5–7',
    icon: Terminal,
  },
  {
    step: '04',
    title: 'Global Launch & Core Web Vitals',
    subtitle: 'Sub-second performance and conversion validation',
    description:
      'We perform exhaustive cross-device QA, edge caching configuration, and Lighthouse 100 benchmarking. We launch with real-time conversion telemetry and zero downtime.',
    deliverables: ['Lighthouse 100 Audit', 'Global Edge CDN Setup', 'Post-Launch Conversion Analytics'],
    duration: 'Week 8',
    icon: Rocket,
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const lineProgressRef = useRef<HTMLDivElement | null>(null);
  const stepsContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const lineProgress = lineProgressRef.current;
    const stepCards = stepsContainerRef.current?.querySelectorAll('.process-item');
    if (!section || !lineProgress || !stepCards) return;

    const ctx = gsap.context(() => {
      // 1. Scroll-driven vertical line progress that "draws" downwards
      gsap.fromTo(
        lineProgress,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: stepsContainerRef.current,
            start: 'top 70%',
            end: 'bottom 80%',
            scrub: 0.5,
          },
        }
      );

      // 2. Illuminate each milestone node as it enters viewport
      stepCards.forEach((card) => {
        const nodeDot = card.querySelector('.node-dot');
        const nodeContent = card.querySelector('.node-content');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        });

        tl.to(nodeDot, {
          backgroundColor: '#06b6d4',
          borderColor: '#a5f3fc',
          boxShadow: '0 0 25px rgba(6,182,212,0.8)',
          scale: 1.25,
          duration: 0.4,
          ease: 'power2.out',
        }).from(
          nodeContent,
          {
            x: 40,
            opacity: 0,
            duration: 0.7,
            ease: 'power3.out',
          },
          '-=0.3'
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto"
    >
      {/* Section Header */}
      <div className="max-w-3xl mb-20">
        <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-3">
          Predictable Execution
        </div>
        <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
          Our Four-Stage Engineering Process.
        </h2>
        <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
          From first concept to global CDN distribution, our systematic workflow guarantees absolute transparency, zero scope creep, and uncompromising quality.
        </p>
      </div>

      {/* Vertical Timeline Container */}
      <div ref={stepsContainerRef} className="relative max-w-4xl mx-auto pl-6 sm:pl-10 md:pl-12">
        {/* Background Guide Line */}
        <div className="absolute left-[13px] sm:left-[21px] md:left-[25px] top-6 bottom-6 w-[2px] bg-white/10" />

        {/* Dynamic Animated Scroll Line that draws itself down */}
        <div
          ref={lineProgressRef}
          className="absolute left-[13px] sm:left-[21px] md:left-[25px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-cyan-400 via-sky-400 to-violet-500 origin-top"
          style={{ transform: 'scaleY(0)' }}
        />

        {/* Steps */}
        <div className="space-y-16 sm:space-y-20">
          {PROCESS_STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className="process-item relative flex items-start gap-6 sm:gap-10"
              >
                {/* Milestone Node on the timeline */}
                <div className="relative -ml-[19px] sm:-ml-[27px] md:-ml-[31px] z-10 shrink-0">
                  <div className="node-dot h-8 w-8 rounded-full border-2 border-white/20 bg-[#0e0e14] flex items-center justify-center transition-all duration-300">
                    <div className="h-2 w-2 rounded-full bg-slate-400" />
                  </div>
                </div>

                {/* Node Card Content */}
                <div className="node-content flex-1 p-6 sm:p-8 rounded-2xl bg-[#0e0e14] border border-white/10 hover:border-cyan-500/30 transition-colors duration-200">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-white/5 text-cyan-400">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="font-mono text-xs font-semibold uppercase tracking-wider text-cyan-400">
                        Stage {step.step}
                      </span>
                    </div>

                    <span className="font-mono text-xs text-slate-500 border border-white/10 px-3 py-1 rounded-full">
                      {step.duration}
                    </span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <div className="text-xs text-slate-400 font-mono mb-4">{step.subtitle}</div>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light mb-6">
                    {step.description}
                  </p>

                  {/* Deliverables Unboxed Metadata */}
                  <div className="pt-4 border-t border-white/5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-400">
                    <span className="font-mono uppercase text-slate-500 text-[10px]">Deliverables:</span>
                    {step.deliverables.map((del, dIdx) => (
                      <span key={dIdx} className="flex items-center gap-2">
                        <span className="text-slate-300 font-medium">{del}</span>
                        {dIdx < step.deliverables.length - 1 && <span className="text-slate-600">·</span>}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
