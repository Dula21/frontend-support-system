'use client';


export default function Footer() {
  return (
    <footer className="bg-bg-main border-t border-border-soft mt-12 reveal visible">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-text-main mb-4">Support Ticket System</h3>
            <p className="text-text-muted">
              Efficiently manage and resolve support tickets with AI-powered categorization.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-text-main mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/tickets" className="text-text-muted hover:text-accent-main transition duration-200">
                  My Tickets
                </a>
              </li>
              <li>
                <a href="/register" className="text-text-muted hover:text-accent-main transition duration-200">
                  Register
                </a>
              </li>
              <li>
                <a href="/login" className="text-text-muted hover:text-accent-main transition duration-200">
                  Login
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-text-main mb-4">Contact</h4>
            <p className="text-text-muted">Email: support@example.com</p>
            <p className="text-text-muted">Phone: +1 (123) 456-7890</p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-text-muted hover:text-accent-main transition duration-200">
                Twitter
              </a>
              <a href="#" className="text-text-muted hover:text-accent-main transition duration-200">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-border-soft mt-8 pt-8 text-center">
          <p className="text-text-muted">&copy; 2023 Support Ticket System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}