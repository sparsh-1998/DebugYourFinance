import { Component } from 'react';
import PropTypes from 'prop-types';
import { logger } from '../../utils/logger';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Only log errors in development
    if (import.meta.env.DEV) {
      logger.error('Error caught by boundary:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 px-4">
          <div className="text-center p-8 max-w-md">
            <div className="mb-6">
              <div className="text-6xl mb-4">⚠️</div>
              <h1 className="text-4xl font-bold text-red-600 dark:text-red-400 mb-2">Oops!</h1>
              <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-4">
                Something went wrong
              </h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Don't worry, your data is safe. Please refresh the page to continue.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-accent hover:bg-accent-600 text-white rounded-lg font-semibold transition-colors shadow-lg"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
