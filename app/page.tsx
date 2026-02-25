'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-(--bg-main) p-6 text-center">
      <div className={`max-w-3xl reveal ${isVisible ? 'visible' : ''}`}>
        
        {/* AI Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-(--ai-soft) border border-(--ai-glow)/20 mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-(--ai-glow) opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-(--ai-glow)"></span>
          </span>
          <span className="text-[10px] font-bold text-(--ai-glow) uppercase tracking-[0.2em]">
            AI Neural Engine Active
          </span>
        </div>

        {/* Hero Content */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-(--text-main) tracking-tight mb-6">
          Smart <span className="text-(--accent-main)">Support</span> Terminal
        </h1>
        
        <p className="text-lg md:text-xl text-(--text-muted) max-w-2xl mx-auto leading-relaxed mb-10">
          The next generation of ticket management. 
          Automated classification, real-time synchronization, and 
          <span className="text-(--text-main)"> AI-driven insights </span> 
          to resolve issues faster than ever.
        </p>

        {/* Navigation Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/login"
            className="group relative px-8 py-4 bg-(--accent-main) hover:bg-(--accent-hover) text-white font-bold rounded-2xl shadow-lg shadow-indigo-500/20 transition-all transform hover:scale-[1.05] active:scale-[0.98] overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Enter Terminal <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
            <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </Link>

          <Link
            href="/register"
            className="px-8 py-4 bg-transparent border border-(--border-soft) text-(--text-main) font-bold rounded-2xl hover:bg-(--bg-card) transition-all"
          >
            Create Account
          </Link>
        </div>

        {/* Feature Grid Snippet */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24">
          {[
            { title: "AI Classified", desc: "Automatic categorization", icon: "✨" },
            { title: "Secure Logs", desc: "End-to-end encryption", icon: "🔒" },
            { title: "Real-time", desc: "Instant sync protocol", icon: "⚡" }
          ].map((feature, i) => (
            <div key={i} className="p-6 rounded-2xl bg-(--bg-card) border border-(--border-soft) hover:border-(--accent-soft) transition-colors">
              <div className="text-2xl mb-2">{feature.icon}</div>
              <h4 className="text-(--text-main) font-bold text-sm mb-1">{feature.title}</h4>
              <p className="text-(--text-muted) text-xs">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

