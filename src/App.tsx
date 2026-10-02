/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useCallback } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import AmbientCanvas from './components/AmbientCanvas';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MarqueeStrip from './components/MarqueeStrip';
import Services from './components/Services';
import Process from './components/Process';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import ContactFooter from './components/ContactFooter';
import QuoteModal from './components/QuoteModal';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  // Initialize Lenis smooth scroll and connect with GSAP ticker & ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    // Notify ScrollTrigger whenever Lenis scrolls
    lenis.on('scroll', ScrollTrigger.update);

    // Synchronize GSAP ticker with Lenis frame requests
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
    // Recalculate ScrollTrigger measurements once DOM is revealed
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#070709] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200 antialiased overflow-x-hidden">
      {/* 1. Custom Interactive Cursor */}
      <CustomCursor />

      {/* 2. Sleek Preloader with GSAP Clip-Path Reveal */}
      <Preloader onComplete={handlePreloaderComplete} />

      {/* Interactive 3D Ambient Mesh Canvas */}
      <AmbientCanvas />

      {/* 3. Sticky Glassmorphism Navigation Bar */}
      <Navbar onOpenQuote={() => setQuoteModalOpen(true)} />

      {/* Main Page Flow */}
      <main className="relative z-10">
        {/* 4. Hero Section with GSAP Split Reveal & Magnetic Buttons */}
        <Hero
          isReady={preloaderDone}
          onStartProject={() => setQuoteModalOpen(true)}
        />

        {/* 5. Infinite Marquee Tech Strip */}
        <MarqueeStrip />

        {/* 6. Our Services with 3D Tilt and ScrollTrigger */}
        <Services onSelectService={() => setQuoteModalOpen(true)} />

        {/* 7. Our Process with Dynamic Scroll-Drawn Timeline */}
        <Process />

        {/* 8. Selected Portfolio with Pinned Horizontal Scroll */}
        <Portfolio />

        {/* 9. Client Reviews Draggable Slider */}
        <Testimonials />
      </main>

      {/* 10. Contact Section & Quiet Footer */}
      <ContactFooter />

      {/* Interactive "Get a Quote" Scope Calculator Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
      />
    </div>
  );
}
