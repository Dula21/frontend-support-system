'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import api from './../lib/api';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Trigger the spring reveal animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      await api.post('/auth/forgot-password', { email });
      setMessage('Recovery protocol initiated. Check your inbox for the reset link.');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Verification failed. Please check the email address.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-(--bg-main) p-4">
      <div className={`bg-(--bg-card) border border-(--border-soft) rounded-3xl shadow-2xl p-8 w-full max-w-md reveal ${isVisible ? 'visible' : ''}`}>
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-(--accent-soft) text-(--accent-main) mb-4 text-2xl">
            🔒
          </div>
          <h2 className="text-3xl font-bold text-(--text-main)">
            Reset <span className="text-(--accent-main)">Access</span>
          </h2>
          <p className="text-(--text-muted) text-sm mt-2">
            Enter your verified email to receive a secure recovery link.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-(--text-muted) uppercase tracking-wider ml-1">Recovery Email</label>
            <input
              type="email"
              placeholder="admin@smart.support"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-4 rounded-2xl transition-all duration-200"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full p-4 bg-(--accent-main) hover:bg-(--accent-hover) text-white rounded-2xl font-bold shadow-lg shadow-indigo-500/20 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
          >
            {loading ? <span className="animate-blink">Processing...</span> : 'Send Recovery Link'}
          </button>

          {message && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm text-center font-medium">
              {message}
            </div>
          )}
          
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center font-medium animate-pulse">
              {error}
            </div>
          )}
        </form>

        <div className="mt-8 pt-6 border-t border-(--border-soft) text-center">
          <Link href="/login" className="text-sm font-semibold text-(--text-muted) hover:text-(--accent-main) transition-colors">
            ← Return to Secure Login
          </Link>
        </div>

        {/* System Tag */}
        <div className="mt-6 text-center">
          <span className="ai-badge">
            <span className="w-2 h-2 bg-(--ai-glow) rounded-full animate-pulse"></span>
            SECURITY PROTOCOL v1.0
          </span>
        </div>
      </div>
    </div>
  );
}
