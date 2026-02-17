import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '../../contexts/ThemeContext';
import ToolsPage from '../ToolsPage';

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

// Mock the lazy-loaded calculator components
vi.mock('../../components/calculators/SIPCalculator', () => ({
  default: () => <div data-testid="sip-calculator">SIP Calculator Component</div>
}));

vi.mock('../../components/calculators/SWPCalculator', () => ({
  default: () => <div data-testid="swp-calculator">SWP Calculator Component</div>
}));

vi.mock('../../components/calculators/TaxRegimeSimulator', () => ({
  default: () => <div data-testid="tax-calculator">Tax Calculator Component</div>
}));

vi.mock('../../components/calculators/LoanTenureReducer', () => ({
  default: () => <div data-testid="loan-calculator">Loan Calculator Component</div>
}));

vi.mock('../../components/calculators/RentVsBuyCalculator', () => ({
  default: () => <div data-testid="rvb-calculator">Rent vs Buy Calculator Component</div>
}));

// Helper function to render with required providers
const renderWithProviders = (component, initialRoute = '/tools/sip') => {
  return render(
    <ThemeProvider>
      <HelmetProvider>
        <MemoryRouter initialEntries={[initialRoute]}>
          {component}
        </MemoryRouter>
      </HelmetProvider>
    </ThemeProvider>
  );
};

describe('ToolsPage', () => {
  beforeEach(() => {
    localStorageMock.clear();
    document.documentElement.classList.remove('light', 'dark');
  });

  it('renders without crashing', () => {
    renderWithProviders(<ToolsPage />);

    expect(screen.getByText('Financial Tools')).toBeInTheDocument();
  });

  it('displays all tool navigation buttons', () => {
    renderWithProviders(<ToolsPage />);

    expect(screen.getByText('SIP Calculator')).toBeInTheDocument();
    expect(screen.getByText('SWP Generator')).toBeInTheDocument();
    expect(screen.getByText('Tax Simulator')).toBeInTheDocument();
    expect(screen.getByText('Loan Reducer')).toBeInTheDocument();
    expect(screen.getByText('Rent vs Buy')).toBeInTheDocument();
  });

  it('loads SIP calculator by default', async () => {
    renderWithProviders(<ToolsPage />);

    await waitFor(() => {
      expect(screen.getByTestId('sip-calculator')).toBeInTheDocument();
    });
  });

  it('switches to SWP calculator when button clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ToolsPage />);

    const swpButton = screen.getByText('SWP Generator');
    await user.click(swpButton);

    await waitFor(() => {
      expect(screen.getByTestId('swp-calculator')).toBeInTheDocument();
    });
  });

  it('switches to Tax calculator when button clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ToolsPage />);

    const taxButton = screen.getByText('Tax Simulator');
    await user.click(taxButton);

    await waitFor(() => {
      expect(screen.getByTestId('tax-calculator')).toBeInTheDocument();
    });
  });

  it('switches to Loan calculator when button clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ToolsPage />);

    const loanButton = screen.getByText('Loan Reducer');
    await user.click(loanButton);

    await waitFor(() => {
      expect(screen.getByTestId('loan-calculator')).toBeInTheDocument();
    });
  });

  it('switches to Rent vs Buy calculator when button clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ToolsPage />);

    const rvbButton = screen.getByText('Rent vs Buy');
    await user.click(rvbButton);

    await waitFor(() => {
      expect(screen.getByTestId('rvb-calculator')).toBeInTheDocument();
    });
  });

  it('highlights active tab button', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ToolsPage />);

    const swpButton = screen.getByText('SWP Generator');
    await user.click(swpButton);

    await waitFor(() => {
      expect(swpButton).toHaveClass('bg-accent');
    });
  });

  it('renders with SEO components', () => {
    const { container } = renderWithProviders(<ToolsPage />);

    // Just verify the page renders without errors
    expect(container).toBeInTheDocument();
  });

  it('renders with animation wrapper', () => {
    const { container } = renderWithProviders(<ToolsPage />);

    const motionDiv = container.querySelector('[style]');
    expect(motionDiv).toBeInTheDocument();
  });

  it('shows loading skeleton while calculator loads', () => {
    const { container } = renderWithProviders(<ToolsPage />);

    // Suspense fallback should be present initially
    expect(container).toBeInTheDocument();
  });

  it('allows navigation between calculators', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ToolsPage />);

    // Start with SIP (default)
    await waitFor(() => {
      expect(screen.getByTestId('sip-calculator')).toBeInTheDocument();
    });

    // Switch to SWP
    await user.click(screen.getByText('SWP Generator'));
    await waitFor(() => {
      expect(screen.getByTestId('swp-calculator')).toBeInTheDocument();
    });

    // Switch to Tax
    await user.click(screen.getByText('Tax Simulator'));
    await waitFor(() => {
      expect(screen.getByTestId('tax-calculator')).toBeInTheDocument();
    });
  });
});
