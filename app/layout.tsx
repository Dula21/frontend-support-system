import { AuthProvider } from './components/Auth/AuthContext';  // Import your AuthProvider
import './globals.css';  // Tailwind styles (ensure this file exists in app/)

export const metadata = {
  title: 'Support Ticket System',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}