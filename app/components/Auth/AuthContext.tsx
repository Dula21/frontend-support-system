'use client';  // Required for client-side context in App Router

import { createContext, useState, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';  // Ensure jwt-decode is installed via npm install jwt-decode
import { User } from '../../../types/index'; // Import from your custom types file (create types/index.ts if needed)

interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);  // Fixed: Complete the type as | undefined

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        setUser(jwtDecode<User>(token));  // Type the decoded token for safety
      } catch {
        localStorage.removeItem('token');
      }
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem('token', token);
    setUser(jwtDecode<User>(token));  // Type the decoded token for safety
  };

  const logout = () => {
  localStorage.removeItem('token');
  setUser(null);
  // Redirect to login
  window.location.href = '/login';
};

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};
