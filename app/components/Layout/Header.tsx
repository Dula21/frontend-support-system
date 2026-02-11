'use client';

import { useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from '../Auth/AuthContext';

export default function Header() {
  const { user, logout } = useContext(AuthContext)!;

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between">
      <h1>Support Ticket System</h1>
      {user ? (
        <div>
          <span>Welcome, {user.role}!</span>
          <Link href="/tickets" className="ml-4">Tickets</Link>
          <button onClick={logout} className="ml-4">Logout</button>
        </div>
      ) : (
        <div>
          <Link href="/login">Login</Link>
          <Link href="/register" className="ml-4">Register</Link>
        </div>
      )}
    </header>
  );
}