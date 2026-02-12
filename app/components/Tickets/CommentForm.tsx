'use client';

import { useState } from 'react';
import api from './../../lib/api';

interface CommentFormProps {
  ticketId: string;
  onCommentAdded: () => void;
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
      onCommentAdded();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to add comment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-bg-main border border-border-soft rounded-lg shadow-lg p-6 reveal visible">
      <h4 className="text-lg font-semibold mb-4 text-text-main">Add a Comment</h4>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          placeholder="Write your comment here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="w-full p-3 bg-bg-main border border-border-soft rounded-lg text-text-main placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-main h-24 resize-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-accent-main text-text-main rounded-lg hover:bg-opacity-80 transition duration-200 disabled:opacity-50"
        >
          {loading ? 'Adding...' : 'Add Comment'}
        </button>
        {error && <p className="text-red-400">{error}</p>}
      </form>
    </div>
  );
}