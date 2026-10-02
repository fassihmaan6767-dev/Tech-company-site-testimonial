import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [cursorText, setCursorText] = useState<string>('');
  const [cursorMode, setCursorMode] = useState<'default' | 'subtle' | 'button' | 'badge'>('default');
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Only enable custom cursor for precise pointer devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    document.documentElement.classList.add('custom-cursor-active');

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Responsive lag-free cursor tracking
    const setDotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power3' });
    const setDotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power3' });
    const setRingX = gsap.quickTo(ring, 'x', { duration: 0.22, ease: 'power3' });
    const setRingY = gsap.quickTo(ring, 'y', { duration: 0.22, ease: 'power3' });

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      setDotX(e.clientX);
      setDotY(e.clientY);
      setRingX(e.clientX);
      setRingY(e.clientY);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // 1. Navigation bar & header links: keep cursor minimal and subtle
      const isNav = target.closest('header, nav, [data-cursor="subtle"]');
      if (isNav) {
        // If it's a specific button inside header, treat as button, otherwise keep subtle
        const isHeaderButton = target.closest('header button, nav button');
        if (isHeaderButton) {
          setCursorMode('button');
          setCursorText('');
        } else {
          setCursorMode('subtle');
          setCursorText('');
        }
        return;
      }

      // 2. Element with custom badge text (e.g. project cards)
      const badgeTarget = target.closest('[data-cursor-text]');
      if (badgeTarget) {
        const text = badgeTarget.getAttribute('data-cursor-text');
        if (text) {
          setCursorMode('badge');
          setCursorText(text);
          return;
        }
      }

      // 3. Regular buttons and interactive controls
      const interactiveEl = target.closest('button, [role="button"], input[type="submit"], input[type="button"]');
      if (interactiveEl) {
        setCursorMode('button');
        setCursorText('');
        return;
      }

      // Default state
      setCursorMode('default');
      setCursorText('');
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleElementHover);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleElementHover);
    };
  }, [isVisible]);

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-50 transition-opacity duration-200 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } hidden md:block`}
      aria-hidden="true"
    >
      {/* Central pinpoint dot - Apple pure white */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -ml-1 -mt-1 h-2 w-2 rounded-full bg-white pointer-events-none transition-transform duration-150 ${
          cursorMode === 'badge' ? 'scale-0' : cursorMode === 'button' ? 'scale-125' : 'scale-100'
        }`}
      />

      {/* Smooth fluid follower ring - Apple monochromatic styling */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none flex items-center justify-center rounded-full transition-all duration-200 ease-out ${
          cursorMode === 'badge'
            ? '-ml-8 -mt-8 h-16 w-16 bg-white text-black font-semibold text-[10px] tracking-widest uppercase shadow-xl'
            : cursorMode === 'button'
            ? '-ml-5 -mt-5 h-10 w-10 border border-white/60 bg-white/10 backdrop-blur-xs scale-105'
            : cursorMode === 'subtle'
            ? '-ml-3.5 -mt-3.5 h-7 w-7 border border-white/20 bg-transparent'
            : '-ml-4 -mt-4 h-8 w-8 border border-white/25 bg-transparent'
        }`}
      >
        {cursorMode === 'badge' && cursorText && (
          <span className="animate-in fade-in duration-150 font-mono">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
}
