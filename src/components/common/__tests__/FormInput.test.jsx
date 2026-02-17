import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormInput from '../FormInput';

describe('FormInput', () => {
  it('renders with label and initial value', () => {
    const mockSetValue = vi.fn();
    render(
      <FormInput
        label="Monthly Investment"
        value={10000}
        setValue={mockSetValue}
      />
    );

    expect(screen.getByText('Monthly Investment')).toBeInTheDocument();
    expect(screen.getByDisplayValue('10,000')).toBeInTheDocument();
    expect(screen.getByText('₹10,000')).toBeInTheDocument();
  });

  it('calls setValue when input changes', async () => {
    const mockSetValue = vi.fn();
    const user = userEvent.setup();

    render(
      <FormInput
        label="Amount"
        value={0}
        setValue={mockSetValue}
      />
    );

    const input = screen.getByRole('textbox');
    await user.clear(input);
    await user.type(input, '5000');

    expect(mockSetValue).toHaveBeenCalled();
  });

  it('shows error message when validation fails', () => {
    const mockSetValue = vi.fn();
    render(
      <FormInput
        label="Amount"
        value={50}
        setValue={mockSetValue}
        validation={{ min: 100, required: true }}
      />
    );

    expect(screen.getByText(/Minimum value is/)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('does not show error for valid value', () => {
    const mockSetValue = vi.fn();
    render(
      <FormInput
        label="Amount"
        value={500}
        setValue={mockSetValue}
        validation={{ min: 100, max: 1000 }}
      />
    );

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'false');
  });

  it('applies custom className', () => {
    const mockSetValue = vi.fn();
    const { container } = render(
      <FormInput
        label="Amount"
        value={100}
        setValue={mockSetValue}
        className="custom-class"
      />
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('uses placeholder when provided', () => {
    const mockSetValue = vi.fn();
    render(
      <FormInput
        label="Amount"
        value={0}
        setValue={mockSetValue}
        placeholder="Enter amount"
      />
    );

    expect(screen.getByPlaceholderText('Enter amount')).toBeInTheDocument();
  });
});
