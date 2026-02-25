import { AuthProvider } from './components/Auth/AuthContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import './globals.css';

export const metadata = {
  title: 'Smart Support | AI-Powered Ticketing',
  description: 'Efficiently manage and resolve support tickets with AI-powered categorization.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Corrected Google Fonts Link */}
        <link href="https://fonts.googleapis.com" rel="stylesheet" />
      </head>
      <body className="bg-(--bg-main) text-(--text-main) antialiased">
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            {/* 'flex-grow' is now 'grow' in Tailwind v4 */}
            <main className="grow">{children}</main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
