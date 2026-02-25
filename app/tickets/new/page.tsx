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
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
    const fetchAdmins = async () => {
      try {
        const res = await api.get('/users/admins');
        setAdmins(res.data);
      } catch (err) {
        console.error('Failed to load admins:', err);
      }
    };
    fetchAdmins();
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
      if (!err.response) {
      setError("Server unreachable. Check your internet or backend status.");
    } else if (err.response.status === 403) {
      setError("Forbidden: You aren't authorized to create tickets.");
    } else {
      setError(err.response.data.error || "Failed to create ticket.");
    }
  } finally {
    setLoading(false);
  }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-(--bg-main) p-6">
      <div className={`bg-(--bg-card) border border-(--border-soft) rounded-3xl shadow-2xl p-8 max-w-lg w-full reveal ${isVisible ? 'visible' : ''}`}>
        
        {/* Header & Back Button */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => router.back()}
            className="p-2 rounded-xl bg-(--accent-soft) text-(--accent-main) hover:bg-(--accent-main) hover:text-white transition-all cursor-pointer"
            title="Go Back"
          >
            ←
          </button>
          <h2 className="text-3xl font-extrabold text-(--text-main) tracking-tight">
            New <span className="text-(--accent-main)">Ticket</span>
          </h2>
          <div className="w-10"></div> {/* Spacer for symmetry */}
        </div>

        <p className="text-(--text-muted) text-sm text-center mb-8">
          Our <span className="text-(--ai-glow) font-mono">Smart-AI</span> will automatically classify your request.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-(--text-muted) uppercase tracking-wider ml-1">Title</label>
            <input
              type="text"
              placeholder="Brief summary of the issue"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-4 rounded-2xl transition-all duration-200"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-(--text-muted) uppercase tracking-wider ml-1">Detailed Description</label>
            <textarea
              placeholder="Please describe your problem in detail..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full p-4 rounded-2xl h-32 resize-none transition-all duration-200"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-(--text-muted) uppercase tracking-wider ml-1">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full p-4 rounded-2xl cursor-pointer"
              >
                <option value="low" className="bg-(--bg-card)">Low</option>
                <option value="medium" className="bg-(--bg-card)">Medium</option>
                <option value="high" className="bg-(--bg-card)">High</option>
              </select>
            </div>

            {admins.length > 0 && (
              <div className="space-y-1">
                <label className="text-xs font-semibold text-(--text-muted) uppercase tracking-wider ml-1">Direct Assign</label>
                <select
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  className="w-full p-4 rounded-2xl cursor-pointer"
                >
                  <option value="" className="bg-(--bg-card)">Auto-Assign (AI)</option>
                  {admins.map((admin) => (
                    <option key={admin._id} value={admin._id} className="bg-(--bg-card)">
                      {admin.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-(--text-muted) uppercase tracking-wider ml-1">Attachment</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full p-3 bg-(--bg-main) border border-(--border-soft) rounded-2xl text-sm text-(--text-muted) file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-(--accent-soft) file:text-(--accent-main) hover:file:bg-(--accent-main) hover:file:text-white file:transition-all cursor-pointer"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full p-4 bg-(--accent-main) hover:bg-(--accent-hover) text-white rounded-2xl font-bold shadow-lg shadow-indigo-500/20 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <span className="animate-blink">Processing...</span>
              </div>
            ) : (
              'Submit to Smart-AI'
            )}
          </button>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-center text-sm font-medium animate-pulse">
              {error}
            </div>
          )}
        </form>

        <div className="mt-8 pt-6 border-t border-(--border-soft) text-center">
          <span className="ai-badge">
            <span className="w-2 h-2 bg-(--ai-glow) rounded-full animate-pulse"></span>
            AI CLASSIFICATION ENABLED
          </span>
        </div>
      </div>
    </div>
  );
}
