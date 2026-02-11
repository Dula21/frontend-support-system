'use client';

import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../lib/api';  // We'll create this
import { AuthContext } from './AuthContext';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext)!;
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      login(res.data.token);
      router.push('/tickets');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="border p-2 w-full" />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="border p-2 w-full mt-2" />
      <button type="submit" className="bg-blue-500 text-white p-2 w-full mt-2">Login</button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
}