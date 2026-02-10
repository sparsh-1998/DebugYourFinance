import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFormattedNumber } from './useFormattedNumber';

describe('useFormattedNumber', () => {
  let setValue;

  beforeEach(() => {
    setValue = vi.fn();
  });

  it('should initialize with formatted value', () => {
    const { result } = renderHook(() =>
      useFormattedNumber(10000, setValue, {})
    );

    expect(result.current.formattedValue).toBe('10,000');
  });

  it('should handle zero value', () => {
    const { result } = renderHook(() =>
      useFormattedNumber(0, setValue, {})
    );

    expect(result.current.formattedValue).toBe('0');
  });

  it('should show raw number when focused', () => {
    const { result } = renderHook(() =>
      useFormattedNumber(10000, setValue, {})
    );

    act(() => {
      result.current.handleFocus();
    });

    expect(result.current.formattedValue).toBe('10000');
  });

  it('should show formatted number when blurred', () => {
    const { result } = renderHook(() =>
      useFormattedNumber(10000, setValue, {})
    );

    act(() => {
      result.current.handleFocus();
      result.current.handleBlur();
    });

    expect(result.current.formattedValue).toBe('10,000');
  });

  it('should handle numeric input correctly', () => {
    const { result } = renderHook(() =>
      useFormattedNumber(0, setValue, {})
    );

    act(() => {
      result.current.handleChange({ target: { value: '12345' } });
    });

    expect(setValue).toHaveBeenCalledWith(12345);
  });

  it('should remove non-numeric characters', () => {
    const { result } = renderHook(() =>
      useFormattedNumber(0, setValue, {})
    );

    act(() => {
      result.current.handleChange({ target: { value: 'abc123xyz' } });
    });

    expect(setValue).toHaveBeenCalledWith(123);
  });

  it('should allow decimals when enabled', () => {
    const { result } = renderHook(() =>
      useFormattedNumber(0, setValue, { allowDecimals: true })
    );

    act(() => {
      result.current.handleChange({ target: { value: '123.45' } });
    });

    expect(setValue).toHaveBeenCalledWith(123.45);
  });

  it('should not allow decimals when disabled', () => {
    const { result } = renderHook(() =>
      useFormattedNumber(0, setValue, { allowDecimals: false })
    );

    act(() => {
      result.current.handleChange({ target: { value: '123.45' } });
    });

    expect(setValue).toHaveBeenCalledWith(12345);
  });

  it('should prevent multiple decimal points', () => {
    const { result } = renderHook(() =>
      useFormattedNumber(0, setValue, { allowDecimals: true })
    );

    act(() => {
      result.current.handleChange({ target: { value: '12.34.56' } });
    });

    // Should keep only first decimal point
    expect(setValue).toHaveBeenCalledWith(12.3456);
  });

  it('should enforce max constraint during typing', () => {
    const { result } = renderHook(() =>
      useFormattedNumber(0, setValue, { max: 1000 })
    );

    act(() => {
      result.current.handleChange({ target: { value: '5000' } });
    });

    expect(setValue).toHaveBeenCalledWith(1000);
  });

  it('should enforce min constraint on blur', () => {
    const { result } = renderHook(() =>
      useFormattedNumber(50, setValue, { min: 100 })
    );

    act(() => {
      result.current.handleBlur();
    });

    expect(setValue).toHaveBeenCalledWith(100);
  });

  it('should not enforce min constraint on zero', () => {
    const { result } = renderHook(() =>
      useFormattedNumber(0, setValue, { min: 100 })
    );

    act(() => {
      result.current.handleBlur();
    });

    // Should not enforce min on zero (allows clearing)
    expect(setValue).not.toHaveBeenCalledWith(100);
  });

  it('should show error for required field with zero value', () => {
    const { result } = renderHook(() =>
      useFormattedNumber(0, setValue, { required: true })
    );

    expect(result.current.error).toBe('This field is required');
    expect(result.current.isValid).toBe(false);
  });

  it('should show error for value below min', () => {
    const { result } = renderHook(() =>
      useFormattedNumber(50, setValue, { min: 100 })
    );

    expect(result.current.error).toContain('Minimum value is');
    expect(result.current.isValid).toBe(false);
  });

  it('should show error for value above max', () => {
    const { result } = renderHook(() =>
      useFormattedNumber(2000, setValue, { max: 1000 })
    );

    expect(result.current.error).toContain('Maximum value is');
    expect(result.current.isValid).toBe(false);
  });

  it('should not show error for valid value', () => {
    const { result } = renderHook(() =>
      useFormattedNumber(500, setValue, { min: 100, max: 1000 })
    );

    expect(result.current.error).toBe('');
    expect(result.current.isValid).toBe(true);
  });

  it('should handle empty input by setting to zero', () => {
    const { result } = renderHook(() =>
      useFormattedNumber(100, setValue, {})
    );

    act(() => {
      result.current.handleChange({ target: { value: '' } });
    });

    expect(setValue).toHaveBeenCalledWith(0);
  });

  it('should handle Indian number format input', () => {
    const { result } = renderHook(() =>
      useFormattedNumber(0, setValue, {})
    );

    act(() => {
      result.current.handleChange({ target: { value: '1,00,000' } });
    });

    // Should strip commas and parse as 100000
    expect(setValue).toHaveBeenCalledWith(100000);
  });
});
