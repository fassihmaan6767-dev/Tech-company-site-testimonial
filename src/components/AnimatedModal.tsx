import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { X } from 'lucide-react';

interface AnimatedModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: string;
}

export default function AnimatedModal({
  isOpen,
  onClose,
  children,
  maxWidth = 'max-w-3xl',
}: AnimatedModalProps) {
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const modalBoxRef = useRef<HTMLDivElement | null>(null);
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!shouldRender) return;

    const backdrop = backdropRef.current;
    const box = modalBoxRef.current;
    if (!backdrop || !box) return;

    if (isOpen) {
      // Open Animation
      gsap.fromTo(
        backdrop,
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: 'power2.out' }
      );

      gsap.fromTo(
        box,
        {
          scale: 0.92,
          y: 30,
          opacity: 0,
        },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 0.45,
          ease: 'power3.out',
        }
      );
    }
  }, [isOpen, shouldRender]);

  const handleClose = () => {
    const backdrop = backdropRef.current;
    const box = modalBoxRef.current;
    if (!backdrop || !box) {
      onClose();
      return;
    }

    // Fluid GSAP Close Animation before unmounting
    const tl = gsap.timeline({
      onComplete: () => {
        setShouldRender(false);
        onClose();
      },
    });

    tl.to(box, {
      scale: 0.94,
      y: 15,
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in',
    }).to(
      backdrop,
      {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
      },
      '-=0.15'
    );
  };

  if (!shouldRender) return null;

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl"
      onClick={handleClose}
    >
      <div
        ref={modalBoxRef}
        className={`relative w-full ${maxWidth} bg-[#0c0c10] border border-white/20 rounded-3xl p-6 sm:p-10 shadow-2xl text-left max-h-[90vh] overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Close dialog"
        >
          <X className="h-5 w-5" />
        </button>
        {children}
      </div>
    </div>
  );
}
