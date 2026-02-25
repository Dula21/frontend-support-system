'use client';

import { useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from '../Auth/AuthContext';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { user, logout } = useContext(AuthContext)!;
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header className="bg-linear-to-r from-(--bg-main) to-(--bg-card) border-b border-(--border-soft) shadow-2xl reveal visible sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
<Link href="/" className="flex items-center gap-2 group">
  <div className="w-8 h-8 bg-(--accent-main) rounded-lg flex items-center justify-center shadow-lg/(--accent-soft) group-hover:scale-110 transition-transform">
    <span className="text-white text-xs font-bold italic">S</span>
  </div>
  <h1 className="text-xl font-extrabold text-(--text-main) tracking-tight">
    Smart <span className="text-(--accent-main)">Support</span>
  </h1>
</Link>


          {/* Navigation Section */}
          <nav className="flex items-center gap-2 md:gap-6">
            {user ? (
              <>
                <div className="hidden md:flex items-center mr-4">
                  <span className="ai-badge text-[10px]">
                    <span className="w-1.5 h-1.5 bg-(--ai-glow) rounded-full mr-1.5 animate-pulse"></span>
                    {user.role.toUpperCase()} SESSION
                  </span>
                </div>

                <Link
                  href="/tickets"
                  className="text-sm font-semibold text-(--text-main) hover:text-(--accent-main) px-4 py-2 rounded-xl hover:bg-(--accent-soft) transition-all"
                >
                  Tickets
                </Link>

                <button
                  onClick={handleLogout}
                  className="text-sm font-semibold text-red-400 hover:text-red-300 px-4 py-2 rounded-xl hover:bg-red-500/10 transition-all cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-semibold text-(--text-main) hover:text-(--accent-main) px-4 py-2 rounded-xl transition-all"
                >
                  Login
                </Link>

                <Link
  href="/register"
  className="bg-(--accent-main) hover:bg-(--accent-hover) text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-lg/(--accent-soft) transition-all transform hover:scale-[1.05]"
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
