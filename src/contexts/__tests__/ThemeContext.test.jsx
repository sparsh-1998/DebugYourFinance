import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, useTheme } from '../ThemeContext';

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

// Test component that uses the theme context
function TestComponent() {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <div>
      <div data-testid="current-theme">{theme}</div>
      <div data-testid="is-dark">{isDark ? 'true' : 'false'}</div>
      <button onClick={toggleTheme} data-testid="toggle-button">
        Toggle Theme
      </button>
    </div>
  );
}

describe('ThemeContext', () => {
  beforeEach(() => {
    localStorageMock.clear();
    // Reset document classes
    document.documentElement.classList.remove('light', 'dark');
  });


  it('provides default light theme', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
    expect(screen.getByTestId('is-dark')).toHaveTextContent('false');
  });

  it('toggles theme from light to dark', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const toggleButton = screen.getByTestId('toggle-button');
    await user.click(toggleButton);

    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
    expect(screen.getByTestId('is-dark')).toHaveTextContent('true');
  });

  it('toggles theme from dark to light', async () => {
    const user = userEvent.setup();
    localStorageMock.setItem('theme', JSON.stringify('dark'));

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');

    const toggleButton = screen.getByTestId('toggle-button');
    await user.click(toggleButton);

    expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
    expect(screen.getByTestId('is-dark')).toHaveTextContent('false');
  });

  it('persists theme to localStorage', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const toggleButton = screen.getByTestId('toggle-button');
    await user.click(toggleButton);

    await waitFor(() => {
      expect(localStorageMock.getItem('theme')).toBe(JSON.stringify('dark'));
    });
  });

  it('loads saved theme from localStorage', () => {
    localStorageMock.setItem('theme', JSON.stringify('dark'));

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
  });

  it('applies theme class to document root', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    // Should apply light class initially
    expect(document.documentElement.classList.contains('light')).toBe(true);

    const toggleButton = screen.getByTestId('toggle-button');
    await user.click(toggleButton);

    // Should apply dark class after toggle
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.documentElement.classList.contains('light')).toBe(false);
  });

  it('removes old theme class when switching', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(document.documentElement.classList.contains('light')).toBe(true);

    const toggleButton = screen.getByTestId('toggle-button');
    await user.click(toggleButton);

    // Only dark class should be present
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.documentElement.classList.contains('light')).toBe(false);
  });

  it('provides isDark boolean correctly', () => {
    localStorageMock.setItem('theme', JSON.stringify('dark'));

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('is-dark')).toHaveTextContent('true');
  });

  it('throws error when useTheme is used outside ThemeProvider', () => {
    // Suppress console.error for this test
    const originalError = console.error;
    console.error = vi.fn();

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useTheme must be used within a ThemeProvider');

    console.error = originalError;
  });

  it('renders children correctly', () => {
    render(
      <ThemeProvider>
        <div data-testid="child">Child Content</div>
      </ThemeProvider>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByTestId('child')).toHaveTextContent('Child Content');
  });

  it('updates theme state when setTheme is called directly', () => {
    function DirectSetComponent() {
      const { theme, setTheme } = useTheme();

      return (
        <div>
          <div data-testid="current-theme">{theme}</div>
          <button onClick={() => setTheme('dark')} data-testid="set-dark">
            Set Dark
          </button>
        </div>
      );
    }

    render(
      <ThemeProvider>
        <DirectSetComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('light');

    act(() => {
      screen.getByTestId('set-dark').click();
    });

    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
  });

  it('maintains theme state across multiple toggles', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const toggleButton = screen.getByTestId('toggle-button');

    // First toggle: light -> dark
    await user.click(toggleButton);
    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');

    // Second toggle: dark -> light
    await user.click(toggleButton);
    expect(screen.getByTestId('current-theme')).toHaveTextContent('light');

    // Third toggle: light -> dark
    await user.click(toggleButton);
    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
  });
});
