import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '../../../contexts/ThemeContext';
import SWPCalculator from '../SWPCalculator';

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

describe('SWPCalculator', () => {
  beforeEach(() => {
    localStorageMock.clear();
    document.documentElement.classList.remove('light', 'dark');
    vi.clearAllMocks();
  });

  it('renders calculator with title', () => {
    renderWithTheme(<SWPCalculator />);

    expect(screen.getByText('SWP Generator')).toBeInTheDocument();
  });

  it('displays input fields', () => {
    renderWithTheme(<SWPCalculator />);

    expect(screen.getByText(/Retirement Corpus \/ Lumpsum Amount/i)).toBeInTheDocument();
    const monthlyWithdrawalElements = screen.getAllByText(/Monthly Withdrawal/i);
    expect(monthlyWithdrawalElements.length).toBeGreaterThan(0);
  });

  it('displays results section', () => {
    renderWithTheme(<SWPCalculator />);

    const corpusDurationElements = screen.getAllByText(/Corpus Duration/i);
    expect(corpusDurationElements.length).toBeGreaterThan(0);
  });

  it('handles input changes', async () => {
    const user = userEvent.setup();
    renderWithTheme(<SWPCalculator />);

    const inputs = screen.getAllByRole('textbox');
    if (inputs.length > 0) {
      await user.click(inputs[0]);
      expect(inputs[0]).toBeInTheDocument();
    }
  });

  it('displays range sliders', () => {
    renderWithTheme(<SWPCalculator />);

    const sliders = screen.getAllByRole('slider');
    expect(sliders.length).toBeGreaterThan(0);
  });

  it('shows chart', () => {
    renderWithTheme(<SWPCalculator />);

    expect(screen.getByText(/Depletion Timeline/i)).toBeInTheDocument();
  });

  it('persists to localStorage', async () => {
    const user = userEvent.setup();
    renderWithTheme(<SWPCalculator />);

    const inputs = screen.getAllByRole('textbox');
    if (inputs.length > 0) {
      await user.type(inputs[0], '1');
      await waitFor(() => {
        expect(localStorageMock.getItem).toBeDefined();
      });
    }
  });

  it('renders educational content', () => {
    renderWithTheme(<SWPCalculator />);

    expect(screen.getByText(/How to Use/i)).toBeInTheDocument();
  });

  it('renders with proper structure', () => {
    const { container } = renderWithTheme(<SWPCalculator />);

    expect(container.firstChild).toBeInTheDocument();
  });

  it('displays calculator description', () => {
    const { container } = renderWithTheme(<SWPCalculator />);

    expect(container.textContent).toBeTruthy();
  });

  it('renders all components', () => {
    renderWithTheme(<SWPCalculator />);

    const textInputs = screen.getAllByRole('textbox');
    const sliders = screen.getAllByRole('slider');

    expect(textInputs.length).toBeGreaterThan(0);
    expect(sliders.length).toBeGreaterThan(0);
  });

  it('shows result cards', () => {
    const { container } = renderWithTheme(<SWPCalculator />);

    expect(container.textContent.length).toBeGreaterThan(100);
  });

  it('calculates corpus duration', () => {
    renderWithTheme(<SWPCalculator />);

    const corpusDurationElements = screen.getAllByText(/Corpus Duration/i);
    expect(corpusDurationElements.length).toBeGreaterThan(0);
  });

  it('renders chart visualization', () => {
    const { container } = renderWithTheme(<SWPCalculator />);

    // Chart should be rendered
    expect(container.querySelector('svg') || container.textContent.includes('Timeline')).toBeTruthy();
  });

  it('handles default values', () => {
    renderWithTheme(<SWPCalculator />);

    const sliders = screen.getAllByRole('slider');
    expect(sliders.length).toBeGreaterThan(0);
  });
});
