import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDownRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onStartProject: () => void;
  isReady: boolean;
}

export default function Hero({ onStartProject, isReady }: HeroProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const subheadRef = useRef<HTMLParagraphElement | null>(null);
  const ctaGroupRef = useRef<HTMLDivElement | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const shapeRef = useRef<HTMLDivElement | null>(null);

  // Magnetic button refs
  const btn1Ref = useRef<HTMLButtonElement | null>(null);
  const btn2Ref = useRef<HTMLAnchorElement | null>(null);

  // Initialize GSAP split-reveal animation once preloader finishes
  useEffect(() => {
    if (!isReady) return;

    const words = headlineRef.current?.querySelectorAll('.hero-word');
    if (!words || words.length === 0) return;

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    // Set initial states
    gsap.set(words, { y: '120%', opacity: 0 });
    gsap.set(subheadRef.current, { y: 25, opacity: 0 });
    gsap.set(ctaGroupRef.current, { y: 25, opacity: 0 });
    gsap.set(statsRef.current, { y: 30, opacity: 0 });
    gsap.set(shapeRef.current, { scale: 0.8, opacity: 0 });

    tl.to(words, {
      y: '0%',
      opacity: 1,
      duration: 1.1,
      stagger: 0.07,
    })
      .to(
        subheadRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
        },
        '-=0.7'
      )
      .to(
        ctaGroupRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
        },
        '-=0.6'
      )
      .to(
        shapeRef.current,
        {
          scale: 1,
          opacity: 1,
          duration: 1.4,
          ease: 'power2.out',
        },
        '-=0.9'
      )
      .to(
        statsRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
        },
        '-=0.6'
      );

    // Continuous subtle floating animation for abstract shape
    gsap.to(shapeRef.current, {
      y: '+=25',
      rotation: 6,
      duration: 5,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });
  }, [isReady]);

  // Magnetic button hover effect setup
  const setupMagnetic = (el: HTMLElement | null) => {
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);

      gsap.to(el, {
        x: x * 0.35,
        y: y * 0.35,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  };

  useEffect(() => {
    const clean1 = setupMagnetic(btn1Ref.current);
    const clean2 = setupMagnetic(btn2Ref.current);
    return () => {
      if (clean1) clean1();
      if (clean2) clean2();
    };
  }, []);

  const headlineText = 'Crafting Digital Experiences That Convert.';
  const headlineWords = headlineText.split(' ');

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] flex flex-col justify-center pt-28 pb-16 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden"
    >
      {/* 3D Floating Abstract Visual Element */}
      <div
        ref={shapeRef}
        className="absolute right-0 top-1/4 -z-10 w-[320px] sm:w-[460px] md:w-[580px] h-[320px] sm:h-[460px] md:h-[580px] pointer-events-none select-none opacity-90"
        aria-hidden="true"
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Animated Glowing Radial Halo */}
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-sky-500/15 to-violet-600/25 rounded-full blur-3xl" />

          {/* SVG Complex Geometric Kinetic Torus / Gyroscope */}
          <svg
            viewBox="0 0 500 500"
            className="w-full h-full animate-[spin_24s_linear_infinite] drop-shadow-[0_0_30px_rgba(6,182,212,0.35)]"
          >
            <defs>
              <linearGradient id="cyberGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.7" />
              </linearGradient>
              <linearGradient id="cyberGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.3" />
              </linearGradient>
            </defs>

            {/* Concentric Elliptical Orbital Rings */}
            <ellipse
              cx="250"
              cy="250"
              rx="180"
              ry="75"
              fill="none"
              stroke="url(#cyberGrad1)"
              strokeWidth="1.5"
              strokeDasharray="8 6"
              transform="rotate(25 250 250)"
            />
            <ellipse
              cx="250"
              cy="250"
              rx="195"
              ry="85"
              fill="none"
              stroke="url(#cyberGrad2)"
              strokeWidth="2"
              transform="rotate(-40 250 250)"
            />
            <ellipse
              cx="250"
              cy="250"
              rx="160"
              ry="160"
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
            />
            <ellipse
              cx="250"
              cy="250"
              rx="215"
              ry="105"
              fill="none"
              stroke="url(#cyberGrad1)"
              strokeWidth="1.5"
              transform="rotate(65 250 250)"
            />

            {/* Center Core Node */}
            <circle cx="250" cy="250" r="14" fill="#06b6d4" className="animate-pulse" />
            <circle cx="250" cy="250" r="32" fill="none" stroke="rgba(6,182,212,0.4)" strokeWidth="1" />
          </svg>
        </div>
      </div>

      {/* Hero Badge Tagline */}
      <div className="inline-flex items-center gap-2 mb-6 text-xs font-mono text-cyan-400">
        <Sparkles className="h-3.5 w-3.5" />
        <span className="uppercase tracking-widest">Next-Generation Web Engineering & UI/UX</span>
      </div>

      {/* Main Headline with Split Word Reveal */}
      <h1
        ref={headlineRef}
        className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white max-w-5xl leading-[1.08] mb-8"
      >
        {headlineWords.map((word, index) => {
          const isHighlight = word.toLowerCase().includes('convert') || word.toLowerCase().includes('digital');
          return (
            <span key={index} className="inline-block overflow-hidden mr-[0.28em] align-top py-1">
              <span
                className={`hero-word inline-block ${
                  isHighlight
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400'
                    : 'text-white'
                }`}
              >
                {word}
              </span>
            </span>
          );
        })}
      </h1>

      {/* Subheadline */}
      <p
        ref={subheadRef}
        className="text-base sm:text-xl md:text-2xl text-slate-300 max-w-2xl font-light leading-relaxed mb-10"
      >
        We architect high-performance websites, reactive 3D interfaces, and fluid digital products that captivate users and scale business revenue.
      </p>

      {/* Magnetic Action Buttons */}
      <div ref={ctaGroupRef} className="flex flex-wrap items-center gap-5 mb-16">
        {/* Button 1: Start a Project (Magnetic) */}
        <button
          ref={btn1Ref}
          onClick={onStartProject}
          data-cursor-text="START"
          className="relative inline-flex items-center justify-center px-8 py-4 text-sm font-semibold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-sky-400 rounded-full hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-shadow duration-300 group"
        >
          <span className="relative z-10 flex items-center gap-2">
            Start a Project
            <ArrowDownRight className="h-4 w-4 group-hover:rotate-[-45deg] transition-transform duration-200" />
          </span>
        </button>

        {/* Button 2: View Our Work (Magnetic) */}
        <a
          ref={btn2Ref}
          href="#work"
          data-cursor-text="WORK"
          className="relative inline-flex items-center justify-center px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white border border-white/20 rounded-full hover:border-cyan-400/80 hover:bg-white/5 transition-all duration-300"
        >
          <span>View Our Work</span>
        </a>
      </div>

      {/* Claim-to-Proof Quantitative Adjacency */}
      <div
        ref={statsRef}
        className="pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-left"
      >
        <div>
          <div className="font-mono text-2xl sm:text-3xl font-bold text-white tabular-nums">
            +184<span className="text-cyan-400">%</span>
          </div>
          <div className="text-xs text-slate-400 mt-1">Average Conversion Lift</div>
        </div>
        <div>
          <div className="font-mono text-2xl sm:text-3xl font-bold text-white tabular-nums">
            &lt; 0.7<span className="text-cyan-400">s</span>
          </div>
          <div className="text-xs text-slate-400 mt-1">Lighthouse LCP Speed</div>
        </div>
        <div>
          <div className="font-mono text-2xl sm:text-3xl font-bold text-white tabular-nums">
            $140<span className="text-violet-400">M+</span>
          </div>
          <div className="text-xs text-slate-400 mt-1">Client Revenue Generated</div>
        </div>
        <div>
          <div className="font-mono text-2xl sm:text-3xl font-bold text-white tabular-nums">
            100<span className="text-cyan-400">%</span>
          </div>
          <div className="text-xs text-slate-400 mt-1">On-Time Delivery Rate</div>
        </div>
      </div>
    </section>
  );
}
