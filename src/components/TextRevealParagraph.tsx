import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, ShieldCheck, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const MANIFESTO_TEXT =
  'We reject the sea of generic digital noise. We believe great software is an enduring human craft—where architectural speed, typographic proportion, and tactile kinetic motion converge into digital products that feel effortless, intuitive, and unforgettable.';

export default function TextRevealParagraph() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const proofRef = useRef<HTMLDivElement | null>(null);

  const words = MANIFESTO_TEXT.split(' ');

  useEffect(() => {
    const section = sectionRef.current;
    const textEl = textRef.current;
    if (!section || !textEl) return;

    const wordSpans = textEl.querySelectorAll('.manifesto-word');
    if (!wordSpans || wordSpans.length === 0) return;

    const ctx = gsap.context(() => {
      // Fluid word-by-word line fill scrubbed directly to scroll
      gsap.fromTo(
        wordSpans,
        {
          opacity: 0.15,
          color: '#52525b',
          y: 4,
        },
        {
          opacity: 1,
          color: '#ffffff',
          y: 0,
          stagger: 0.05,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            end: 'bottom 45%',
            scrub: 0.4,
          },
        }
      );

      // Fade in bottom human proof points
      gsap.from(proofRef.current, {
        scrollTrigger: {
          trigger: proofRef.current,
          start: 'top 85%',
        },
        y: 25,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 px-6 md:px-12 max-w-5xl mx-auto overflow-hidden"
    >
      <div ref={containerRef} className="relative">
        {/* Section Pill Subtitle */}
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 mb-6">
          <Sparkles className="h-3.5 w-3.5 text-white" />
          <span>The Kinetic Philosophy</span>
        </div>

        {/* Scroll-Driven Line/Word Filling Paragraph */}
        <p
          ref={textRef}
          className="font-display text-2xl sm:text-4xl md:text-5xl font-semibold leading-[1.3] tracking-tight mb-16 select-none"
        >
          {words.map((word, idx) => (
            <span
              key={idx}
              className="manifesto-word inline-block mr-[0.24em] transition-colors duration-150"
            >
              {word}
            </span>
          ))}
        </p>

        {/* Humanized Agency Proof Pillars */}
        <div
          ref={proofRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-white/[0.08]"
        >
          <div className="p-6 rounded-2xl bg-neutral-900/30 border border-white/[0.06]">
            <div className="h-8 w-8 rounded-lg bg-white/[0.06] flex items-center justify-center text-white mb-4">
              <Zap className="h-4 w-4" />
            </div>
            <h4 className="font-display text-base font-bold text-white mb-2">
              Sub-Second Execution
            </h4>
            <p className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed">
              We engineer zero-bloat codebases benchmarked to hit 100/100 Core Web Vitals on real mobile devices globally.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-900/30 border border-white/[0.06]">
            <div className="h-8 w-8 rounded-lg bg-white/[0.06] flex items-center justify-center text-white mb-4">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <h4 className="font-display text-base font-bold text-white mb-2">
              Zero Technical Debt
            </h4>
            <p className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed">
              Strict type safety, modular micro-components, and scalable architecture designed to evolve gracefully for years.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-900/30 border border-white/[0.06]">
            <div className="h-8 w-8 rounded-lg bg-white/[0.06] flex items-center justify-center text-white mb-4">
              <span className="font-mono text-xs font-bold text-white">AH</span>
            </div>
            <h4 className="font-display text-base font-bold text-white mb-2">
              Bespoke Human Craft
            </h4>
            <p className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed">
              Every curve, font pairing, and interaction rhythm is meticulously authored by Ahmad Hassan and our core team.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
