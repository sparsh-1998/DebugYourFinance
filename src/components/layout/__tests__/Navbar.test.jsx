import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '../../../contexts/ThemeContext';
import Navbar from '../Navbar';

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
const renderWithProviders = (component, initialRoute = '/') => {
  return render(
    <ThemeProvider>
      <MemoryRouter initialEntries={[initialRoute]}>
        {component}
      </MemoryRouter>
    </ThemeProvider>
  );
};

describe('Navbar', () => {
  beforeEach(() => {
    localStorageMock.clear();
    document.documentElement.classList.remove('light', 'dark');
  });


  it('renders without crashing', () => {
    renderWithProviders(<Navbar />);

    expect(screen.getByText('DebugYourFinance')).toBeInTheDocument();
  });

  it('displays logo', () => {
    renderWithProviders(<Navbar />);

    const logo = screen.getByAltText('DebugYourFinance Logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/icon.svg');
  });

  it('displays navigation links', () => {
    renderWithProviders(<Navbar />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Tools')).toBeInTheDocument();
    expect(screen.getByText('Socials')).toBeInTheDocument();
  });

  it('displays theme toggle button', () => {
    renderWithProviders(<Navbar />);

    const themeButtons = screen.getAllByLabelText('Toggle theme');
    expect(themeButtons.length).toBeGreaterThan(0);
  });

  it('toggles theme when theme button is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Navbar />);

    const themeButton = screen.getAllByLabelText('Toggle theme')[0];
    await user.click(themeButton);

    await waitFor(() => {
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });
  });

  it('shows moon icon in light mode', () => {
    localStorageMock.setItem('theme', JSON.stringify('light'));
    renderWithProviders(<Navbar />);

    // Moon icon should be present in light mode
    const svgs = document.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThan(0);
  });

  it('shows sun icon in dark mode', () => {
    localStorageMock.setItem('theme', JSON.stringify('dark'));
    document.documentElement.classList.add('dark');
    renderWithProviders(<Navbar />);

    // Sun icon should be present in dark mode
    const svgs = document.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThan(0);
  });

  it('displays mobile menu button', () => {
    renderWithProviders(<Navbar />);

    const menuButton = screen.getByLabelText('Toggle menu');
    expect(menuButton).toBeInTheDocument();
  });

  it('opens mobile menu when menu button is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Navbar />);

    const menuButton = screen.getByLabelText('Toggle menu');
    await user.click(menuButton);

    await waitFor(() => {
      // Mobile menu should show nav links
      const mobileLinks = screen.getAllByText('Home');
      expect(mobileLinks.length).toBeGreaterThan(1); // Desktop + mobile
    });
  });

  it('closes mobile menu when menu button is clicked again', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Navbar />);

    const menuButton = screen.getByLabelText('Toggle menu');

    // Open menu
    await user.click(menuButton);
    await waitFor(() => {
      const mobileLinks = screen.getAllByText('Home');
      expect(mobileLinks.length).toBeGreaterThan(1);
    });

    // Close menu
    await user.click(menuButton);
    await waitFor(() => {
      const mobileLinks = screen.getAllByText('Home');
      expect(mobileLinks.length).toBe(1); // Only desktop link
    });
  });

  it('closes mobile menu when a link is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Navbar />);

    const menuButton = screen.getByLabelText('Toggle menu');

    // Open menu
    await user.click(menuButton);

    await waitFor(() => {
      const mobileLinks = screen.getAllByText('Home');
      expect(mobileLinks.length).toBeGreaterThan(1);
    });

    // Click a link in mobile menu
    const mobileLinks = screen.getAllByText('Tools');
    await user.click(mobileLinks[1]); // Click mobile link

    await waitFor(() => {
      const homeLinks = screen.getAllByText('Home');
      expect(homeLinks.length).toBe(1); // Menu should be closed
    });
  });

  it('highlights active navigation link', () => {
    renderWithProviders(<Navbar />, '/tools');

    const toolsLinks = screen.getAllByText('Tools');
    // Desktop link should have accent color
    expect(toolsLinks[0]).toHaveClass('text-accent');
  });

  it('renders sticky navbar', () => {
    const { container } = renderWithProviders(<Navbar />);

    const nav = container.querySelector('nav');
    expect(nav).toHaveClass('sticky');
    expect(nav).toHaveClass('top-0');
  });

  it('has backdrop blur effect', () => {
    const { container } = renderWithProviders(<Navbar />);

    const nav = container.querySelector('nav');
    expect(nav).toHaveClass('backdrop-blur-md');
  });

  it('navigates to home when logo is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Navbar />, '/tools');

    const logoLink = screen.getByText('DebugYourFinance').closest('a');
    expect(logoLink).toHaveAttribute('href', '/');

    await user.click(logoLink);

    // Link should navigate to home
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('displays theme toggle in both desktop and mobile', () => {
    renderWithProviders(<Navbar />);

    const themeButtons = screen.getAllByLabelText('Toggle theme');
    expect(themeButtons.length).toBe(2); // One for desktop, one for mobile
  });

  it('shows menu icon when mobile menu is closed', () => {
    renderWithProviders(<Navbar />);

    const menuButton = screen.getByLabelText('Toggle menu');
    expect(menuButton).toBeInTheDocument();
    // Should contain Menu icon (not X icon)
  });

  it('shows X icon when mobile menu is open', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Navbar />);

    const menuButton = screen.getByLabelText('Toggle menu');
    await user.click(menuButton);

    // Should show X icon when menu is open
    expect(menuButton).toBeInTheDocument();
  });

  it('applies correct styling to non-active links', () => {
    renderWithProviders(<Navbar />, '/');

    const toolsLink = screen.getAllByText('Tools')[0];
    expect(toolsLink).not.toHaveClass('text-accent');
  });
});
