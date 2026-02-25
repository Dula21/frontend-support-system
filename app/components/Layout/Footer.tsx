'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-(--bg-main) border-t border-(--border-soft) mt-20 reveal visible">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand Section */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold text-(--text-main) mb-4">
              Smart <span className="text-(--accent-main)">Support</span>
            </h3>
            <p className="text-(--text-muted) max-w-sm leading-relaxed">
              Next-generation support ecosystem powered by AI classification and secure real-time synchronization.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-(--ai-soft) border border-(--ai-glow)/20">
              <span className="w-2 h-2 bg-(--ai-glow) rounded-full animate-pulse"></span>
              <span className="text-[10px] font-bold text-(--ai-glow) uppercase tracking-widest">System Operational</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-(--text-main) uppercase tracking-widest mb-6">Navigation</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/tickets" className="text-sm text-(--text-muted) hover:text-(--accent-main) transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/tickets/new" className="text-sm text-(--text-muted) hover:text-(--accent-main) transition-colors">
                  Submit Ticket
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-sm text-(--text-muted) hover:text-(--accent-main) transition-colors">
                  System Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h4 className="text-xs font-bold text-(--text-main) uppercase tracking-widest mb-6">Support</h4>
            <div className="space-y-3">
              <p className="text-sm text-(--text-muted)">
                <span className="block font-semibold text-(--text-main)">Global Access</span>
                24/7 AI Monitoring
              </p>
              <a href="mailto:nethmadulasi15@gmail.com" className="text-sm text-(--accent-main) font-mono hover:underline">
                supportsmart@dulasi.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-(--border-soft) mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-(--text-muted) font-medium">
            &copy; 2026 <span className="text-(--text-main)">Smart Support Terminal</span>. All rights reserved. Crafted with care by Dulasi Nethma.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-[10px] font-mono text-(--text-muted) uppercase tracking-tighter">Encrypted v1.0.4</span>
            <div className="flex gap-4">
               <a href="https://www.linkedin.com/in/dulasi-nethma-913577229/" className="text-(--text-muted) hover:text-(--accent-main) transition-colors text-sm">LinkedIn</a>
               <a href="https://github.com/Dula21" className="text-(--text-muted) hover:text-(--accent-main) transition-colors text-sm">GitHub</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
