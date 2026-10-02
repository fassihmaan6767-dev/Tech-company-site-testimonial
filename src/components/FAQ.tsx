import { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Architecture',
    question: 'What types of projects does Kinetic specialize in?',
    answer:
      'We engineer bespoke, high-performance web applications, fluid brand flagship websites, reactive 3D/WebGL spatial interfaces, and headless e-commerce platforms. Every project is crafted from the ground up to achieve sub-second load times and high conversion rates.',
  },
  {
    id: 'faq-2',
    category: 'Performance',
    question: 'How do you guarantee 100/100 Core Web Vitals and sub-second load times?',
    answer:
      'Performance is architectural, not an afterthought. We eliminate render-blocking assets, leverage Edge CDN caching, compile modern React/TypeScript components with minimal runtime overhead, and enforce compositor-only GPU animations with strict layout stability.',
  },
  {
    id: 'faq-3',
    category: 'Execution',
    question: 'Do you handle both design systems and production engineering?',
    answer:
      'Yes. We operate as an integrated design and engineering partner. Our workflow bridges typographic hierarchy, Figma design tokens, and motion choreography directly into production-grade React, Next.js, and Tailwind code with zero translation loss.',
  },
  {
    id: 'faq-4',
    category: 'Timeline',
    question: 'What is your typical project timeline and delivery rhythm?',
    answer:
      'Most comprehensive flagship web builds and product launches span 6 to 10 weeks from strategic discovery to global deployment. We operate in transparent 1-week sprints with live preview deployments at every stage.',
  },
  {
    id: 'faq-5',
    category: 'Collaboration',
    question: 'Can Kinetic collaborate with our in-house engineering and product teams?',
    answer:
      'Absolutely. We frequently partner with client engineering leads and product managers, integrating seamlessly into existing CI/CD pipelines, code review cadences, and design systems.',
  },
  {
    id: 'faq-6',
    category: 'Post-Launch',
    question: 'What ongoing maintenance and post-launch support do you provide?',
    answer:
      'Every launch includes 30 days of complimentary hypercare support, telemetry monitoring, and performance auditing. Beyond launch, we offer dedicated monthly engineering retainers for continuous feature velocity and conversion optimization.',
  },
];

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="relative py-28 px-6 md:px-12 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 mb-3">
          <HelpCircle className="h-3.5 w-3.5 text-white" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
          Everything You Need to Know.
        </h2>
        <p className="text-neutral-400 text-sm sm:text-base font-light">
          Clear answers about our engineering philosophy, engagement structure, and delivery standards.
        </p>
      </div>

      {/* Accordion Layout */}
      <div className="space-y-3">
        {FAQ_ITEMS.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div
              key={item.id}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? 'bg-neutral-900/80 border-white/20 shadow-lg shadow-black/40'
                  : 'bg-neutral-950/40 border-white/[0.08] hover:border-white/15'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleFAQ(item.id)}
                className="w-full flex items-center justify-between p-6 sm:p-7 text-left gap-4 focus-visible:outline-hidden"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider shrink-0 hidden sm:inline">
                    {item.category}
                  </span>
                  <span className="font-display text-base sm:text-lg font-semibold text-white tracking-tight">
                    {item.question}
                  </span>
                </div>

                <div
                  className={`h-8 w-8 rounded-full border border-white/15 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? 'bg-white text-black rotate-180 border-white' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </div>
              </button>

              {/* Collapsible Answer */}
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-6 pb-7 sm:px-7 sm:pb-8 pt-0 text-neutral-300 text-sm sm:text-base leading-relaxed font-light border-t border-white/[0.05] mt-2">
                    <p className="pt-4">{item.answer}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
