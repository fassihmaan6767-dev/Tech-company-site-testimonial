import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface PageTransitionOverlayProps {
  isTransitioning: boolean;
  onTransitionMiddle?: () => void;
  onTransitionEnd?: () => void;
}

export default function PageTransitionOverlay({
  isTransitioning,
  onTransitionMiddle,
  onTransitionEnd,
}: PageTransitionOverlayProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const column1Ref = useRef<HTMLDivElement | null>(null);
  const column2Ref = useRef<HTMLDivElement | null>(null);
  const column3Ref = useRef<HTMLDivElement | null>(null);
  const logoTextRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isTransitioning) return;

    const container = containerRef.current;
    const cols = [column1Ref.current, column2Ref.current, column3Ref.current];
    const logo = logoTextRef.current;
    if (!container || !cols[0] || !cols[1] || !cols[2]) return;

    // Reset initial states
    gsap.set(container, { display: 'flex', pointerEvents: 'auto' });
    gsap.set(cols, { scaleY: 0, transformOrigin: 'bottom center' });
    if (logo) gsap.set(logo, { opacity: 0, y: 15 });

    const tl = gsap.timeline({
      defaults: { ease: 'power4.inOut' },
      onComplete: () => {
        gsap.set(container, { display: 'none', pointerEvents: 'none' });
        if (onTransitionEnd) onTransitionEnd();
      },
    });

    // 1. Shutter columns slide up covering the screen
    tl.to(cols, {
      scaleY: 1,
      duration: 0.55,
      stagger: 0.08,
    })
      .to(
        logo,
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
        },
        '-=0.25'
      )
      .add(() => {
        // Midpoint callback (e.g. scroll window or change state)
        if (onTransitionMiddle) onTransitionMiddle();
      })
      .to(
        logo,
        {
          opacity: 0,
          y: -15,
          duration: 0.25,
          ease: 'power2.in',
        },
        '+=0.1'
      )
      // 2. Shutter columns slide up and exit off top
      .set(cols, { transformOrigin: 'top center' })
      .to(cols, {
        scaleY: 0,
        duration: 0.55,
        stagger: 0.08,
      });

    return () => {
      tl.kill();
    };
  }, [isTransitioning, onTransitionMiddle, onTransitionEnd]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 hidden flex-row pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* 3 Apple-Style Sleek Monochromatic Columns */}
      <div ref={column1Ref} className="flex-1 bg-[#0a0a0c] border-r border-white/[0.04]" />
      <div ref={column2Ref} className="flex-1 bg-[#08080a] border-r border-white/[0.04]" />
      <div ref={column3Ref} className="flex-1 bg-[#0a0a0c]" />

      {/* Floating Center Brand Mark during Transition */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div ref={logoTextRef} className="text-center opacity-0">
          <div className="font-display text-2xl font-bold tracking-tight text-white mb-1">
            KINETIC
          </div>
          <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest">
            Ahmad Hassan Studio
          </div>
        </div>
      </div>
    </div>
  );
}
