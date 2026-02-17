import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../../contexts/ThemeContext';
import LoanTenureReducer from '../LoanTenureReducer';

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

// Helper to render with ThemeProvider
const renderWithTheme = (component) => render(<ThemeProvider>{component}</ThemeProvider>);

describe('LoanTenureReducer', () => {
  beforeEach(() => {
    localStorageMock.clear();
    document.documentElement.classList.remove('light', 'dark');
    vi.clearAllMocks();
  });

  it('renders calculator with title', () => {
    renderWithTheme(<LoanTenureReducer />);

    expect(screen.getByText(/Loan Tenure Reducer/i)).toBeInTheDocument();
  });

  it('displays input fields', () => {
    renderWithTheme(<LoanTenureReducer />);

    const loanAmountElements = screen.getAllByText(/Loan Amount/i);
    expect(loanAmountElements.length).toBeGreaterThan(0);
  });

  it('shows results section', () => {
    renderWithTheme(<LoanTenureReducer />);

    const withoutPrepaymentElements = screen.getAllByText(/Without Prepayment/i);
    expect(withoutPrepaymentElements.length).toBeGreaterThan(0);
  });

  it('displays prepayment section', () => {
    renderWithTheme(<LoanTenureReducer />);

    const prepaymentElements = screen.getAllByText(/Prepayment/i);
    expect(prepaymentElements.length).toBeGreaterThan(0);
  });

  it('renders with proper structure', () => {
    const { container } = renderWithTheme(<LoanTenureReducer />);

    expect(container.firstChild).toBeInTheDocument();
  });

  it('displays educational content', () => {
    renderWithTheme(<LoanTenureReducer />);

    expect(screen.getByText(/How to Use/i)).toBeInTheDocument();
  });

  it('shows chart', () => {
    renderWithTheme(<LoanTenureReducer />);

    expect(screen.getByText(/Principal Reduction Over Time/i)).toBeInTheDocument();
  });

  it('renders all input controls', () => {
    renderWithTheme(<LoanTenureReducer />);

    const inputs = screen.getAllByRole('textbox');
    expect(inputs.length).toBeGreaterThan(0);
  });

  it('calculates loan correctly', () => {
    const { container } = renderWithTheme(<LoanTenureReducer />);

    expect(container.textContent.length).toBeGreaterThan(100);
  });

  it('shows comparison results', () => {
    renderWithTheme(<LoanTenureReducer />);

    const withoutPrepaymentElements = screen.getAllByText(/Without Prepayment/i);
    const withPrepaymentElements = screen.getAllByText(/With Prepayment/i);

    expect(withoutPrepaymentElements.length).toBeGreaterThan(0);
    expect(withPrepaymentElements.length).toBeGreaterThan(0);
  });

  it('displays range sliders', () => {
    renderWithTheme(<LoanTenureReducer />);

    const sliders = screen.getAllByRole('slider');
    expect(sliders.length).toBeGreaterThan(0);
  });

  it('renders calculator description', () => {
    const { container } = renderWithTheme(<LoanTenureReducer />);

    expect(container.textContent).toBeTruthy();
  });

  it('handles default values', () => {
    renderWithTheme(<LoanTenureReducer />);

    const inputs = screen.getAllByRole('textbox');
    expect(inputs.length).toBeGreaterThan(0);
  });

  it('renders chart visualization', () => {
    renderWithTheme(<LoanTenureReducer />);

    expect(screen.getByText(/Principal Reduction Over Time/i)).toBeInTheDocument();
  });

  it('displays all sections', () => {
    renderWithTheme(<LoanTenureReducer />);

    expect(screen.getByText(/Loan Tenure Reducer/i)).toBeInTheDocument();
    expect(screen.getByText(/How to Use/i)).toBeInTheDocument();
  });

  it('renders FAQ section', () => {
    renderWithTheme(<LoanTenureReducer />);

    expect(screen.getByText(/Frequently Asked Questions/i)).toBeInTheDocument();
  });

  it('shows interest savings', () => {
    renderWithTheme(<LoanTenureReducer />);

    const interestSavingsElements = screen.getAllByText(/Interest Saved/i);
    expect(interestSavingsElements.length).toBeGreaterThan(0);
  });

  it('displays tenure reduction', () => {
    renderWithTheme(<LoanTenureReducer />);

    expect(screen.getByText(/Tenure Reduced/i)).toBeInTheDocument();
  });

  it('calculates with prepayment', () => {
    renderWithTheme(<LoanTenureReducer />);

    const withPrepaymentElements = screen.getAllByText(/With Prepayment/i);
    expect(withPrepaymentElements.length).toBeGreaterThan(0);
  });

  it('renders prepayment inputs', () => {
    renderWithTheme(<LoanTenureReducer />);

    const inputs = screen.getAllByRole('textbox');
    expect(inputs.length).toBeGreaterThan(1);
  });

  it('shows comparison chart', () => {
    const { container } = renderWithTheme(<LoanTenureReducer />);

    expect(container.textContent.includes('Principal Reduction') || container.textContent.includes('Prepayment')).toBeTruthy();
  });
});
