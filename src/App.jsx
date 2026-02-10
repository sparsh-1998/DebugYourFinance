import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './layouts/Layout';
import ScrollToTop from './components/ScrollToTop';

// Lazy load pages for code splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const ToolsPage = lazy(() => import('./pages/ToolsPage'));
const SocialPage = lazy(() => import('./pages/SocialPage'));

// Loading fallback component
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="tools" element={<ToolsPage />} />
              <Route path="tools/:toolId" element={<ToolsPage />} />
              <Route path="social" element={<SocialPage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
