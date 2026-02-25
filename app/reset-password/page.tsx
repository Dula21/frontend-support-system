'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from './../lib/api';

export default function ResetPassword() {
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
    // Parse token from URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get('token');
    if (urlToken) {
      setToken(urlToken);
    } else {
      setError('No security token detected. Please request a new recovery link.');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Password entries do not match.');
      return;
    }
    setLoading(true);
    setError('');
    setMessage('');
    try {
      await api.post('/auth/reset-password', { token, newPassword });
      setMessage('Security credentials updated! Redirecting to terminal...');
      setTimeout(() => router.push('/login'), 2500);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Access override failed. Token may be expired.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-(--bg-main) p-4">
      <div className={`bg-(--bg-card) border border-(--border-soft) rounded-3xl shadow-2xl p-8 w-full max-w-md reveal ${isVisible ? 'visible' : ''}`}>
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-(--accent-soft) text-(--ai-glow) mb-4 text-2xl">
            🔑
          </div>
          <h2 className="text-3xl font-bold text-(--text-main)">
            Update <span className="text-(--accent-main)">Access</span>
          </h2>
          <p className="text-(--text-muted) text-sm mt-2">
            Establish new secure credentials for your account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-(--text-muted) uppercase tracking-wider ml-1">New Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full p-4 rounded-2xl transition-all duration-200"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-(--text-muted) uppercase tracking-wider ml-1">Confirm Credentials</label>
            <input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-4 rounded-2xl transition-all duration-200"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full p-4 bg-(--accent-main) hover:bg-(--accent-hover) text-white rounded-2xl font-bold shadow-lg shadow-indigo-500/20 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
          >
            {loading ? <span className="animate-blink">Updating Logs...</span> : 'Finalize Reset'}
          </button>

          {message && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm text-center font-medium animate-pulse">
              {message}
            </div>
          )}
          
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center font-medium">
              {error}
            </div>
          )}
        </form>

        <div className="mt-8 pt-6 border-t border-(--border-soft) text-center">
          <Link href="/login" className="text-sm font-semibold text-(--text-muted) hover:text-(--accent-main) transition-colors">
            ← Abort and Return to Login
          </Link>
        </div>

        {/* System Tag */}
        <div className="mt-6 text-center">
          <span className="ai-badge">
            <span className="w-2 h-2 bg-(--ai-glow) rounded-full animate-pulse"></span>
            SECURE-PROTOCOL v1.02
          </span>
        </div>
      </div>
    </div>
  );
}
