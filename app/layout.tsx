import { AuthProvider } from './components/Auth/AuthContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import './globals.css';

export const metadata = {
  title: 'Support Ticket System',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-bg-main text-text-main">
        <AuthProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}