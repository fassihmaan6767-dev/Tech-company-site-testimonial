import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Menu, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface NavbarProps {
  onOpenQuote: () => void;
  onNavigate?: (href: string) => void;
}

export default function Navbar({ onOpenQuote, onNavigate }: NavbarProps) {
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

  // Clean, minimal nav links
  const navLinks = [
    { name: 'Work', href: '#work' },
    { name: 'Services', href: '#services' },
    { name: 'Process', href: '#process' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(href);
    } else {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header
        ref={navRef}
        data-cursor="subtle"
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
          scrolled
            ? 'bg-black/80 backdrop-blur-2xl border-b border-white/[0.08] shadow-lg shadow-black/50'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-6 md:px-12">
          {/* Zone 1: Wordmark */}
          <a
            href="#"
            onClick={(e) => handleLinkClick(e, '#')}
            className="flex items-center gap-2 font-display text-xl font-bold tracking-tight text-white hover:text-neutral-200 transition-colors"
          >
            <span>KINETIC</span>
          </a>

          {/* Zone 2: Clean, minimal text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-neutral-400">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="py-1 hover:text-white transition-colors duration-150"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Zone 3: Apple style pure white pill CTA button */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={onOpenQuote}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-medium text-black bg-white rounded-full hover:bg-neutral-200 transition-colors active:scale-95 shadow-xs"
            >
              <span>Get a Quote</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-400 hover:text-white rounded-lg"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu - Apple Minimalist */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 flex flex-col justify-between bg-black/95 backdrop-blur-2xl p-8 pt-24 md:hidden">
          <nav className="flex flex-col gap-5 text-xl font-display font-medium text-neutral-300">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="pt-6 border-t border-white/10 space-y-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full flex items-center justify-center gap-2 py-3.5 text-xs font-semibold uppercase tracking-wider text-black bg-white rounded-full"
            >
              <span>Get a Quote</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
            <div className="text-xs font-mono text-neutral-500 text-center">
              hello@kinetic.studio
            </div>
          </div>
        </div>
      )}
    </>
  );
}
