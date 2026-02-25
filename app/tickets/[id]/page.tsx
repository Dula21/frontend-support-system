'use client';

import { useState, useEffect, useContext } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AuthContext } from '../../components/Auth/AuthContext';
import api from '../../lib/api';
import { Ticket, Comment } from '../../../types';
import CommentForm from '../../components/Tickets/CommentForm';

export default function TicketDetail() {
  const { id } = useParams();
  const { user } = useContext(AuthContext)!;
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [status, setStatus] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
    const fetchData = async () => {
      setError('');
      try {
        const [ticketRes, commentRes] = await Promise.all([
          api.get(`/tickets/${id}`),
          api.get(`/tickets/${id}/comments`)
        ]);
        setTicket(ticketRes.data);
        setStatus(ticketRes.data.status);
        setCategory(ticketRes.data.category);
        setComments(commentRes.data);
      } catch (err: any) {
        // --- Enhanced Error Handling ---
        if (!err.response) {
          setError("Smart-AI Bridge Offline: Check your local server connection.");
        } else if (err.response.status === 404) {
          setError("Record Not Found: This ticket does not exist in the database.");
        } else if (err.response.status === 401) {
          setError("Session Expired: Please re-authenticate to view secure logs.");
        } else {
          setError(err.response.data?.error || 'Failed to decrypt secure data packet.');
        }
      }
    };
    if (id) fetchData();
  }, [id]);

  const updateTicket = async () => {
    setLoading(true);
    setError('');
    try {
      await api.put(`/tickets/${id}`, { status, category });
      const res = await api.get(`/tickets/${id}`);
      setTicket(res.data);
      alert('System Synchronized: Ticket updated in Atlas Cloud.');
    } catch (err: any) {
      // --- Enhanced Update Error Handling ---
      if (err.response?.status === 403) {
        setError("Access Denied: You do not have 'Admin' clearance for this action.");
      } else {
        setError(err.response?.data?.error || "Synchronization Failed: Data rejected by server.");
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteTicket = async () => {
    setError('');
    if (!confirm('Permanently purge this record from Smart-AI logs?')) return;
    try {
      await api.delete(`/tickets/${id}`);
      router.push('/tickets');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Purge Operation Failed: Internal database error.');
    }
  };

  if (!ticket && !error) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-(--bg-main) p-10">
      <div className="w-full max-w-md h-1 bg-(--border-soft) rounded-full overflow-hidden">
        <div className="h-full bg-(--accent-main) animate-loading-bar"></div>
      </div>
      <p className="mt-4 text-xs font-mono text-(--text-muted) animate-blink uppercase tracking-widest">Accessing Secure Logs...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-(--bg-main) p-4 sm:p-8">
      <div className={`max-w-5xl mx-auto reveal ${isVisible ? 'visible' : ''}`}>
        
        {/* Navigation */}
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => router.back()} 
            className="p-2 rounded-xl bg-(--bg-card) border border-(--border-soft) text-(--text-muted) hover:text-(--accent-main) transition-all cursor-pointer"
          >
            ← Back to Grid
          </button>
        </div>

        {/* Error Display Card */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm font-medium animate-pulse text-center">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-(--bg-card) border border-(--border-soft) rounded-3xl p-8 shadow-2xl">
              <div className="flex justify-between items-start mb-6">
                 <h1 className="text-3xl font-bold text-(--text-main)">{ticket?.title || 'Unknown Ticket'}</h1>
                 <span className="ai-badge">ID: {String(id).slice(-6)}</span>
              </div>
              <p className="text-(--text-muted) leading-relaxed mb-8 text-lg">{ticket?.description}</p>
              
              {ticket?.attachment && (
                <div className="p-4 rounded-2xl bg-(--bg-main) border border-(--border-soft) flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📄</span>
                    <div>
                      <p className="text-sm font-bold text-(--text-main)">Attachment Found</p>
                    </div>
                  </div>
                  <a href={`http://localhost:5000/uploads/${ticket.attachment}`} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-(--accent-soft) text-(--accent-main) rounded-lg text-xs font-bold hover:bg-(--accent-main) hover:text-white transition-all">VIEW</a>
                </div>
              )}
            </div>

            <div className="bg-(--bg-card) border border-(--border-soft) rounded-3xl p-8">
              <h3 className="text-xl font-bold mb-6 text-(--text-main) flex items-center gap-2">
                <span className="w-2 h-2 bg-(--ai-glow) rounded-full"></span> Communication Logs
              </h3>
              <div className="space-y-4 mb-8">
                {comments.length === 0 && <p className="text-(--text-muted) text-sm italic">No logs found for this ticket.</p>}
                {comments.map((comment, index) => (
                  <div key={index} className="bg-(--bg-main) border border-(--border-soft) rounded-2xl p-5">
                    <p className="text-(--text-main) mb-3">{comment.comment}</p>
                    <div className="flex items-center justify-between text-[10px] font-bold">
                       <span className="text-(--accent-main)">SYSTEM UPDATE</span>
                       <span className="text-(--text-muted)">{new Date(comment.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Only Admins can comment */}
              {user?.role === 'admin' ? (
                <CommentForm ticketId={id as string} onCommentAdded={() => api.get(`/tickets/${id}/comments`).then(res => setComments(res.data))} />
              ) : (
                <div className="p-4 bg-(--accent-soft) rounded-2xl border border-(--accent-main)/20 text-center">
                  <p className="text-xs text-(--text-muted) italic">Read-only view. Only assigned admins can post updates.</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-(--bg-card) border border-(--border-soft) rounded-3xl p-8 sticky top-8">
              <h4 className="text-xs font-bold text-(--text-muted) uppercase tracking-widest mb-6">System Management</h4>
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-(--text-muted) mb-2 uppercase">Status Control</label>
                  <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full p-4 rounded-xl bg-(--bg-main) border border-(--border-soft) text-(--text-main) cursor-pointer">
                    <option value="open">🟢 Open</option>
                    <option value="in-progress">🟡 In Progress</option>
                    <option value="closed">🔴 Closed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-(--text-muted) mb-2 uppercase">AI Classification</label>
                  <input value={category} onChange={(e) => setCategory(e.target.value)} disabled={user?.role !== 'admin'} className="w-full p-4 rounded-xl bg-(--bg-main) border border-(--border-soft) text-(--ai-glow) font-mono text-sm disabled:opacity-50" />
                </div>

                {/* Assigned Specialist Name Display */}
                <div className="pt-4 border-t border-(--border-soft)">
                  <p className="text-[10px] font-bold text-(--text-muted) uppercase mb-2">Assigned Specialist</p>
                  <p className="text-sm font-bold text-(--text-main)">
                    {ticket?.assignedAdminName || 'Awaiting Smart-AI Assignment...'}
                  </p>
                </div>

                <div className="pt-4 space-y-3">
                  <button onClick={updateTicket} disabled={loading} className="w-full py-4 bg-(--accent-main) hover:bg-(--accent-hover) text-white rounded-xl font-bold shadow-lg transition-all transform hover:scale-[1.02]">
                    {loading ? 'SYNCING...' : 'UPDATE SYSTEM'}
                  </button>
                  {user?.role === 'admin' && (
                    <button onClick={deleteTicket} className="w-full py-2 text-red-500 text-xs font-bold hover:underline cursor-pointer">PURGE RECORD</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
