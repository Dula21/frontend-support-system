'use client';

import { useState } from 'react';
import Link from 'next/link';
import api from './../lib/api';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      await api.post('/auth/forgot-password', { email });
      setMessage('Reset email sent! Check your inbox for the link.');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-main p-4 reveal visible">
      <div className="bg-bg-main border border-border-soft rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-text-main">
          Forgot Password
        </h2>
        <p className="text-text-muted text-center mb-4">
          Enter your email to receive a password reset link.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 bg-bg-main border border-border-soft rounded-lg text-text-main placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-main transition"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-accent-main text-text-main rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Reset Email'}
          </button>

          {message && <p className="text-green-400 text-center mt-2">{message}</p>}
          {error && <p className="text-red-400 text-center mt-2">{error}</p>}
        </form>

        <div className="text-center mt-4">
          <Link href="/login" className="text-accent-main hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}