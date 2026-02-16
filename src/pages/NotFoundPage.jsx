import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | DebugYourFinance</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 px-4">
        <div className="text-center px-4 max-w-lg">
          {/* 404 Icon */}
          <div className="mb-8">
            <div className="text-9xl font-bold text-accent mb-4">404</div>
            <Search className="mx-auto h-16 w-16 text-slate-400 dark:text-slate-600 animate-pulse" />
          </div>

          {/* Message */}
          <h1 className="text-3xl font-semibold text-primary dark:text-white mb-4">
            Page Not Found
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg">
            The page you're looking for doesn't exist or has been moved.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent hover:bg-accent-600 text-white rounded-lg font-semibold transition-colors shadow-lg"
            >
              <Home size={20} />
              Back to Home
            </Link>
            <Link
              to="/tools/sip"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-primary dark:text-white border-2 border-slate-200 dark:border-slate-700 rounded-lg font-semibold transition-colors"
            >
              Go to Tools
            </Link>
          </div>

          {/* Suggestions */}
          <div className="mt-12 text-left">
            <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
              Popular Pages:
            </h2>
            <ul className="space-y-2">
              <li>
                <Link to="/tools/sip" className="text-accent hover:underline">
                  SIP Calculator
                </Link>
              </li>
              <li>
                <Link to="/tools/tax" className="text-accent hover:underline">
                  Tax Regime Simulator
                </Link>
              </li>
              <li>
                <Link to="/tools/loan" className="text-accent hover:underline">
                  Loan Tenure Reducer
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
