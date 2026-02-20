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
  const router = useRouter();

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const res = await api.get(`/tickets/${id}`);
        setTicket(res.data);
        setStatus(res.data.status);
        setCategory(res.data.category);
        console.log('Ticket attachment:', res.data.attachment);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to load ticket');
      }
    };
    const fetchComments = async () => {
      try {
        const res = await api.get(`/tickets/${id}/comments`);
        setComments(res.data);
      } catch (err: any) {
        console.error('Failed to load comments:', err);
      }
    };
    if (id) {
      fetchTicket();
      fetchComments();
    }
  }, [id]);

  const updateTicket = async () => {
    setLoading(true);
    setError('');
    try {
      await api.put(`/tickets/${id}`, { status, category });
      const res = await api.get(`/tickets/${id}`);
      setTicket(res.data);
      setStatus(res.data.status);
      setCategory(res.data.category);
      alert('Ticket updated successfully!');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to update ticket. Check permissions.');
    } finally {
      setLoading(false);
    }
  };

  const deleteTicket = async () => {
    if (user?.role !== 'admin') return alert('Only admins can delete tickets.');
    if (!confirm('Are you sure?')) return;
    try {
      await api.delete(`/tickets/${id}`);
      router.push('/tickets');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to delete ticket.');
    }
  };

  const handleCommentAdded = () => {
    const fetchComments = async () => {
      const res = await api.get(`/tickets/${id}/comments`);
      setComments(res.data);
    };
    fetchComments();
  };

  if (!ticket) return (
    <div className="min-h-screen flex items-center justify-center bg-bg-main text-text-main reveal visible">
      <div className="w-full max-w-md h-2 bg-border-soft rounded-full overflow-hidden">
        <div className="h-full bg-accent-main animate-loading-bar"></div>
      </div>
    </div>
    
  );

  return (
    <div className="min-h-screen bg-bg-main p-4 reveal visible">
      <div className="max-w-4xl mx-auto">
        <div className="bg-bg-main border border-border-soft rounded-lg shadow-lg p-8 mb-6">
          <h1 className="text-3xl font-bold mb-4 text-text-main">{ticket.title}</h1>
          <p className="text-text-muted mb-6">{ticket.description}</p>
          
          {ticket.attachment && (
            <div className="mb-4">
              <p className="text-text-muted">Attachment:</p>
              <a
                href={`http://localhost:5000/uploads/${ticket.attachment}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-main hover:underline"
              >
                Download Attachment
              </a>
            </div>
          )}
          
          <p className="text-text-muted mb-2">
            Created by: {typeof ticket.creatorInfo === 'object' && ticket.creatorInfo?.name ? ticket.creatorInfo.name : ticket.createdBy}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-text-main mb-2">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-3 bg-bg-main border border-border-soft rounded-lg text-text-main focus:outline-none focus:ring-2 focus:ring-accent-main"
              >
                <option value="open">Open</option>
                <option value="closed">Closed</option>
                <option value="in-progress">In Progress</option>
              </select>
            </div>
            <div>
              <label className="block text-text-main mb-2">Category</label>
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={user?.role !== 'admin'}
                className="w-full p-3 bg-bg-main border border-border-soft rounded-lg text-text-main focus:outline-none focus:ring-2 focus:ring-accent-main disabled:opacity-50"
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={updateTicket}
              disabled={loading}
              className="px-6 py-3 bg-green-600 text-text-main rounded-lg font-semibold shadow-md hover:shadow-lg hover:scale-105 transition disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update Ticket'}
            </button>
            {user?.role === 'admin' && (
              <button
                onClick={deleteTicket}
                className="px-6 py-3 bg-red-600 text-text-main rounded-lg font-semibold shadow-md hover:shadow-lg hover:scale-105 transition"
              >
                Delete Ticket
              </button>
            )}
          </div>
          {error && <p className="text-red-400 mt-4">{error}</p>}
        </div>

        <div className="bg-bg-main border border-border-soft rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold mb-4 text-text-main">Comments</h3>
          <div className="space-y-4 mb-6">
            {comments.map((comment, index) => (
              <div key={index} className="bg-accent-soft border border-border-soft rounded-lg p-4">
                <p className="text-text-main">{comment.comment}</p>
                <small className="text-text-muted">By {comment.UserId} on {new Date(comment.createdAt).toLocaleDateString()}</small>
              </div>
            ))}
          </div>
          <CommentForm ticketId={id as string} onCommentAdded={handleCommentAdded} />
        </div>
      </div>
    </div>
  );
}