import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Palette, Terminal, Rocket, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Discovery & Strategic Architecture',
    subtitle: 'Aligning business metrics with technical requirements',
    description:
      'We deconstruct your market positioning, conversion bottlenecks, and technical requirements. We define user flows, design tokens, and select the optimal modern stack to ensure long-term scalability.',
    deliverables: ['Architecture Blueprint', 'Tech Stack Evaluation', 'Competitive Spatial Audit'],
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
    deliverables: ['Production React Codebase', 'GSAP & ScrollTrigger Choreography', 'API & Edge Architecture'],
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
      // 1. Scroll-driven vertical line progress that draws downward
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
            scrub: 0.4,
          },
        }
      );

      // 2. Illuminate each milestone node & card as line reaches it
      stepCards.forEach((card) => {
        const nodeDot = card.querySelector('.node-dot');
        const nodeInner = card.querySelector('.node-inner');
        const cardBox = card.querySelector('.node-card-box');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        });

        tl.to(nodeDot, {
          borderColor: '#ffffff',
          backgroundColor: '#18181b',
          boxShadow: '0 0 25px rgba(255, 255, 255, 0.45)',
          scale: 1.15,
          duration: 0.35,
          ease: 'power2.out',
        })
          .to(
            nodeInner,
            {
              backgroundColor: '#ffffff',
              duration: 0.25,
            },
            '-=0.3'
          )
          .to(
            cardBox,
            {
              borderColor: 'rgba(255, 255, 255, 0.35)',
              backgroundColor: 'rgba(24, 24, 27, 0.65)',
              duration: 0.4,
              ease: 'power2.out',
            },
            '-=0.25'
          );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative py-28 px-6 md:px-12 max-w-6xl mx-auto"
    >
      {/* Section Header */}
      <div className="max-w-2xl mb-20">
        <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-3">
          Predictable Execution
        </div>
        <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
          Our Four-Stage Engineering Process.
        </h2>
        <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed">
          From first discovery sprint to global CDN deployment, our workflow eliminates guesswork through weekly milestones, live staging URLs, and zero scope ambiguity.
        </p>
      </div>

      {/* Vertical Timeline Container - Mathematically Centered */}
      <div ref={stepsContainerRef} className="relative max-w-4xl mx-auto">
        {/* Background Guide Line: Positioned at 19px (dead center of 40px rail) */}
        <div
          className="absolute left-[19px] top-6 bottom-10 w-[2px] bg-white/[0.08] pointer-events-none"
          aria-hidden="true"
        />

        {/* Dynamic Animated Scroll Line: Exactly at 19px, draws down through dot centers */}
        <div
          ref={lineProgressRef}
          className="absolute left-[19px] top-6 bottom-10 w-[2px] bg-white origin-top pointer-events-none shadow-[0_0_8px_rgba(255,255,255,0.6)]"
          style={{ transform: 'scaleY(0)' }}
          aria-hidden="true"
        />

        {/* Steps List - Always visible and prominently styled */}
        <div className="space-y-10 sm:space-y-14">
          {PROCESS_STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className="process-item relative flex items-start gap-4 sm:gap-8"
              >
                {/* Milestone Node on the timeline: 40px wide rail with center alignment */}
                <div className="w-10 shrink-0 flex justify-center pt-5 z-10">
                  <div className="node-dot h-7 w-7 rounded-full border border-white/20 bg-[#0a0a0c] flex items-center justify-center transition-all duration-300">
                    <div className="node-inner h-2 w-2 rounded-full bg-neutral-600 transition-colors" />
                  </div>
                </div>

                {/* Node Card Content - Always 100% visible, smoothly highlights on reach */}
                <div className="node-card-box flex-1 p-6 sm:p-8 rounded-2xl bg-neutral-900/50 border border-white/[0.08] transition-all duration-300 hover:border-white/30">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-white/[0.06] text-white">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="font-mono text-xs font-semibold uppercase tracking-wider text-white">
                        Stage {step.step}
                      </span>
                    </div>

                    <span className="font-mono text-xs text-neutral-400 border border-white/10 px-3 py-1 rounded-full bg-black/40">
                      {step.duration}
                    </span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <div className="text-xs text-neutral-400 font-mono mb-4">{step.subtitle}</div>

                  <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-light mb-6">
                    {step.description}
                  </p>

                  {/* Deliverables Unboxed Metadata */}
                  <div className="pt-4 border-t border-white/[0.06] flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-neutral-400">
                    <span className="font-mono uppercase text-neutral-500 text-[10px]">Deliverables:</span>
                    {step.deliverables.map((del, dIdx) => (
                      <span key={dIdx} className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-3 w-3 text-neutral-400" />
                        <span className="text-neutral-200 font-medium">{del}</span>
                        {dIdx < step.deliverables.length - 1 && <span className="text-neutral-600 ml-1">·</span>}
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
