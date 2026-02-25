'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from './../lib/api';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  // Trigger the spring reveal animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.post('/auth/register', { name, email, password, role });
      router.push('/login');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-(--bg-main) p-4">
      {/* Card with new v4 syntax and spring reveal */}
      <div className={`bg-(--bg-card) border border-(--border-soft) rounded-2xl shadow-2xl p-8 w-full max-w-md reveal ${isVisible ? 'visible' : ''}`}>
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-(--text-main)">
            Create <span className="text-(--accent-main)">Account</span>
          </h2>
          <p className="text-(--text-muted) text-sm mt-2">Join the smart support ecosystem</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-(--text-muted) uppercase tracking-wider ml-1">Full Name</label>
            <input
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)} // Note: fixed potential typo from original snippet
              required
              className="w-full p-3 rounded-xl transition-all duration-200"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-(--text-muted) uppercase tracking-wider ml-1">Email</label>
            <input
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 rounded-xl transition-all duration-200"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-(--text-muted) uppercase tracking-wider ml-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 rounded-xl transition-all duration-200"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-(--text-muted) uppercase tracking-wider ml-1">Account Type</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 rounded-xl transition-all duration-200 cursor-pointer"
            >
              <option value="user" className="bg-(--bg-card)">Standard User</option>
              <option value="admin" className="bg-(--bg-card)">System Admin</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 mt-4 bg-(--accent-main) hover:bg-(--accent-hover) text-white rounded-xl font-bold shadow-lg shadow-indigo-500/20 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
          >
            {loading ? <span className="animate-blink">Creating Account...</span> : 'Register'}
          </button>

          {error && <p className="text-red-400 text-sm text-center font-medium animate-pulse">{error}</p>}
        </form>

        <div className="mt-6 pt-6 border-t border-(--border-soft) text-center">
          <p className="text-sm text-(--text-muted)">
            Already have an account?{' '}
            <Link href="/login" className="text-(--accent-main) font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>

        {/* AI Branding */}
        <div className="mt-6 text-center">
          <span className="ai-badge">
            <span className="w-2 h-2 bg-(--ai-glow) rounded-full animate-pulse"></span>
            AI-POWERED SYSTEM
          </span>
        </div>
      </div>
    </div>
  );
}
