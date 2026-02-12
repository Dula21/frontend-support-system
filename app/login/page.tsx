'use client';

import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import api from './../lib/api';
import { AuthContext } from './../components/Auth/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext)!;
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/auth/login', { email, password });
      login(res.data.token);
      router.push('/tickets');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-(--bg-main) p-4 reveal visible">
      <div className="bg-(--bg-main) border border-(--border-soft) rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-(--text-main)">
          Welcome Back !
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 bg-(--bg-main) border border-(--border-soft) rounded-lg text-(--text-main) placeholder:text-(--text-muted) focus:outline-none focus:ring-2 focus:ring-(--accent-main) transition"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 bg-(--bg-main) border border-(--border-soft) rounded-lg text-(--text-main) placeholder:text-(--text-muted) focus:outline-none focus:ring-2 focus:ring-(--accent-main) transition"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-linear-to-r from-[#E75480] to-[#FF85A2] text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition disabled:opacity-50"
          >
            {loading ? <span className="animate-blink">Logging in...</span> : 'Login'}
          </button>

          {error && (
            <p className="text-red-400 text-center mt-2">{error}</p>
          )}
        </form>

        <p className="text-center text-(--text-muted) mt-4">
          Don't have an account?{' '}
          <a href="/register" className="text-(--accent-main) hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
