import { useState, useRef, useEffect } from 'react';
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
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  // Mouse / Touch drag handlers
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : (e as React.MouseEvent).clientX;
    const diff = clientX - startX;

    if (diff > 50) {
      handlePrev();
    } else if (diff < -50) {
      handleNext();
    }
  };

  // Auto-advance every 8 seconds if not interacting
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const activeTestimonial = TESTIMONIALS[currentIndex];

  return (
    <section id="reviews" className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="max-w-3xl mb-16">
        <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-3">
          Client Endorsements
        </div>
        <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
          Trusted by Industry Leaders and Hypergrowth Founders.
        </h2>
        <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
          Every partnership is measured by tangible metrics: revenue uplift, engagement velocity, and technical excellence.
        </p>
      </div>

      {/* Draggable Slider Container */}
      <div
        ref={sliderRef}
        onMouseDown={handleTouchStart}
        onMouseUp={handleTouchEnd}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative bg-[#0d0d14] border border-white/10 rounded-3xl p-8 sm:p-14 overflow-hidden select-none cursor-grab active:cursor-grabbing transition-all duration-300 hover:border-cyan-500/40"
      >
        {/* Background Ambient Glow */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col justify-between min-h-[300px]">
          {/* Top Row: Quote Icon & Rating & Metric Tag */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(activeTestimonial.rating)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400" />
              ))}
            </div>

            <div className="font-mono text-xs text-cyan-400 bg-cyan-950/50 border border-cyan-500/30 px-3 py-1 rounded-full">
              {activeTestimonial.verifiedOutcome}
            </div>
          </div>

          {/* Quote Body */}
          <div className="relative mb-10">
            <Quote className="absolute -top-3 -left-4 sm:-left-6 h-8 w-8 text-white/10 pointer-events-none" />
            <p className="font-display text-lg sm:text-2xl md:text-3xl text-slate-100 font-normal leading-relaxed">
              "{activeTestimonial.quote}"
            </p>
          </div>

          {/* Author Details & Slider Navigation */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-6 border-t border-white/10">
            <div>
              <div className="font-display text-lg font-bold text-white">
                {activeTestimonial.clientName}
              </div>
              <div className="text-xs text-slate-400 font-mono mt-1">
                {activeTestimonial.role} · <span className="text-cyan-400">{activeTestimonial.company}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {TESTIMONIALS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentIndex ? 'w-8 bg-cyan-400' : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={handlePrev}
                  className="p-3 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-3 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
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
