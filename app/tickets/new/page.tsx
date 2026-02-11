'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from './../../lib/api';
import Header from './../../components/Layout/Header';

export default function NewTicket() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post('/tickets', { title, description, priority });
    router.push('/tickets');
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <h2>Create Ticket</h2>
        <form onSubmit={handleSubmit} className="max-w-md">
          <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required className="border p-2 w-full" />
          <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required className="border p-2 w-full mt-2" />
          <select value={priority} onChange={(e) => setPriority(e.target.value)} className="border p-2 w-full mt-2">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button type="submit" className="bg-blue-500 text-white p-2 w-full mt-2">Submit</button>
        </form>
      </div>
    </>
  );
}