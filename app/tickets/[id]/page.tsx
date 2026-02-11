//For viewing/updating a ticket.
'use client';

import { useState, useEffect, useContext } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AuthContext } from './../../components/Auth/AuthContext';
import api from './../../lib/api';
import { Ticket , Comment} from '../../../types/index';
import Header from './../../components/Layout/Header';
import CommentForm from './../../components/Tickets/CommentForm';

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
    // Re-fetch comments after adding
    const fetchComments = async () => {
      const res = await api.get(`/tickets/${id}/comments`);
      setComments(res.data);
    };
    fetchComments();
  };

  if (!ticket) return <><Header /><div className="container mx-auto p-4">Loading...</div></>;

  return (
    <>
      <Header />
      <div className="container mx-auto p-4 max-w-2xl">
        <h1 className="text-2xl mb-4">{ticket.title}</h1>
        <p className="mb-4">{ticket.description}</p>
        <div className="mb-4">
          <label>Status: </label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="border p-2 ml-2">
            <option value="open">Open</option>
            <option value="closed">Closed</option>
            <option value="in-progress">In Progress</option>
          </select>
        </div>
        <div className="mb-4">
          <label>Category: </label>
          <input value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2 ml-2" disabled={user?.role !== 'admin'} />
        </div>
        <button onClick={updateTicket} disabled={loading} className="bg-blue-500 text-white p-2 mr-4">
          {loading ? 'Updating...' : 'Update Ticket'}
        </button>
        {user?.role === 'admin' && (
          <button onClick={deleteTicket} className="bg-red-500 text-white p-2">Delete Ticket</button>
        )}
        {error && <p className="text-red-500 mt-4">{error}</p>}

        <h3 className="text-xl mt-6 mb-2">Comments</h3>
        {comments.map(comment => (
          <div key={comment._id} className="border p-2 mb-2">
            <p>{comment.content}</p>
            <small>By {comment.createdBy} on {new Date(comment.createdAt).toLocaleDateString()}</small>
          </div>
        ))}
        <CommentForm ticketId={id as string} onCommentAdded={handleCommentAdded} />
      </div>
    </>
  );
}