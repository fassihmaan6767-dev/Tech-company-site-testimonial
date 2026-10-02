import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ExternalLink, X, TrendingUp, Sparkles, Layers, Activity } from 'lucide-react';
import { Project } from '../types';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS: Project[] = [
  {
    id: 'lumina-fintech',
    title: 'Lumina Analytics Platform',
    client: 'Lumina Global Capital',
    category: 'Fintech & Intelligence',
    year: '2025',
    metric: '+184% Conversion Lift · $4.2M Seed Raised',
    description:
      'Engineered an ultra-fast financial intelligence dashboard aggregating global multi-asset telemetry with sub-50ms reactive data streaming.',
    accentColor: '#06b6d4',
    deliverables: ['Custom React 19 Architecture', 'WebSocket Telemetry Engine', 'Dark-Mode Design System'],
    techStack: ['React', 'TypeScript', 'Tailwind', 'WebSockets', 'Chart.js'],
    previewType: 'fintech',
  },
  {
    id: 'atelier-vesper',
    title: 'Atelier Vesper Maison',
    client: 'Vesper Haute Parfumerie',
    category: 'Luxury E-Commerce',
    year: '2025',
    metric: '+64% Average Order Value · 2.1s Checkout',
    description:
      'Architected a headless luxury retail experience featuring spatial editorial layouts, bespoke scent profiler, and friction-free payment.',
    accentColor: '#e0a96d',
    deliverables: ['Headless Shopify Custom Storefront', 'Fluid Editorial Layouts', 'Conversion Optimization'],
    techStack: ['Next.js 15', 'Shopify Storefront API', 'GSAP', 'Tailwind CSS'],
    previewType: 'luxury',
  },
  {
    id: 'neurosync-ai',
    title: 'NeuroSync Generative Audio',
    client: 'NeuroSync Technologies',
    category: 'Generative AI & Sound',
    year: '2026',
    metric: '1.2M Monthly Active Users · 99.9% Uptime',
    description:
      'Created a browser-based generative music workstation powered by real-time WebAudio synthesis, holographic spectral visualizers, and neural models.',
    accentColor: '#8b5cf6',
    deliverables: ['WebGL Audio Shader Visualizer', 'Spatial Node Sound Canvas', 'Enterprise Cloud Tier'],
    techStack: ['WebAudio API', 'Three.js / WebGL', 'React', 'Node.js'],
    previewType: 'ai',
  },
  {
    id: 'kinetic-horizon',
    title: 'Kinetic Horizon GT Telematics',
    client: 'Horizon Automotive Group',
    category: 'Mobility & Connected Car',
    year: '2026',
    metric: 'Red Dot: Best of Best 2025 · 450k Pre-Orders',
    description:
      'Designed and engineered the companion companion web app and cockpit digital telemetry interface for an electric grand tourer.',
    accentColor: '#38bdf8',
    deliverables: ['Dynamic Telemetry Dashboard', 'Vector Torque Visualizer', 'Instant Bluetooth Web Pairing'],
    techStack: ['React', 'GSAP ScrollTrigger', 'Tailwind', 'SVG Sensors'],
    previewType: 'mobility',
  },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useEffect(() => {
    const trigger = triggerRef.current;
    const track = trackRef.current;
    if (!trigger || !track) return;

    // Only apply horizontal scroll pinning on desktop/tablet where viewport is wide
    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      const scrollWidth = track.scrollWidth;
      const windowWidth = window.innerWidth;
      const distanceToScroll = scrollWidth - windowWidth + 120;

      const pinTimeline = gsap.to(track, {
        x: -distanceToScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: trigger,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${distanceToScroll * 1.2}`,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        pinTimeline.kill();
      };
    });

    return () => mm.revert();
  }, []);

  // Visual Mockup Renderers for each project type ensuring zero broken images
  const renderMockup = (project: Project) => {
    switch (project.previewType) {
      case 'fintech':
        return (
          <div className="relative w-full h-full bg-[#0a0f16] p-6 rounded-xl border border-cyan-500/20 flex flex-col justify-between overflow-hidden">
            <div className="flex items-center justify-between border-b border-cyan-500/10 pb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-cyan-400" />
                <span className="font-mono text-xs font-semibold text-cyan-300">LUMINA INTELLIGENCE // REALTIME</span>
              </div>
              <span className="font-mono text-[10px] text-cyan-400/80 bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded">
                STREAM ACTIVE
              </span>
            </div>

            {/* Simulated Live Financial Chart */}
            <div className="my-auto py-4">
              <div className="flex items-baseline gap-3 mb-2 font-mono">
                <span className="text-2xl sm:text-3xl font-bold text-white tabular-nums">$2,849,120</span>
                <span className="text-xs text-emerald-400 font-semibold">+24.8% (24H)</span>
              </div>
              <svg viewBox="0 0 400 120" className="w-full h-24 overflow-visible">
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,90 Q40,80 80,45 T160,55 T240,25 T320,35 T400,10 L400,120 L0,120 Z"
                  fill="url(#chartGrad)"
                />
                <path
                  d="M0,90 Q40,80 80,45 T160,55 T240,25 T320,35 T400,10"
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="2.5"
                />
                <circle cx="400" cy="10" r="4" fill="#06b6d4" className="animate-ping" />
              </svg>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-cyan-500/10 font-mono text-[11px]">
              <div>
                <span className="text-slate-500 block">LATENCY</span>
                <span className="text-cyan-300">14ms</span>
              </div>
              <div>
                <span className="text-slate-500 block">DAILY VOL</span>
                <span className="text-white">$48.2M</span>
              </div>
              <div>
                <span className="text-slate-500 block">ALPHA</span>
                <span className="text-emerald-400">+4.12</span>
              </div>
            </div>
          </div>
        );

      case 'luxury':
        return (
          <div className="relative w-full h-full bg-[#110e0c] p-6 rounded-xl border border-amber-500/20 flex flex-col justify-between overflow-hidden">
            <div className="flex items-center justify-between border-b border-amber-500/10 pb-4">
              <span className="font-display text-sm tracking-widest text-amber-200 uppercase">
                ATELIER VESPER NO. 08
              </span>
              <span className="font-mono text-[10px] text-amber-300">LIMITED EDITION</span>
            </div>

            <div className="flex items-center justify-center py-6 text-center">
              <div>
                <div className="text-3xl font-display italic text-amber-100 mb-1">Cendres de Cèdre</div>
                <div className="text-xs text-amber-400/80 uppercase tracking-widest font-mono">
                  Extrait de Parfum · 100ml
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-amber-500/10 font-mono text-xs">
              <span className="text-amber-200">$340.00 USD</span>
              <span className="text-amber-400 font-semibold uppercase tracking-wider flex items-center gap-1">
                Acquire <ArrowUpRight className="h-3 w-3" />
              </span>
            </div>
          </div>
        );

      case 'ai':
        return (
          <div className="relative w-full h-full bg-[#0d0a14] p-6 rounded-xl border border-violet-500/25 flex flex-col justify-between overflow-hidden">
            <div className="flex items-center justify-between border-b border-violet-500/15 pb-4">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-violet-400" />
                <span className="font-mono text-xs font-semibold text-violet-300">NEURAL SYNTHESIS ENGINE</span>
              </div>
              <span className="font-mono text-[10px] text-violet-400 bg-violet-950/60 px-2 py-0.5 rounded border border-violet-500/30">
                192 kHz / 32-BIT
              </span>
            </div>

            {/* Neural frequency audio bars */}
            <div className="flex items-end justify-between gap-1.5 h-28 my-auto px-4">
              {[45, 80, 60, 95, 30, 70, 85, 40, 100, 65, 50, 90, 75, 60, 85, 45, 95, 70].map((h, i) => (
                <div
                  key={i}
                  className="w-full bg-gradient-to-t from-violet-600 via-sky-400 to-cyan-300 rounded-t-xs"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-violet-500/15 font-mono text-xs text-slate-400">
              <span>LATENT WEIGHTS: 4.8B</span>
              <span className="text-violet-300">GENERATING STEMS...</span>
            </div>
          </div>
        );

      case 'mobility':
      default:
        return (
          <div className="relative w-full h-full bg-[#0a0e14] p-6 rounded-xl border border-sky-500/25 flex flex-col justify-between overflow-hidden">
            <div className="flex items-center justify-between border-b border-sky-500/15 pb-4">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-sky-400" />
                <span className="font-mono text-xs font-semibold text-sky-300">HORIZON GT // TELEMETRY</span>
              </div>
              <span className="font-mono text-[10px] text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-500/30">
                SPORT+ MODE
              </span>
            </div>

            <div className="flex items-center justify-around py-4">
              <div className="text-center font-mono">
                <span className="text-4xl font-bold text-white tabular-nums">284</span>
                <span className="text-xs text-slate-400 block">KM / H</span>
              </div>
              <div className="h-16 w-[1px] bg-white/10" />
              <div className="text-center font-mono">
                <span className="text-4xl font-bold text-sky-400 tabular-nums">98</span>
                <span className="text-xs text-slate-400 block">% STATE OF CHARGE</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-sky-500/15 font-mono text-xs text-slate-400">
              <span>AERODYNAMIC DRAG: 0.19 Cd</span>
              <span className="text-emerald-400">ALL SYSTEMS NOMINAL</span>
            </div>
          </div>
        );
    }
  };

  return (
    <section id="work" ref={sectionRef} className="relative py-28 bg-[#070709] overflow-hidden">
      {/* Pinned Scroll Wrapper */}
      <div ref={triggerRef} className="w-full">
        {/* Section Header */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
          <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-3">
            Selected Case Studies
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-2xl">
              Proven Outcomes Engineered for World-Class Teams.
            </h2>
            <div className="text-slate-400 text-sm max-w-sm font-light">
              Scroll horizontally through our flagship portfolio. Each project reflects our commitment to exceptional craft and quantified impact.
            </div>
          </div>
        </div>

        {/* Horizontal Track */}
        <div className="px-6 md:px-12">
          <div
            ref={trackRef}
            className="flex flex-col lg:flex-row gap-8 lg:gap-12 w-full lg:w-max pb-8"
          >
            {PROJECTS.map((project) => (
              <div
                key={project.id}
                onClick={() => setActiveProject(project)}
                data-cursor-text="EXPLORE"
                className="group w-full lg:w-[680px] shrink-0 p-8 rounded-3xl bg-[#0d0d12] border border-white/10 hover:border-cyan-500/50 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                {/* Top Meta */}
                <div className="flex items-center justify-between mb-6 text-xs text-slate-400 font-mono">
                  <div className="flex items-center gap-3">
                    <span className="text-white font-medium">{project.client}</span>
                    <span className="text-slate-600">/</span>
                    <span>{project.category}</span>
                  </div>
                  <span>{project.year}</span>
                </div>

                {/* Interactive Mockup Container with Parallax feel */}
                <div className="relative w-full h-[280px] sm:h-[320px] rounded-2xl overflow-hidden mb-8 shadow-2xl transition-transform duration-500 group-hover:scale-[1.01]">
                  {renderMockup(project)}
                </div>

                {/* Bottom Details */}
                <div>
                  <div className="inline-block font-mono text-xs text-cyan-400 font-semibold mb-2">
                    {project.metric}
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6 font-light">
                    {project.description}
                  </p>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex flex-wrap items-center gap-x-3 text-xs text-slate-500 font-mono">
                      {project.techStack.map((tech, idx) => (
                        <span key={tech} className="flex items-center gap-2">
                          <span>{tech}</span>
                          {idx < project.techStack.length - 1 && <span>·</span>}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-400 group-hover:translate-x-1 transition-transform">
                      <span>View Case Study</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Case Study Detail Modal */}
      {activeProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveProject(null)}
        >
          <div
            className="relative w-full max-w-3xl bg-[#0c0c12] border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl text-left max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveProject(null)}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="text-xs font-mono text-cyan-400 mb-2">
              {activeProject.client} · {activeProject.category}
            </div>

            <h3 className="font-display text-2xl sm:text-4xl font-bold text-white mb-4">
              {activeProject.title}
            </h3>

            {/* Impact Metric Banner */}
            <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 font-mono text-sm mb-6 flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-cyan-400 shrink-0" />
              <span>{activeProject.metric}</span>
            </div>

            <div className="h-64 sm:h-72 w-full rounded-2xl mb-8 overflow-hidden">
              {renderMockup(activeProject)}
            </div>

            <div className="space-y-6 text-slate-300 text-sm sm:text-base font-light leading-relaxed mb-8">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">
                  The Challenge
                </h4>
                <p>
                  The legacy infrastructure suffered from high interaction latency, convoluted user journeys, and poor mobile conversion rates. They needed an architectural overhaul capable of handling rapid user growth while establishing a distinct luxury design presence.
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">
                  Our Engineering Solution
                </h4>
                <p>{activeProject.description}</p>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">
                  Key Scope Deliverables
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-200">
                  {activeProject.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500">
                Stack: {activeProject.techStack.join(' · ')}
              </span>
              <button
                onClick={() => setActiveProject(null)}
                className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-cyan-400 rounded-full hover:bg-cyan-300 transition-colors"
              >
                Close Project
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
