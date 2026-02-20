'use client';

import { useState } from 'react';
import api from '../../lib/api';

interface Props {
  ticketId: string;
  onCommentAdded: () => void;
}

export default function CommentForm({ ticketId, onCommentAdded }: Props) {
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!comment.trim()) {
      setError('Comment required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await api.post(`/tickets/${ticketId}/comments`, {
        comment: comment
      });

      setComment('');
      onCommentAdded();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to add comment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment..."
        className="w-full p-3 bg-bg-main border border-border-soft rounded-lg text-text-main focus:outline-none focus:ring-2 focus:ring-accent-main"
      />

      <button
        type="submit"
        disabled={loading}
        className={`
          px-6 py-3
          bg-blue-600 text-(var(--text-main))
          rounded-2xl font-semibold
          shadow-md hover:shadow-lg hover:scale-105
          transition transform duration-200 ease-in-out
          disabled:opacity-50
        `}
      >
        {loading ? 'Adding...' : 'Add Comment'}
      </button>

      {error && <p className="text-red-400">{error}</p>}
    </form>
  );
}
