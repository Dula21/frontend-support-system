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
    
     <div className="min-h-screen flex items-center justify-center bg-bg-main p-4 reveal visible">
    <div className="container mx-auto p-4 max-w-md">
        <h2 className="text-2xl mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border p-2 w-full mb-2"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border p-2 w-full mb-2"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border p-2 w-full mb-2"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border p-2 w-full mb-2"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button
            type="submit"
            disabled={loading}
            className="bg-green-500 text-white p-2 w-full"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
}