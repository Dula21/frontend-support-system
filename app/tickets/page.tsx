'use client';

import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from './../components/Auth/AuthContext';
import api from './../lib/api';
import { Ticket } from '../../types';

export default function Tickets() {
  const { user } = useContext(AuthContext)!;
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      setError('');
      try {
        const params = user?.role === 'admin' ? { search } : {};
        const res = await api.get('/tickets', { params });
        setTickets(res.data);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to load tickets.');
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchTickets();
  }, [search, user]);

  // If user is not logged in
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-main text-text-main">
        Please log in to view tickets.
      </div>
    );
  }

  // Logged-in view
  return (
    <div className="min-h-screen bg-bg-main p-6 reveal visible">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-text-main">
          Your Tickets
        </h1>

        {user?.role === 'admin' && (
          <input
            placeholder="Search tickets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 mb-6 bg-bg-main border border-border-soft rounded-lg text-text-main placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-main transition"
          />
        )}

        <Link
          href="/tickets/new"
          className="inline-block mb-6 px-6 py-3 bg-accent-main text-text-main rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition"
        >
          Create New Ticket
        </Link>

        {loading && (
          <div className="w-full h-2 bg-border-soft rounded-full overflow-hidden">
            <div className="h-full bg-accent-main animate-loading-bar"></div>
          </div>
        )}

        {error && <p className="text-red-400 mb-4">{error}</p>}

        {!loading && !error && tickets.length === 0 && (
          <p className="text-text-muted">
            No tickets found. Create one above!
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="bg-accent-soft p-6 rounded-2xl shadow-lg border border-border-soft hover:shadow-xl hover:scale-105 transition reveal visible"
            >
              <h2 className="text-xl font-semibold mb-2 text-text-main">
                {ticket.title}
              </h2>
              <p className="text-text-muted mb-2">
                {ticket.description.slice(0, 100)}...
              </p>
              <p className="text-sm text-text-muted">
                Status: <span className="text-accent-main">{ticket.status}</span> | Priority: {ticket.priority} | Category: {ticket.category}
              </p>
              <Link
                href={`/tickets/${ticket._id}`}
                className="mt-4 inline-block px-4 py-2 bg-accent-main text-text-main rounded-lg hover:bg-opacity-80 transition"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}