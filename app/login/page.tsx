'use client';

import Header from './../components/Layout/Header';
import LoginForm from './../components/Auth/LoginForm';
import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import api from './../lib/api';
import { AuthContext } from './../components/Auth/AuthContext';

export default function Login() {
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
    <>
      <Header />
      <div className="container mx-auto p-4 max-w-md">
        <h2 className="text-2xl mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="border p-2 w-full mb-2" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="border p-2 w-full mb-2" />
          <button type="submit" className="bg-blue-500 text-white p-2 w-full">Login</button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </div>
    </>
  );
}