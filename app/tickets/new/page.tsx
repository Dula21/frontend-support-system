'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from './../../lib/api';
import Header from './../../components/Layout/Header';

export default function NewTicket() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/tickets', { title, description, priority });
      router.push('/tickets');
    } catch (err: any) {
      alert('Failed to create ticket');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-6 max-w-md reveal visible">
        <h2 className="text-3xl font-bold mb-6 text-accent-main">Create Ticket</h2>
        <form onSubmit={handleSubmit} className="bg-main border border-border-soft rounded-lg p-6 shadow-lg">
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-3 mb-4 bg-main border border-border-soft rounded text-main placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-main"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-3 mb-4 bg-main border border-border-soft rounded text-main placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-main"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full p-3 mb-4 bg-main border border-border-soft rounded text-main focus:outline-none focus:ring-2 focus:ring-accent-main"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-accent-main text-main rounded hover:bg-opacity-80 transition duration-300 disabled:opacity-50"
          >
            {loading ? <span className="animate-blink">Creating...</span> : 'Submit'}
          </button>
        </form>
      </div>
    </>
  );
}