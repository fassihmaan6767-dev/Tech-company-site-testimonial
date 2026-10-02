import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { Testimonial } from '../types';

const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    quote:
      'Kinetic rebuilt our fintech platform from scratch. Not only did our Lighthouse score jump to 99, but our customer conversion rate skyrocketed by 184% in the first quarter after launch. Their technical discipline and attention to motion design are in a league of their own.',
    clientName: 'Alexander Vance',
    role: 'Chief Technology Officer',
    company: 'Lumina Global Capital',
    verifiedOutcome: '+184% Conversion Lift in 90 Days',
    rating: 5,
  },
  {
    id: 'test-2',
    quote:
      'Most agencies deliver either great aesthetics or solid engineering. Kinetic is the rare partner that masters both. The headless storefront they designed for Atelier Vesper elevated our entire luxury brand identity and cut our checkout friction to almost zero.',
    clientName: 'Elena Rostova',
    role: 'VP of Digital Commerce',
    company: 'Vesper Haute Parfumerie',
    verifiedOutcome: '+64% Average Order Value',
    rating: 5,
  },
  {
    id: 'test-3',
    quote:
      'The WebGL audio visualizer and reactive 3D interface Kinetic engineered for NeuroSync received praise across the industry and directly helped us close our $14M Series A. They are communicative, proactive, and ruthlessly committed to speed.',
    clientName: 'Dr. Marcus Thorne',
    role: 'Founder & CEO',
    company: 'NeuroSync Technologies',
    verifiedOutcome: '$14M Series A Round Closed',
    rating: 5,
  },
  {
    id: 'test-4',
    quote:
      'From Day 1 of discovery to our global launch, Kinetic adhered strictly to every deadline and architectural milestone. The telemetry web app they built runs at 60fps across every device with zero jank.',
    clientName: 'Sophia Lindqvist',
    role: 'Director of Product',
    company: 'Horizon Automotive Group',
    verifiedOutcome: 'Red Dot: Best of Best 2025',
    rating: 5,
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardContentRef = useRef<HTMLDivElement | null>(null);
  const sliderBoxRef = useRef<HTMLDivElement | null>(null);

  // Drag tracking
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const currentDeltaXRef = useRef(0);

  const transitionToSlide = (nextIndex: number, direction: 'left' | 'right') => {
    const card = cardContentRef.current;
    if (!card) {
      setCurrentIndex(nextIndex);
      return;
    }

    const exitX = direction === 'left' ? -60 : 60;
    const enterX = direction === 'left' ? 60 : -60;

    // Smooth fluid swipe animation
    gsap.to(card, {
      x: exitX,
      opacity: 0,
      duration: 0.22,
      ease: 'power2.in',
      onComplete: () => {
        setCurrentIndex(nextIndex);
        gsap.fromTo(
          card,
          { x: enterX, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.35, ease: 'power3.out' }
        );
      },
    });
  };

  const handleNext = () => {
    const next = (currentIndex + 1) % TESTIMONIALS.length;
    transitionToSlide(next, 'left');
  };

  const handlePrev = () => {
    const prev = (currentIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length;
    transitionToSlide(prev, 'right');
  };

  // Drag interaction with real-time feedback
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    startXRef.current = clientX;
    currentDeltaXRef.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging || !cardContentRef.current) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const delta = clientX - startXRef.current;
    currentDeltaXRef.current = delta;

    // Real-time card tilt and translation during drag
    gsap.set(cardContentRef.current, {
      x: delta * 0.4,
      rotation: (delta / 400) * 2,
    });
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const delta = currentDeltaXRef.current;
    const card = cardContentRef.current;

    if (Math.abs(delta) > 55) {
      if (delta > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    } else if (card) {
      // Elastic spring back to center if swipe threshold wasn't met
      gsap.to(card, {
        x: 0,
        rotation: 0,
        duration: 0.45,
        ease: 'elastic.out(1, 0.4)',
      });
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 9000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const activeTestimonial = TESTIMONIALS[currentIndex];

  return (
    <section id="reviews" className="relative py-28 px-6 md:px-12 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="max-w-2xl mb-16">
        <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-3">
          Client Endorsements
        </div>
        <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
          Trusted by Industry Leaders and Hypergrowth Founders.
        </h2>
        <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed">
          Every partnership is measured by tangible metrics: revenue uplift, engagement velocity, and technical excellence.
        </p>
      </div>

      {/* Draggable Slider Container - Apple Style with Fluid Physics */}
      <div
        ref={sliderBoxRef}
        onMouseDown={handleTouchStart}
        onMouseMove={handleTouchMove}
        onMouseUp={handleTouchEnd}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative bg-neutral-900/40 border border-white/[0.08] rounded-3xl p-8 sm:p-14 overflow-hidden select-none cursor-grab active:cursor-grabbing transition-colors duration-300 hover:border-white/20"
      >
        <div ref={cardContentRef} className="relative z-10 flex flex-col justify-between min-h-[280px]">
          {/* Top Row: Stars and Outcome Metric */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pointer-events-none">
            <div className="flex items-center gap-1 text-white">
              {[...Array(activeTestimonial.rating)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-white text-white" />
              ))}
            </div>

            <div className="font-mono text-xs text-neutral-300 bg-white/[0.06] border border-white/10 px-3 py-1 rounded-full">
              {activeTestimonial.verifiedOutcome}
            </div>
          </div>

          {/* Quote Body */}
          <div className="relative mb-10 pointer-events-none">
            <Quote className="absolute -top-3 -left-4 sm:-left-6 h-8 w-8 text-white/10 pointer-events-none" />
            <p className="font-display text-lg sm:text-2xl md:text-3xl text-neutral-100 font-normal leading-relaxed">
              "{activeTestimonial.quote}"
            </p>
          </div>

          {/* Author Details & Slider Navigation */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-6 border-t border-white/[0.06]">
            <div>
              <div className="font-display text-lg font-bold text-white">
                {activeTestimonial.clientName}
              </div>
              <div className="text-xs text-neutral-400 font-mono mt-0.5">
                {activeTestimonial.role} · <span className="text-white">{activeTestimonial.company}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {TESTIMONIALS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      const dir = idx > currentIndex ? 'left' : 'right';
                      transitionToSlide(idx, dir);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={handlePrev}
                  className="p-2.5 rounded-full bg-white/[0.06] border border-white/10 text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2.5 rounded-full bg-white/[0.06] border border-white/10 text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
