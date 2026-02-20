'use client';

import { useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from '../Auth/AuthContext';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { user, logout } = useContext(AuthContext)!;

  const router = useRouter();
const handleLogout = () => {
  logout();  // From context
  router.push('/login');
};

  return (
    <header className="bg-linear-to-r from-(var(--bg-main)) to-(var(--accent-soft)) border-b border-(--border-soft) shadow-lg reveal visible">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">
      <h1 className="text-xl font-bold text-(--text-main) hover:text-(--accent-main) transition duration-200">
        Support Ticket System
      </h1>

      <nav className="flex space-x-4">
        {user ? (
          <>
            <span className="text-(--text-muted)">
              Welcome, {user.role}!
            </span>

            <Link
              href="/tickets"
              className="text-(--text-main) hover:text-(--accent-main) transition duration-200 px-3 py-2 rounded-lg hover:bg-(--accent-soft)"
            >
              Tickets
            </Link>

            <button
              onClick={handleLogout}
              className="text-(--text-main) hover:text-(--accent-main) transition duration-200 px-3 py-2 rounded-lg hover:bg-(--accent-soft)"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="text-(--text-main) hover:text-(--accent-main) transition duration-200 px-3 py-2 rounded-lg hover:bg-(--accent-soft)"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="text-(--text-main) hover:text-(--accent-main) transition duration-200 px-3 py-2 rounded-lg hover:bg-(--accent-soft)"
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </div>
  </div>
</header>

  );
}