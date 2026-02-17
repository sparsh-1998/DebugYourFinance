import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './layouts/Layout';
import ScrollToTop from './components/layout/ScrollToTop';
import PWAInstallPrompt from './components/features/PWAInstallPrompt';
import { PageSkeleton } from './components/common';

// Lazy load pages with error handling
const HomePage = lazy(() => 
  import('./pages/HomePage').catch(() => ({
    default: () => <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4 text-center">
      <div>
        <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Failed to load page</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">Please refresh the page or check your connection.</p>
        <button onClick={() => window.location.reload()} className="px-6 py-3 bg-accent text-white rounded-lg">Refresh</button>
      </div>
    </div>
  }))
);

const ToolsPage = lazy(() => 
  import('./pages/ToolsPage').catch(() => ({
    default: () => <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4 text-center">
      <div>
        <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Failed to load tools</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">Please refresh the page or check your connection.</p>
        <button onClick={() => window.location.reload()} className="px-6 py-3 bg-accent text-white rounded-lg">Refresh</button>
      </div>
    </div>
  }))
);

const SocialPage = lazy(() => 
  import('./pages/SocialPage').catch(() => ({
    default: () => <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4 text-center">
      <div>
        <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Failed to load social page</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">Please refresh the page or check your connection.</p>
        <button onClick={() => window.location.reload()} className="px-6 py-3 bg-accent text-white rounded-lg">Refresh</button>
      </div>
    </div>
  }))
);

const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<PageSkeleton />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="tools" element={<ToolsPage />} />
              <Route path="tools/:toolId" element={<ToolsPage />} />
              <Route path="social" element={<SocialPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
        <PWAInstallPrompt />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
