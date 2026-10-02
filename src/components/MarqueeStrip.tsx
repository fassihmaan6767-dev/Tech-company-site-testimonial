import { useRef } from 'react';

const TECH_STACK = [
  'React 19',
  'Next.js 15',
  'GSAP Animation',
  'ScrollTrigger',
  'Lenis Smooth Scroll',
  'Tailwind CSS',
  'Three.js / WebGL',
  'TypeScript',
  'Node.js',
  'Full-Stack Architecture',
  'UI/UX Craft',
  'Web3 & Crypto',
  'Core Web Vitals 100',
  'Micro-Interactions',
];

export default function MarqueeStrip() {
  const marqueeRef = useRef<HTMLDivElement | null>(null);

  return (
    <section className="relative w-full py-8 border-y border-white/10 bg-[#0a0a0f] overflow-hidden select-none">
      {/* Subtle edge fading gradients */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#070709] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#070709] to-transparent z-10 pointer-events-none" />

      {/* Infinite Scrolling Track */}
      <div
        ref={marqueeRef}
        className="flex w-max items-center animate-[marquee_28s_linear_infinite] hover:[animation-play-state:paused]"
      >
        {/* First set */}
        <div className="flex items-center gap-10 pr-10">
          {TECH_STACK.map((tech, index) => (
            <div key={`tech-1-${index}`} className="flex items-center gap-10 whitespace-nowrap">
              <span className="font-display text-sm sm:text-base font-bold uppercase tracking-wider text-slate-400 hover:text-cyan-300 transition-colors duration-200">
                {tech}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-500/60" aria-hidden="true" />
            </div>
          ))}
        </div>

        {/* Duplicate set for seamless infinite loop */}
        <div className="flex items-center gap-10 pr-10" aria-hidden="true">
          {TECH_STACK.map((tech, index) => (
            <div key={`tech-2-${index}`} className="flex items-center gap-10 whitespace-nowrap">
              <span className="font-display text-sm sm:text-base font-bold uppercase tracking-wider text-slate-400 hover:text-cyan-300 transition-colors duration-200">
                {tech}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-500/60" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
