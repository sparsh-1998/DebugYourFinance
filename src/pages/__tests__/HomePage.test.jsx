import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '../../contexts/ThemeContext';
import HomePage from '../HomePage';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = value; },
    clear: () => { store = {}; },
    removeItem: (key) => { delete store[key]; }
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Helper function to render with required providers
const renderWithProviders = (component) => {
  return render(
    <ThemeProvider>
      <HelmetProvider>
        <BrowserRouter>
          {component}
        </BrowserRouter>
      </HelmetProvider>
    </ThemeProvider>
  );
};

describe('HomePage', () => {
  beforeEach(() => {
    localStorageMock.clear();
    document.documentElement.classList.remove('light', 'dark');
  });

  it('renders without crashing', async () => {
    renderWithProviders(<HomePage />);

    await waitFor(() => {
      expect(document.title).toBe('DebugYourFinance - Master Your Money. Zero Friction.');
    });
  });

  it('includes SEO meta tags', async () => {
    renderWithProviders(<HomePage />);

    await waitFor(() => {
      const metaDescription = document.querySelector('meta[name="description"]');
      expect(metaDescription).toBeInTheDocument();
      expect(metaDescription?.getAttribute('content')).toContain('Privacy-first financial tools');
    });
  });

  it('includes canonical link', async () => {
    renderWithProviders(<HomePage />);

    await waitFor(() => {
      const canonicalLink = document.querySelector('link[rel="canonical"]');
      expect(canonicalLink).toBeInTheDocument();
      expect(canonicalLink?.getAttribute('href')).toBe('https://debugyourfinance.com/');
    });
  });

  it('includes Open Graph meta tags', async () => {
    renderWithProviders(<HomePage />);

    await waitFor(() => {
      const ogTitle = document.querySelector('meta[property="og:title"]');
      const ogDescription = document.querySelector('meta[property="og:description"]');
      const ogUrl = document.querySelector('meta[property="og:url"]');

      expect(ogTitle).toBeInTheDocument();
      expect(ogDescription).toBeInTheDocument();
      expect(ogUrl).toBeInTheDocument();
    });
  });

  it('includes Twitter meta tags', async () => {
    renderWithProviders(<HomePage />);

    await waitFor(() => {
      const twitterTitle = document.querySelector('meta[property="twitter:title"]');
      const twitterDescription = document.querySelector('meta[property="twitter:description"]');
      const twitterUrl = document.querySelector('meta[property="twitter:url"]');

      expect(twitterTitle).toBeInTheDocument();
      expect(twitterDescription).toBeInTheDocument();
      expect(twitterUrl).toBeInTheDocument();
    });
  });

  it('renders with animation wrapper', () => {
    const { container } = renderWithProviders(<HomePage />);

    // Check for motion.div wrapper
    const motionDiv = container.querySelector('[style]');
    expect(motionDiv).toBeInTheDocument();
  });

  it('sets correct page title', async () => {
    renderWithProviders(<HomePage />);

    await waitFor(() => {
      expect(document.title).toContain('DebugYourFinance');
      expect(document.title).toContain('Master Your Money');
    });
  });

  it('renders main content sections', () => {
    const { container } = renderWithProviders(<HomePage />);

    // Check that the main container exists
    expect(container.firstChild).toBeInTheDocument();
  });
});
