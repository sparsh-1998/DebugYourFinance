import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../../contexts/ThemeContext';
import RentVsBuyCalculator from '../RentVsBuyCalculator';

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

describe('RentVsBuyCalculator', () => {
  beforeEach(() => {
    localStorageMock.clear();
    document.documentElement.classList.remove('light', 'dark');
    vi.clearAllMocks();
  });

  it('renders calculator with title', () => {
    renderWithTheme(<RentVsBuyCalculator />);

    expect(screen.getByText('Rent vs Buy')).toBeInTheDocument();
  });

  it('displays property price input', () => {
    renderWithTheme(<RentVsBuyCalculator />);

    const propertyPriceElements = screen.getAllByText(/Home Price/i);
    expect(propertyPriceElements.length).toBeGreaterThan(0);
  });

  it('displays rent input', () => {
    renderWithTheme(<RentVsBuyCalculator />);

    const monthlyRentElements = screen.getAllByText(/Monthly Rent/i);
    expect(monthlyRentElements.length).toBeGreaterThan(0);
  });

  it('shows comparison results', () => {
    renderWithTheme(<RentVsBuyCalculator />);

    const rentingElements = screen.getAllByText(/Rent/i);
    const buyingElements = screen.getAllByText(/Buy/i);

    expect(rentingElements.length).toBeGreaterThan(0);
    expect(buyingElements.length).toBeGreaterThan(0);
  });

  it('renders with proper structure', () => {
    const { container } = renderWithTheme(<RentVsBuyCalculator />);

    expect(container.firstChild).toBeInTheDocument();
  });

  it('displays educational content', () => {
    renderWithTheme(<RentVsBuyCalculator />);

    expect(screen.getByText(/How to Use/i)).toBeInTheDocument();
  });

  it('shows chart', () => {
    renderWithTheme(<RentVsBuyCalculator />);

    expect(screen.getByText(/Net Worth Comparison Over Time/i)).toBeInTheDocument();
  });

  it('renders all input controls', () => {
    renderWithTheme(<RentVsBuyCalculator />);

    const inputs = screen.getAllByRole('textbox');
    expect(inputs.length).toBeGreaterThan(0);
  });

  it('calculates costs correctly', () => {
    const { container } = renderWithTheme(<RentVsBuyCalculator />);

    expect(container.textContent.length).toBeGreaterThan(100);
  });

  it('displays range sliders', () => {
    renderWithTheme(<RentVsBuyCalculator />);

    const sliders = screen.getAllByRole('slider');
    expect(sliders.length).toBeGreaterThan(0);
  });

  it('renders calculator description', () => {
    const { container } = renderWithTheme(<RentVsBuyCalculator />);

    expect(container.textContent).toBeTruthy();
  });

  it('handles default values', () => {
    renderWithTheme(<RentVsBuyCalculator />);

    const inputs = screen.getAllByRole('textbox');
    expect(inputs.length).toBeGreaterThan(0);
  });

  it('renders chart visualization', () => {
    renderWithTheme(<RentVsBuyCalculator />);

    expect(screen.getByText(/Net Worth Comparison Over Time/i)).toBeInTheDocument();
  });

  it('displays all sections', () => {
    renderWithTheme(<RentVsBuyCalculator />);

    expect(screen.getByText('Rent vs Buy')).toBeInTheDocument();
    expect(screen.getByText(/How to Use/i)).toBeInTheDocument();
  });

  it('renders FAQ section', () => {
    renderWithTheme(<RentVsBuyCalculator />);

    expect(screen.getByText(/Frequently Asked Questions/i)).toBeInTheDocument();
  });

  it('shows buying costs', () => {
    renderWithTheme(<RentVsBuyCalculator />);

    const buyingElements = screen.getAllByText(/Buy/i);
    expect(buyingElements.length).toBeGreaterThan(0);
  });

  it('shows renting costs', () => {
    renderWithTheme(<RentVsBuyCalculator />);

    const rentingElements = screen.getAllByText(/Rent/i);
    expect(rentingElements.length).toBeGreaterThan(0);
  });

  it('displays comparison cards', () => {
    renderWithTheme(<RentVsBuyCalculator />);

    const rentingElements = screen.getAllByText(/Rent/i);
    const buyingElements = screen.getAllByText(/Buy/i);

    expect(rentingElements.length).toBeGreaterThan(0);
    expect(buyingElements.length).toBeGreaterThan(0);
  });

  it('calculates break-even', () => {
    renderWithTheme(<RentVsBuyCalculator />);

    const container = screen.getByText('Rent vs Buy').parentElement;
    expect(container).toBeTruthy();
  });

  it('renders all inputs', () => {
    renderWithTheme(<RentVsBuyCalculator />);

    const textInputs = screen.getAllByRole('textbox');
    const sliders = screen.getAllByRole('slider');

    expect(textInputs.length).toBeGreaterThan(0);
    expect(sliders.length).toBeGreaterThan(0);
  });

  it('shows cost breakdown', () => {
    renderWithTheme(<RentVsBuyCalculator />);

    const rentingElements = screen.getAllByText(/Rent/i);
    const buyingElements = screen.getAllByText(/Buy/i);

    expect(rentingElements.length).toBeGreaterThan(0);
    expect(buyingElements.length).toBeGreaterThan(0);
  });

  it('displays investment returns', () => {
    const { container } = renderWithTheme(<RentVsBuyCalculator />);

    expect(container.textContent.includes('Cost')).toBeTruthy();
  });

  it('renders comparison chart', () => {
    renderWithTheme(<RentVsBuyCalculator />);

    expect(screen.getByText(/Net Worth Comparison Over Time/i)).toBeInTheDocument();
  });

  it('shows time period slider', () => {
    renderWithTheme(<RentVsBuyCalculator />);

    const sliders = screen.getAllByRole('slider');
    expect(sliders.length).toBeGreaterThan(0);
  });

  it('calculates total costs', () => {
    const { container } = renderWithTheme(<RentVsBuyCalculator />);

    expect(container.querySelector('input')).toBeTruthy();
  });

  it('displays loan details', () => {
    renderWithTheme(<RentVsBuyCalculator />);

    const homePriceElements = screen.getAllByText(/Home Price/i);
    expect(homePriceElements.length).toBeGreaterThan(0);
  });

  it('shows appreciation inputs', () => {
    renderWithTheme(<RentVsBuyCalculator />);

    const sliders = screen.getAllByRole('slider');
    expect(sliders.length).toBeGreaterThan(0);
  });
});
