'use client';

import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../../components/Auth/AuthContext';
import api from '../../lib/api';

export default function NewTicket() {
  const { user } = useContext(AuthContext)!;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [file, setFile] = useState<File | null>(null);
  const [assignedTo, setAssignedTo] = useState('');
  const [admins, setAdmins] = useState<{ _id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  // Fetch admins for assignedTo dropdown (only if user is admin)
  useEffect(() => {
    //if (user?.role === 'admin') {
      const fetchAdmins = async () => {
        try {
          const res = await api.get('/users/admins');
          setAdmins(res.data);
        } catch (err) {
          console.error('Failed to load admins:', err);
        }
      };
      fetchAdmins();
    //}
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('priority', priority);
      if (file) formData.append('file', file);
      if (assignedTo) formData.append('assignedTo', assignedTo);

      await api.post('/tickets', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      router.push('/tickets');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create ticket');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-main p-6">
      <div className="bg-bg-main border border-border-soft rounded-2xl shadow-lg p-8 max-w-md w-full reveal visible">
        <h2 className="text-3xl font-bold mb-6 text-accent-main text-center">Create Ticket</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-3 bg-bg-main border border-border-soft rounded-2xl text-text-main placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-main"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-3 bg-bg-main border border-border-soft rounded-2xl text-text-main placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-main h-28 resize-none"
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full p-3 bg-bg-main border border-border-soft rounded-2xl text-text-main focus:outline-none focus:ring-2 focus:ring-accent-main"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          {/* AssignedTo dropdown - only for admins */}
          {admins.length > 0 && (
  <select
    value={assignedTo}
    onChange={(e) => setAssignedTo(e.target.value)}
    className="w-full p-3 bg-bg-main border border-border-soft rounded-lg text-text-main focus:outline-none focus:ring-2 focus:ring-accent-main"
  >
    <option value="">Assign to (optional)</option>
    {admins.map((admin) => (
      <option key={admin._id} value={admin._id}>{admin.name}</option>
    ))}
  </select>
)}

          {/* File Attachment */}
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full p-3 bg-bg-main border border-border-soft rounded-2xl text-text-main"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-accent-main text-text-main rounded-2xl font-semibold shadow-md hover:shadow-lg hover:scale-105 transition transform duration-200 ease-in-out disabled:opacity-50"
          >
            {loading ? <span className="animate-blink">Creating...</span> : 'Submit Ticket'}
          </button>

          {error && <p className="text-red-400 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
}