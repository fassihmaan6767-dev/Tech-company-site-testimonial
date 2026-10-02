import { useState } from 'react';
import { CheckCircle2, ArrowRight, Calculator } from 'lucide-react';
import AnimatedModal from './AnimatedModal';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
  const [step, setStep] = useState<number>(1);
  const [selectedType, setSelectedType] = useState<string>('Custom Web Application');
  const [selectedCapabilities, setSelectedCapabilities] = useState<string[]>([
    'GSAP & Kinetic Motion',
    'Figma Design System',
  ]);
  const [timeline, setTimeline] = useState<string>('Standard (6–8 Weeks)');
  const [budget, setBudget] = useState<string>('$30,000 – $60,000');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const toggleCapability = (cap: string) => {
    if (selectedCapabilities.includes(cap)) {
      setSelectedCapabilities(selectedCapabilities.filter((c) => c !== cap));
    } else {
      setSelectedCapabilities([...selectedCapabilities, cap]);
    }
  };

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setStep(1);
    onClose();
  };

  return (
    <AnimatedModal isOpen={isOpen} onClose={handleClose} maxWidth="max-w-2xl">
      {submitted ? (
        <div className="py-8 text-center animate-in fade-in duration-300">
          <div className="h-14 w-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white mx-auto mb-6">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
            Proposal Request Received
          </h3>
          <p className="text-neutral-400 text-sm max-w-md mx-auto leading-relaxed font-light mb-8">
            Thank you, {name || 'Partner'}. Our engineering team has received your project parameters for <strong className="text-white">{selectedType}</strong>. We will prepare an architectural breakdown and proposal within 24 hours.
          </p>
          <button
            onClick={handleClose}
            className="px-7 py-3 text-xs font-semibold text-black bg-white rounded-full hover:bg-neutral-200 transition-colors"
          >
            Back to Website
          </button>
        </div>
      ) : (
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-2">
            <Calculator className="h-4 w-4" />
            <span>PROJECT SCOPE & ESTIMATE CALCULATOR</span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
            Request a Bespoke Proposal
          </h3>
          <p className="text-neutral-400 text-xs sm:text-sm font-light mb-8">
            Select your parameters below to receive an architectural scope and delivery timeline.
          </p>

          {step === 1 ? (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3">
                  1. Primary Project Archetype
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'Custom Web Application',
                    'High-Conversion E-Commerce',
                    'Spatial 3D / WebGL Experience',
                    'Design System & Complete Rebrand',
                  ].map((type) => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`p-3.5 rounded-xl border text-left text-xs font-medium transition-all ${
                        selectedType === type
                          ? 'bg-white text-black font-semibold border-white'
                          : 'bg-white/[0.04] border-white/10 text-neutral-300 hover:border-white/20'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3">
                  2. Desired Capabilities
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    'GSAP & Kinetic Motion',
                    'Figma Design System',
                    'Headless CMS & Commerce',
                    'Sub-Second Core Web Vitals',
                    'Realtime WebSockets',
                    'WebGL & Shader Canvas',
                  ].map((cap) => {
                    const active = selectedCapabilities.includes(cap);
                    return (
                      <button
                        type="button"
                        key={cap}
                        onClick={() => toggleCapability(cap)}
                        className={`p-3 rounded-lg border text-left text-xs transition-all flex items-center justify-between ${
                          active
                            ? 'bg-white text-black font-semibold border-white'
                            : 'bg-white/[0.04] border-white/10 text-neutral-400 hover:border-white/20'
                        }`}
                      >
                        <span>{cap}</span>
                        <span
                          className={`h-2 w-2 rounded-full ${
                            active ? 'bg-black' : 'bg-transparent border border-neutral-600'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                    3. Target Timeline
                  </label>
                  <select
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full rounded-xl bg-white/[0.04] border border-white/15 px-3 py-2.5 text-xs text-white"
                  >
                    <option value="Accelerated (3–4 Weeks)">Accelerated (3–4 Weeks)</option>
                    <option value="Standard (6–8 Weeks)">Standard (6–8 Weeks)</option>
                    <option value="Flexible (8–12 Weeks)">Flexible (8–12 Weeks)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                    4. Capital Allocation
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full rounded-xl bg-white/[0.04] border border-white/15 px-3 py-2.5 text-xs text-white"
                  >
                    <option value="$15,000 – $30,000">$15,000 – $30,000</option>
                    <option value="$30,000 – $60,000">$30,000 – $60,000</option>
                    <option value="$60,000 – $120,000">$60,000 – $120,000</option>
                    <option value="$120,000+">$120,000+ (Enterprise)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold text-black bg-white rounded-full hover:bg-neutral-200 transition-colors"
                >
                  <span>Next: Contact Details</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleFinish} className="space-y-4">
              <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono text-neutral-400 flex flex-wrap gap-x-4 gap-y-1">
                <span>Scope: <strong className="text-white">{selectedType}</strong></span>
                <span>Timeline: <strong className="text-white">{timeline}</strong></span>
                <span>Budget: <strong className="text-white">{budget}</strong></span>
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full rounded-xl bg-white/[0.04] border border-white/15 px-4 py-2.5 text-sm text-white focus:border-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">
                  Work Email *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sarah@yourcompany.com"
                  className="w-full rounded-xl bg-white/[0.04] border border-white/15 px-4 py-2.5 text-sm text-white focus:border-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">
                  Project Notes & Links (Optional)
                </label>
                <textarea
                  rows={3}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Share any Figma links, current website URL, or key goals..."
                  className="w-full rounded-xl bg-white/[0.04] border border-white/15 px-4 py-2.5 text-sm text-white focus:border-white focus:outline-hidden resize-none"
                />
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs font-mono text-neutral-400 hover:text-white transition-colors"
                >
                  ← Edit Scope
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 text-xs font-semibold text-black bg-white rounded-full hover:bg-neutral-200 transition-colors"
                >
                  Send Proposal Request
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </AnimatedModal>
  );
}
