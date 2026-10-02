import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const counterRef = useRef<HTMLSpanElement | null>(null);
  const progressFillRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const counterObj = { value: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        setIsDone(true);
        onComplete();
      },
    });

    // 1. Animate count from 0 to 100
    tl.to(counterObj, {
      value: 100,
      duration: 1.6,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = Math.floor(counterObj.value).toString().padStart(2, '0');
        }
        if (progressFillRef.current) {
          progressFillRef.current.style.width = `${counterObj.value}%`;
        }
      },
    });

    // 2. Elements fade and slide upward slightly
    tl.to(
      [titleRef.current, subtitleRef.current, counterRef.current?.parentElement],
      {
        y: -25,
        opacity: 0,
        stagger: 0.06,
        duration: 0.45,
        ease: 'power3.in',
      },
      '+=0.1'
    );

    // 3. Dramatic GSAP clip-path reveal curtain sliding upwards
    tl.to(containerRef.current, {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
      duration: 1.0,
      ease: 'expo.inOut',
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col justify-between bg-black p-8 md:p-14 text-white"
      style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
    >
      {/* Top Bar inside Preloader */}
      <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-neutral-500">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          Kinetic Studio
        </span>
        <span>Zurich · San Francisco</span>
      </div>

      {/* Center Content */}
      <div className="max-w-2xl">
        <h1
          ref={titleRef}
          className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-4"
        >
          Crafting The <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-200 to-neutral-500">
            Next Digital Era.
          </span>
        </h1>
        <p
          ref={subtitleRef}
          className="text-neutral-400 text-sm sm:text-base font-light max-w-md"
        >
          Award-winning digital experience agency engineering reactive web applications and modern brand platforms.
        </p>
      </div>

      {/* Bottom Counter & Progress Bar */}
      <div className="w-full space-y-4">
        <div className="flex items-end justify-between font-mono">
          <span className="text-xs text-neutral-500 uppercase tracking-widest">
            INITIALIZING ASSETS & MOTION
          </span>
          <div className="text-4xl sm:text-6xl font-bold text-white tabular-nums">
            <span ref={counterRef}>00</span>
            <span className="text-xl sm:text-2xl text-neutral-500 ml-1">%</span>
          </div>
        </div>

        {/* Progress line */}
        <div className="h-[2px] w-full bg-white/10 overflow-hidden">
          <div
            ref={progressFillRef}
            className="h-full w-0 bg-gradient-to-r from-neutral-600 via-neutral-300 to-white transition-all duration-75"
          />
        </div>
      </div>
    </div>
  );
}
