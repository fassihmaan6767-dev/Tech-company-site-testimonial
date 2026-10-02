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
  'Core Web Vitals 100',
  'Micro-Interactions',
];

export default function MarqueeStrip() {
  const marqueeRef = useRef<HTMLDivElement | null>(null);

  return (
    <section className="relative w-full py-6 border-y border-white/[0.08] bg-black overflow-hidden select-none">
      {/* Edge gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      {/* Infinite Scrolling Track */}
      <div
        ref={marqueeRef}
        className="flex w-max items-center animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused]"
      >
        <div className="flex items-center gap-10 pr-10">
          {TECH_STACK.map((tech, index) => (
            <div key={`tech-1-${index}`} className="flex items-center gap-10 whitespace-nowrap">
              <span className="font-display text-xs sm:text-sm font-semibold uppercase tracking-wider text-neutral-400 hover:text-white transition-colors duration-150">
                {tech}
              </span>
              <span className="h-1 w-1 rounded-full bg-neutral-600" aria-hidden="true" />
            </div>
          ))}
        </div>

        <div className="flex items-center gap-10 pr-10" aria-hidden="true">
          {TECH_STACK.map((tech, index) => (
            <div key={`tech-2-${index}`} className="flex items-center gap-10 whitespace-nowrap">
              <span className="font-display text-xs sm:text-sm font-semibold uppercase tracking-wider text-neutral-400 hover:text-white transition-colors duration-150">
                {tech}
              </span>
              <span className="h-1 w-1 rounded-full bg-neutral-600" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
