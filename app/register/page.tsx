'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from './../lib/api';
//import Header from './../components/Layout/Header';


export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.post('/auth/register', { name, email, password, role });
      router.push('/login');  // Redirect to login after registration
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    
     <div className="min-h-screen flex items-center justify-center bg-(--bg-main) p-4 reveal visible">
  <div className="bg-(--bg-main) border border-(--border-soft) rounded-2xl shadow-2xl p-8 w-full max-w-md">
    <h2 className="text-3xl font-bold text-center mb-6 text-(--text-main)">
      Register
    </h2>

    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full p-3 mb-2 rounded-lg border border-(--border-soft) bg-(--bg-main) text-(--text-main) placeholder:text-(--text-muted) focus:outline-none focus:ring-2 focus:ring-(--accent-main) transition"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full p-3 mb-2 rounded-lg border border-(--border-soft) bg-(--bg-main) text-(--text-main) placeholder:text-(--text-muted) focus:outline-none focus:ring-2 focus:ring-(--accent-main) transition"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full p-3 mb-2 rounded-lg border border-(--border-soft) bg-(--bg-main) text-(--text-main) placeholder:text-(--text-muted) focus:outline-none focus:ring-2 focus:ring-(--accent-main) transition"
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full p-3 mb-2 rounded-lg border border-(--border-soft) bg-(--bg-main) text-(--text-main) placeholder:text-(--text-muted) focus:outline-none focus:ring-2 focus:ring-(--accent-main) transition"
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <button
        type="submit"
        disabled={loading}
        className="w-full p-3 bg-linear-to-r from-[#E75480] to-[#FF85A2] text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition disabled:opacity-50"
      >
        {loading ? 'Registering...' : 'Register'}
      </button>

      {error && (
        <p className="text-red-400 mt-2 text-center">{error}</p>
      )}
    </form>
  </div>
</div>

  );
}