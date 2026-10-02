import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Menu, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface NavbarProps {
  onOpenQuote: () => void;
}

export default function Navbar({ onOpenQuote }: NavbarProps) {
  const navRef = useRef<HTMLElement | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      // Don't hide if mobile menu is open or near top
      if (mobileMenuOpen || currentScrollY < 60) {
        gsap.to(nav, { y: 0, duration: 0.35, ease: 'power2.out' });
        lastScrollY = currentScrollY;
        return;
      }

      if (currentScrollY > lastScrollY && currentScrollY > 120) {
        // Scrolling DOWN -> Hide navbar
        gsap.to(nav, { y: -100, duration: 0.35, ease: 'power2.out' });
      } else {
        // Scrolling UP -> Reveal navbar
        gsap.to(nav, { y: 0, duration: 0.35, ease: 'power2.out' });
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Work', href: '#work' },
    { name: 'Process', href: '#process' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
          scrolled ? 'glass-nav shadow-lg shadow-black/30' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-12">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="group flex items-center gap-2 font-display text-2xl font-bold tracking-tight text-white focus-visible:outline-cyan-400"
          >
            <span>KINETIC</span>
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 group-hover:scale-150 transition-transform duration-200" />
          </a>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="relative py-1 hover:text-white transition-colors duration-200 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-cyan-400 transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary action button */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={onOpenQuote}
              className="relative inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-300 rounded-full hover:from-cyan-300 hover:to-white transition-all duration-200 shadow-md shadow-cyan-500/20 active:scale-95"
            >
              <span>Get a Quote</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white rounded-lg focus-visible:outline-cyan-400"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 flex flex-col justify-between bg-[#070709]/95 backdrop-blur-2xl p-8 pt-28 md:hidden">
          <nav className="flex flex-col gap-6 text-2xl font-display font-semibold text-slate-200">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="hover:text-cyan-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="pt-8 border-t border-white/10 space-y-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full flex items-center justify-center gap-2 py-4 text-sm font-semibold uppercase tracking-wider text-slate-950 bg-cyan-400 rounded-xl"
            >
              <span>Get a Quote</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
            <div className="text-xs font-mono text-slate-500 text-center">
              hello@kinetic.studio · Available for Q3/Q4 Projects
            </div>
          </div>
        </div>
      )}
    </>
  );
}
