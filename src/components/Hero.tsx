import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDownRight } from 'lucide-react';

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
    gsap.set(subheadRef.current, { y: 20, opacity: 0 });
    gsap.set(ctaGroupRef.current, { y: 20, opacity: 0 });
    gsap.set(statsRef.current, { y: 25, opacity: 0 });
    gsap.set(shapeRef.current, { scale: 0.85, opacity: 0 });

    tl.to(words, {
      y: '0%',
      opacity: 1,
      duration: 1.1,
      stagger: 0.06,
    })
      .to(
        subheadRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
        },
        '-=0.7'
      )
      .to(
        ctaGroupRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
        },
        '-=0.6'
      )
      .to(
        shapeRef.current,
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: 'power2.out',
        },
        '-=0.8'
      )
      .to(
        statsRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
        },
        '-=0.5'
      );

    // Continuous subtle floating animation for abstract shape
    gsap.to(shapeRef.current, {
      y: '+=20',
      rotation: 4,
      duration: 6,
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
        x: x * 0.3,
        y: y * 0.3,
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
      className="relative min-h-[90vh] flex flex-col justify-center pt-28 pb-16 px-6 md:px-12 max-w-6xl mx-auto overflow-hidden"
    >
      {/* 3D Floating Apple-Style Monochromatic Kinetic Gyroscope */}
      <div
        ref={shapeRef}
        className="absolute right-0 top-1/4 -z-10 w-[300px] sm:w-[440px] md:w-[540px] h-[300px] sm:h-[440px] md:h-[540px] pointer-events-none select-none opacity-80"
        aria-hidden="true"
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Subtle soft white ambient glow */}
          <div className="absolute inset-0 bg-white/[0.03] rounded-full blur-3xl" />

          {/* SVG Monochromatic Geometric Kinetic Gyroscope */}
          <svg
            viewBox="0 0 500 500"
            className="w-full h-full animate-[spin_32s_linear_infinite]"
          >
            <defs>
              <linearGradient id="appleMonoGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
                <stop offset="50%" stopColor="#d4d4d8" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#71717a" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="appleMonoGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#27272a" stopOpacity="0.1" />
              </linearGradient>
            </defs>

            {/* Concentric Elliptical Orbital Rings */}
            <ellipse
              cx="250"
              cy="250"
              rx="180"
              ry="75"
              fill="none"
              stroke="url(#appleMonoGrad1)"
              strokeWidth="1.5"
              strokeDasharray="6 6"
              transform="rotate(25 250 250)"
            />
            <ellipse
              cx="250"
              cy="250"
              rx="200"
              ry="85"
              fill="none"
              stroke="url(#appleMonoGrad2)"
              strokeWidth="1.5"
              transform="rotate(-40 250 250)"
            />
            <ellipse
              cx="250"
              cy="250"
              rx="160"
              ry="160"
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
            />
            <ellipse
              cx="250"
              cy="250"
              rx="220"
              ry="110"
              fill="none"
              stroke="url(#appleMonoGrad1)"
              strokeWidth="1"
              transform="rotate(65 250 250)"
            />

            {/* Center Core Node */}
            <circle cx="250" cy="250" r="10" fill="#ffffff" />
            <circle cx="250" cy="250" r="28" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          </svg>
        </div>
      </div>

      {/* Hero Subtitle Tag */}
      <div className="inline-flex items-center gap-2 mb-6 text-xs font-mono text-neutral-400">
        <span className="h-1.5 w-1.5 rounded-full bg-white" />
        <span className="uppercase tracking-widest">Digital Experience & Web Engineering</span>
      </div>

      {/* Main Headline with Split Word Reveal */}
      <h1
        ref={headlineRef}
        className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white max-w-5xl leading-[1.08] mb-8"
      >
        {headlineWords.map((word, index) => {
          const isHighlight = word.toLowerCase().includes('convert') || word.toLowerCase().includes('digital');
          return (
            <span key={index} className="inline-block overflow-hidden mr-[0.26em] align-top py-1">
              <span
                className={`hero-word inline-block ${
                  isHighlight
                    ? 'text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-100 to-neutral-400'
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
        className="text-base sm:text-xl md:text-2xl text-neutral-400 max-w-2xl font-light leading-relaxed mb-10"
      >
        We architect high-performance websites, reactive 3D interfaces, and fluid digital products that captivate users and scale business revenue.
      </p>

      {/* Apple-Style Action Buttons */}
      <div ref={ctaGroupRef} className="flex flex-wrap items-center gap-4 mb-16">
        {/* Button 1: Start a Project - Apple White Pill */}
        <button
          ref={btn1Ref}
          onClick={onStartProject}
          className="relative inline-flex items-center justify-center px-7 py-3.5 text-xs font-medium text-black bg-white rounded-full hover:bg-neutral-200 transition-colors shadow-sm group active:scale-95"
        >
          <span className="relative z-10 flex items-center gap-2">
            Start a Project
            <ArrowDownRight className="h-4 w-4 group-hover:rotate-[-45deg] transition-transform duration-200" />
          </span>
        </button>

        {/* Button 2: View Our Work - Apple Frosted Translucent Pill */}
        <a
          ref={btn2Ref}
          href="#work"
          className="relative inline-flex items-center justify-center px-7 py-3.5 text-xs font-medium text-white bg-white/[0.06] border border-white/[0.12] rounded-full hover:bg-white/[0.12] transition-colors"
        >
          <span>View Our Work</span>
        </a>
      </div>

      {/* Quantitative Proof Section */}
      <div
        ref={statsRef}
        className="pt-8 border-t border-white/[0.08] grid grid-cols-2 md:grid-cols-4 gap-6 text-left"
      >
        <div>
          <div className="font-mono text-2xl sm:text-3xl font-bold text-white tabular-nums">
            +184%
          </div>
          <div className="text-xs text-neutral-500 mt-1">Average Conversion Lift</div>
        </div>
        <div>
          <div className="font-mono text-2xl sm:text-3xl font-bold text-white tabular-nums">
            &lt; 0.7s
          </div>
          <div className="text-xs text-neutral-500 mt-1">Lighthouse LCP Speed</div>
        </div>
        <div>
          <div className="font-mono text-2xl sm:text-3xl font-bold text-white tabular-nums">
            $140M+
          </div>
          <div className="text-xs text-neutral-500 mt-1">Client Revenue Generated</div>
        </div>
        <div>
          <div className="font-mono text-2xl sm:text-3xl font-bold text-white tabular-nums">
            100%
          </div>
          <div className="text-xs text-neutral-500 mt-1">On-Time Delivery Rate</div>
        </div>
      </div>
    </section>
  );
}
