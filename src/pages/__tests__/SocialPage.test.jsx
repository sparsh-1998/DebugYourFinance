import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '../../contexts/ThemeContext';
import SocialPage from '../SocialPage';

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

// Mock InstagramSection component
vi.mock('../../components/features/InstagramSection', () => ({
  default: () => <div data-testid="instagram-section">Instagram Section</div>
}));

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

describe('SocialPage', () => {
  beforeEach(() => {
    localStorageMock.clear();
    document.documentElement.classList.remove('light', 'dark');
  });

  it('renders without crashing', () => {
    renderWithProviders(<SocialPage />);

    expect(screen.getByTestId('instagram-section')).toBeInTheDocument();
  });

  it('sets correct page title', async () => {
    renderWithProviders(<SocialPage />);

    await waitFor(() => {

    expect(document.title).toContain('DebugYourFinance on Instagram' );
    });
  });

  it('includes SEO meta tags', async () => {
    renderWithProviders(<SocialPage />);

    await waitFor(() => {
      const metaDescription = document.querySelector('meta[name="description"]');
      expect(metaDescription).toBeInTheDocument();
      expect(metaDescription?.getAttribute('content')).toContain('Follow DebugYourFinance on Instagram');
    });
  });

  it('includes canonical link', async () => {
    renderWithProviders(<SocialPage />);

    await waitFor(() => {
      const canonicalLink = document.querySelector('link[rel="canonical"]');
      expect(canonicalLink).toBeInTheDocument();
      expect(canonicalLink?.getAttribute('href')).toBe('https://debugyourfinance.com/social');
    });
  });

  it('includes Open Graph meta tags', async () => {
    renderWithProviders(<SocialPage />);

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
    renderWithProviders(<SocialPage />);

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
    const { container } = renderWithProviders(<SocialPage />);

    // Check for motion.div wrapper
    const motionDiv = container.querySelector('[style]');
    expect(motionDiv).toBeInTheDocument();
  });

  it('renders InstagramSection component', () => {
    renderWithProviders(<SocialPage />);

    expect(screen.getByTestId('instagram-section')).toBeInTheDocument();
  });

  it('has correct meta description content', async () => {
    renderWithProviders(<SocialPage />);

    await waitFor(() => {
      const metaDescription = document.querySelector('meta[name="description"]');
      expect(metaDescription?.getAttribute('content')).toContain('financial tips');
      expect(metaDescription?.getAttribute('content')).toContain('investment insights');
    });
  });
});
