'use client';

import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from './../lib/api';
import { AuthContext } from './../components/Auth/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { login } = useContext(AuthContext)!;
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
    const res = await api.post('/auth/login', { email, password });
    login(res.data.token);
    router.push('/tickets');
  } catch (err: any) {
    // PASTE THE NEW ERROR HANDLING HERE
    if (!err.response) {
      setError("Server unreachable. Please check your connection.");
    } else if (err.response.status === 401) {
      setError("Invalid email or password.");
    } else {
      setError(err.response.data.error || "An unexpected error occurred.");
    }
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-(--bg-main) p-4">
      {/* Container using Tailwind v4 variable syntax bg-(--variable) */}
      <div className={`bg-(--bg-card) border border-(--border-soft) rounded-2xl shadow-2xl p-8 w-full max-w-md reveal ${isVisible ? 'visible' : ''}`}>
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-(--text-main)">
            Welcome <span className="text-(--accent-main)">Back</span>
          </h2>
          <p className="text-(--text-muted) text-sm mt-2">Access your smart support dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-(--text-muted) uppercase tracking-wider ml-1">Email</label>
            <input
              type="email"
              placeholder="admin@smart.support"
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

          <button
  type="submit"
  disabled={loading}
  className="w-full p-3 bg-(--accent-main) hover:bg-(--accent-hover) text-white rounded-xl font-bold shadow-lg shadow-indigo-500/20 shadow-lg/(--accent-soft) transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
>
  {loading ? <span className="animate-blink">Authenticating...</span> : 'Sign In'}
</button>


          {error && <p className="text-red-400 text-sm text-center font-medium animate-pulse">{error}</p>}
        </form>

        <div className="flex flex-col items-center gap-3 mt-6">
          {/* Fixed: Removed 'size' prop which was causing the TypeScript error */}
          <Link href="/forgot-password" title="Reset Password" className="text-(--accent-main) text-sm hover:text-(--ai-glow) transition-colors">
            Forgot Password?
          </Link>
          
          <div className="h-px w-full bg-(--border-soft) my-2"></div>
          
          <p className="text-sm text-(--text-muted)">
            Don't have an account?{' '}
            <Link href="/register" className="text-(--accent-main) font-semibold hover:underline">
              Register Now
            </Link>
          </p>
        </div>

        {/* AI System Tag using CSS class defined in globals.css */}
        <div className="mt-8 pt-4 border-t border-(--border-soft) text-center">
          <span className="ai-badge">
            <span className="w-2 h-2 bg-(--ai-glow) rounded-full animate-pulse"></span>
            AI-ENCRYPTED SESSION
          </span>
        </div>
      </div>
    </div>
  );
}
