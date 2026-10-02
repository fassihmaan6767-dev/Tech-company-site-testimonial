/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useCallback, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import PageTransitionOverlay from './components/PageTransitionOverlay';
import AmbientCanvas from './components/AmbientCanvas';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TextRevealParagraph from './components/TextRevealParagraph';
import MarqueeStrip from './components/MarqueeStrip';
import Services from './components/Services';
import Process from './components/Process';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import ContactFooter from './components/ContactFooter';
import QuoteModal from './components/QuoteModal';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const pendingHrefRef = useRef<string | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis smooth scroll and connect with GSAP ticker & ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    const tickerUpdate = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerUpdate);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerUpdate);
      lenis.destroy();
    };
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    setPreloaderDone(true);
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
  }, []);

  // Trigger seamless GSAP page transition overlay on section navigation
  const handleNavigate = (href: string) => {
    pendingHrefRef.current = href;
    setIsTransitioning(true);
  };

  const handleTransitionMiddle = () => {
    const href = pendingHrefRef.current;
    if (!href || href === '#') {
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    const targetEl = document.querySelector(href);
    if (targetEl) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(targetEl as HTMLElement, { offset: -60, immediate: true });
      } else {
        targetEl.scrollIntoView({ behavior: 'instant' });
      }
    }
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    pendingHrefRef.current = null;
  };

  return (
    <div className="relative min-h-screen bg-black text-neutral-100 selection:bg-white/20 selection:text-white antialiased overflow-x-hidden">
      {/* 1. Custom Minimalist Cursor */}
      <CustomCursor />

      {/* 2. Sleek Preloader with GSAP Clip-Path Reveal */}
      <Preloader onComplete={handlePreloaderComplete} />

      {/* 3. GSAP Seamless Page Transition Shutter Overlay */}
      <PageTransitionOverlay
        isTransitioning={isTransitioning}
        onTransitionMiddle={handleTransitionMiddle}
        onTransitionEnd={handleTransitionEnd}
      />

      {/* Apple Subtle Monochromatic Ambient Mesh Canvas */}
      <AmbientCanvas />

      {/* 4. Sticky Glassmorphic Navigation Bar */}
      <Navbar
        onOpenQuote={() => setQuoteModalOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Main Page Flow */}
      <main className="relative z-10">
        {/* 5. Hero Section with GSAP Split Reveal & Magnetic Buttons */}
        <Hero
          isReady={preloaderDone}
          onStartProject={() => setQuoteModalOpen(true)}
        />

        {/* 6. Kinetic Manifesto: Scroll-Triggered Word/Line Fill Paragraph */}
        <TextRevealParagraph />

        {/* 7. Infinite Marquee Tech Strip */}
        <MarqueeStrip />

        {/* 8. Our Services with 3D Tilt and Fluid Open/Close Modals */}
        <Services onSelectService={() => setQuoteModalOpen(true)} />

        {/* 9. Our Process with Mathematically Aligned Timeline & Fully Visible Cards */}
        <Process />

        {/* 10. Selected Portfolio with Pinned Horizontal Scroll & Fluid Modal */}
        <Portfolio />

        {/* 11. Client Reviews with Fluid Physics Drag & Momentum Swipe */}
        <Testimonials />

        {/* 12. FAQ Section with Clean Animated Accordion Layout */}
        <FAQ />
      </main>

      {/* 13. Contact Section & Quiet Footer (with Made by Ahmad Hassan) */}
      <ContactFooter />

      {/* Interactive "Get a Quote" Scope Calculator with Fluid Open/Close Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
      />
    </div>
  );
}
