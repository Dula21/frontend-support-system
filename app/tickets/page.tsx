'use client';

import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from './../components/Auth/AuthContext';
import api from './../lib/api';
import { Ticket } from '../../types';
import { useRouter } from 'next/navigation';

export default function Tickets() {
  const { user } = useContext(AuthContext)!;
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
    const fetchTickets = async () => {
      setLoading(true);
      setError('');
      try {
        // Updated: Always send search if present, regardless of role
        const params = { search };
        const res = await api.get('/tickets', { params });
        setTickets(res.data);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to load tickets.');
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchTickets();
    else router.push('/login');
  }, [search, user, router]);

  return (
    <div className="min-h-screen bg-(--bg-main) p-6 sm:p-10">
      <div className={`max-w-7xl mx-auto reveal ${isVisible ? 'visible' : ''}`}>
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-extrabold text-(--text-main) tracking-tight">
              Support <span className="text-(--accent-main)">Tickets</span>
            </h1>
            <p className="text-(--text-muted) mt-2">Manage and monitor support requests</p>
          </div>

          <Link
            href="/tickets/new"
            className="inline-flex items-center justify-center px-6 py-3 bg-(--accent-main) hover:bg-(--accent-hover) text-white rounded-xl font-bold shadow-lg shadow-indigo-500/20 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            + Create New Ticket
          </Link>
        </div>

        {/* Search Bar - Visible to all, but placeholder changes for Admin */}
        <div className="relative mb-8">
          <input
            placeholder={user?.role === 'admin' ? "Search title, description or client..." : "Search your tickets..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-4 pl-12 rounded-2xl bg-(--bg-card) border border-(--border-soft) text-(--text-main) focus:ring-2 focus:ring-(--accent-main) transition-all"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-(--text-muted)">🔍</span>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="space-y-4">
            <div className="w-full h-1 bg-(--border-soft) rounded-full overflow-hidden">
              <div className="h-full bg-(--accent-main) animate-loading-bar w-1/3"></div>
            </div>
            <p className="text-center text-(--text-muted) animate-blink text-sm font-mono uppercase">Syncing Terminal...</p>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-center mb-6">
            {error}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && tickets.length === 0 && (
          <div className="text-center py-20 bg-(--bg-card) rounded-3xl border border-dashed border-(--border-soft)">
            <p className="text-(--text-muted) text-lg">No tickets found in your secure log.</p>
          </div>
        )}

        {/* Tickets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map((ticket, index) => (
            <div
              key={ticket._id}
              style={{ transitionDelay: `${index * 50}ms` }}
              className="group bg-(--bg-card) p-6 rounded-2xl shadow-xl border border-(--border-soft) hover:border-(--accent-main) transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="ai-badge text-[10px]">
                    {ticket.category || 'Analyzing...'}
                  </span>
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${
                    ticket.priority === 'high' ? 'text-red-400' : 'text-(--text-muted)'
                  }`}>
                    {ticket.priority}
                  </span>
                </div>

                <h2 className="text-xl font-bold mb-3 text-(--text-main) group-hover:text-(--accent-main) transition-colors">
                  {ticket.title}
                </h2>
                <p className="text-(--text-muted) text-sm leading-relaxed mb-4">
                  {ticket.description.length > 90 
                    ? `${ticket.description.slice(0, 90)}...` 
                    : ticket.description}
                </p>

                {/* --- SMART INFO SECTION --- */}
                <div className="mb-6 space-y-2 border-l-2 border-(--border-soft) pl-3">
                  {/* Show Creator Name to Admins */}
                  <p className="text-[10px] font-bold text-(--text-muted) uppercase">
                    Client: <span className="text-(--text-main)">{ticket.creatorInfo?.name || 'Loading...'}</span>
                  </p>
                  
                  {/* Show Agent Name */}
                  <p className="text-[10px] font-bold text-(--text-muted) uppercase">
                    Agent: <span className="text-(--accent-main)">{ticket.assignedAdminName || 'Unassigned'}</span>
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-(--border-soft) flex items-center justify-between">
                <div className="text-xs">
                  <span className="text-(--text-muted)">Status:</span>
                  <span className="ml-2 px-2 py-0.5 rounded bg-(--accent-soft) text-(--accent-main) font-semibold">
                    {ticket.status}
                  </span>
                </div>
                
                <Link
                  href={`/tickets/${ticket._id}`}
                  className="text-sm font-bold text-(--accent-main) hover:text-(--ai-glow) transition-colors flex items-center gap-1"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
