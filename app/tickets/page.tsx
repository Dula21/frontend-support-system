'use client';

import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from './../components/Auth/AuthContext';
import api from './../lib/api';
import { Ticket } from '../../types';
import Header from './../components/Layout/Header';

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
        console.log('Fetching tickets with params:', params);  // Debug log
        const res = await api.get('/tickets', { params });
        console.log('Fetched tickets:', res.data);  // Debug log
        setTickets(res.data);
      } catch (err: any) {
        console.error('Error fetching tickets:', err);  // Debug log
        setError(err.response?.data?.error || 'Failed to load tickets. Check login or backend.');
      } finally {
        setLoading(false);
      }
    };
    if (user) {
      fetchTickets();
    } else {
      setLoading(false);  // Stop loading if no user
    }
  }, [search, user]);

  if (!user) return <><Header /><div className="container mx-auto p-4">Please log in to view tickets.</div></>;

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl mb-4">Tickets</h1>
        {user?.role === 'admin' && (
          <input
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 mb-4"
          />
        )}
        <Link href="/tickets/new" className="bg-green-500 text-white p-2 inline-block mb-4">Create Ticket</Link>
        {loading && <p>Loading tickets...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && tickets.length === 0 && <p>No tickets found. Create one above!</p>}
        {tickets.map(ticket => (
          <div key={ticket._id} className="border p-4 mb-2">
            <h2>{ticket.title}</h2>
            <p>Status: {ticket.status} | Priority: {ticket.priority} | Category: {ticket.category}</p>
            <Link href={`/tickets/${ticket._id}`} className="text-blue-500">View</Link>
          </div>
        ))}
      </div>
    </>
  );
}