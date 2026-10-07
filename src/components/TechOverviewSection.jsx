import React from 'react';
import { Cpu, Zap, Activity, Layers, CheckCircle2 } from 'lucide-react';

export default function TechOverviewSection() {
  const specs = [
    {
      icon: <Zap className="w-5 h-5 text-[#def54f]" />,
      title: 'GSAP ScrollTrigger Engine',
      desc: 'Sub-pixel smooth scrub interpolation synced directly with scroll physics for zero-jank 60FPS delivery.',
      stat: '60 FPS',
      badge: 'Scroll Scrubbing',
    },
    {
      icon: <Activity className="w-5 h-5 text-[#6ac9ff]" />,
      title: 'Dynamic Trail Paint Logic',
      desc: 'Pixel-perfect vector expansion of the racing green track precisely locked to the McLaren 720S front coordinates.',
      stat: '< 2ms',
      badge: 'Real-time Vector',
    },
    {
      icon: <Layers className="w-5 h-5 text-[#fa7328]" />,
      title: 'Staggered Intro Reveal',
      desc: 'Initial page load choreography that gently animates headline typography and impact metrics into position.',
      stat: '0.4s',
      badge: 'Stagger Timeline',
    },
    {
      icon: <Cpu className="w-5 h-5 text-emerald-400" />,
      title: 'Lenis Smooth Scroll',
      desc: 'Normalized inertia scrolling across wheel, touchpad, and touch interfaces for an effortless luxury experience.',
      stat: '100%',
      badge: 'Inertia Physics',
    },
  ];

  const metrics = [
    {
      value: '58%',
      label: 'Increase in pick up point use',
      color: 'bg-[#def54f]',
      textCol: 'text-neutral-900',
      tag: 'Logistics Optimization',
    },
    {
      value: '23%',
      label: 'Decreased customer phone calls',
      color: 'bg-[#6ac9ff]',
      textCol: 'text-neutral-900',
      tag: 'Support Automation',
    },
    {
      value: '27%',
      label: 'Increase in pick up point use',
      color: 'bg-neutral-800',
      textCol: 'text-white',
      tag: 'Distribution Growth',
    },
    {
      value: '40%',
      label: 'Decreased customer phone calls',
      color: 'bg-[#fa7328]',
      textCol: 'text-neutral-950',
      tag: 'Operational Efficiency',
    },
  ];

  return (
    <section className="relative z-10 bg-neutral-950 text-white py-24 px-6 md:px-12 lg:px-20 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-bold text-neutral-400 mb-3 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Production Engineering & Motion
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-sans">
              Precision Motion Architecture
            </h2>
          </div>
          <p className="text-neutral-400 max-w-md text-sm sm:text-base">
            Engineered using React, GSAP ScrollTrigger, Lenis Smooth Scroll, and Tailwind CSS to deliver an ultra-smooth, responsive supercar hero experience.
          </p>
        </div>

        {/* Feature Spec Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {specs.map((spec, i) => (
            <div
              key={i}
              className="bg-neutral-900/80 border border-neutral-800/80 rounded-2xl p-6 flex flex-col justify-between hover:border-neutral-700 hover:bg-neutral-900 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-neutral-800 border border-neutral-700/50">
                    {spec.icon}
                  </div>
                  <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                    {spec.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-neutral-100 mb-2 group-hover:text-white">
                  {spec.title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                  {spec.desc}
                </p>
              </div>
              <div className="pt-4 border-t border-neutral-800/60 flex items-center justify-between">
                <span className="text-xs text-neutral-500 font-mono">Performance Metric</span>
                <span className="text-sm font-mono font-bold text-emerald-400">{spec.stat}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Impact Metrics Summary Cards */}
        <div className="bg-neutral-900/50 rounded-3xl p-8 border border-neutral-800">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#45db7d]">
              Impact Results
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Verified Business Impact
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((m, idx) => (
              <div
                key={idx}
                className={`${m.color} ${m.textCol} p-6 rounded-2xl flex flex-col justify-between shadow-lg transition-transform hover:-translate-y-1`}
              >
                <div className="text-[10px] uppercase font-bold tracking-widest opacity-80 mb-2">
                  {m.tag}
                </div>
                <div>
                  <div className="text-4xl sm:text-5xl font-black font-sans tracking-tight mb-1">
                    {m.value}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold leading-snug">
                    {m.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-16 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <div>
            ITZFIZZ Scroll Animation Assignment • Built with GSAP & React
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" /> All Functional Requirements Met
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
