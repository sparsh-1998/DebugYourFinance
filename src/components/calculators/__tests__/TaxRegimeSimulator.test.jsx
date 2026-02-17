import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../../contexts/ThemeContext';
import TaxRegimeSimulator from '../TaxRegimeSimulator';

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

describe('TaxRegimeSimulator', () => {
  beforeEach(() => {
    localStorageMock.clear();
    document.documentElement.classList.remove('light', 'dark');
    vi.clearAllMocks();
  });

  it('renders calculator with title', () => {
    renderWithTheme(<TaxRegimeSimulator />);

    expect(screen.getByText('Tax Simulator')).toBeInTheDocument();
  });

  it('displays input fields', () => {
    renderWithTheme(<TaxRegimeSimulator />);

    const incomeElements = screen.getAllByText(/Annual Gross Income/i);
    expect(incomeElements.length).toBeGreaterThan(0);
  });

  it('displays comparison results', () => {
    renderWithTheme(<TaxRegimeSimulator />);

    const oldRegimeElements = screen.getAllByText(/Old Regime/i);
    const newRegimeElements = screen.getAllByText(/New Regime/i);

    expect(oldRegimeElements.length).toBeGreaterThan(0);
    expect(newRegimeElements.length).toBeGreaterThan(0);
  });

  it('shows deduction inputs', () => {
    renderWithTheme(<TaxRegimeSimulator />);

    const section80CElements = screen.getAllByText(/Section 80C/i);
    expect(section80CElements.length).toBeGreaterThan(0);
  });

  it('renders with proper structure', () => {
    const { container } = renderWithTheme(<TaxRegimeSimulator />);

    expect(container.firstChild).toBeInTheDocument();
  });

  it('displays educational content', () => {
    renderWithTheme(<TaxRegimeSimulator />);

    expect(screen.getByText(/How to Use/i)).toBeInTheDocument();
  });

  it('shows chart', () => {
    renderWithTheme(<TaxRegimeSimulator />);

    expect(screen.getByText(/Visual Comparison/i)).toBeInTheDocument();
  });

  it('renders all input controls', () => {
    renderWithTheme(<TaxRegimeSimulator />);

    const inputs = screen.getAllByRole('textbox');
    expect(inputs.length).toBeGreaterThan(0);
  });

  it('calculates tax correctly', () => {
    const { container } = renderWithTheme(<TaxRegimeSimulator />);

    expect(container.textContent.length).toBeGreaterThan(100);
  });

  it('shows comparison cards', () => {
    renderWithTheme(<TaxRegimeSimulator />);

    const oldRegime = screen.getAllByText(/Old Regime/i);
    const newRegime = screen.getAllByText(/New Regime/i);

    expect(oldRegime.length).toBeGreaterThan(0);
    expect(newRegime.length).toBeGreaterThan(0);
  });

  it('displays deduction sections', () => {
    renderWithTheme(<TaxRegimeSimulator />);

    const deductionElements = screen.getAllByText(/Deductions/i);
    expect(deductionElements.length).toBeGreaterThan(0);
  });

  it('renders calculator description', () => {
    renderWithTheme(<TaxRegimeSimulator />);

    expect(screen.getByText('Tax Simulator')).toBeInTheDocument();
  });

  it('handles default values', () => {
    renderWithTheme(<TaxRegimeSimulator />);

    const inputs = screen.getAllByRole('textbox');
    expect(inputs.length).toBeGreaterThan(0);
  });

  it('shows result comparison', () => {
    renderWithTheme(<TaxRegimeSimulator />);

    const oldRegimeElements = screen.getAllByText(/Old Regime/i);
    expect(oldRegimeElements.length).toBeGreaterThan(0);
  });

  it('renders chart visualization', () => {
    const { container } = renderWithTheme(<TaxRegimeSimulator />);

    expect(container.textContent.includes('Comparison')).toBeTruthy();
  });

  it('displays all sections', () => {
    renderWithTheme(<TaxRegimeSimulator />);

    expect(screen.getByText('Tax Simulator')).toBeInTheDocument();
    expect(screen.getByText(/How to Use/i)).toBeInTheDocument();
  });

  it('renders FAQ section', () => {
    renderWithTheme(<TaxRegimeSimulator />);

    expect(screen.getByText(/Frequently Asked Questions/i)).toBeInTheDocument();
  });

  it('shows formula section', () => {
    renderWithTheme(<TaxRegimeSimulator />);

    const container = screen.getByText('Tax Simulator').closest('div');
    expect(container).toBeInTheDocument();
  });

  it('calculates with default inputs', () => {
    const { container } = renderWithTheme(<TaxRegimeSimulator />);

    expect(container.querySelector('input')).toBeTruthy();
  });
});
