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
  const router = useRouter();

  useEffect(() => {
    // Parse token from URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get('token');
    if (urlToken) {
      setToken(urlToken);
    } else {
      setError('No token found in URL. Please check your email for the reset link.');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    setError('');
    setMessage('');
    try {
      await api.post('/auth/reset-password', { token, newPassword });
      setMessage('Password reset successfully! Redirecting to login...');
      setTimeout(() => router.push('/login'), 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-main p-4 reveal visible">
      <div className="bg-bg-main border border-border-soft rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-text-main">
          Reset Password
        </h2>
        <p className="text-text-muted text-center mb-4">
          Enter your new password using the token from your email.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full p-3 bg-bg-main border border-border-soft rounded-lg text-text-main placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-main transition"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full p-3 bg-bg-main border border-border-soft rounded-lg text-text-main placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-main transition"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-accent-main text-text-main rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition disabled:opacity-50"
          >
            {loading ? 'Resetting...' : 'Reset Password'}
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