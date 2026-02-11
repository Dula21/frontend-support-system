'use client';

import { useState } from 'react';
import api from './../../lib/api';

interface CommentFormProps {
  ticketId: string;
  onCommentAdded: () => void;  // Callback to refresh comments
}

export default function CommentForm({ ticketId, onCommentAdded }: CommentFormProps) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.post(`/tickets/${ticketId}/comments`, { content });
      setContent('');
      onCommentAdded();  // Refresh comments list
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to add comment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        placeholder="Add a comment"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        className="border p-2 w-full"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white p-2 mt-2"
      >
        {loading ? 'Adding...' : 'Add Comment'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
}