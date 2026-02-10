import { useState, useEffect } from 'react';
import { formatIndianNumber } from '../utils/calculations';

/**
 * Custom hook to handle formatted number inputs with validation
 * @param {number} value - Current value
 * @param {function} setValue - Setter function
 * @param {object} options - Validation options { min, max, allowDecimals, required }
 * Returns formatted value, handler, and validation state
 */
export function useFormattedNumber(value, setValue, options = {}) {
  const { min, max, allowDecimals = true, required = false } = options;
  const [error, setError] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Update input value when external value changes (but not during editing)
  useEffect(() => {
    if (!isFocused) {
      setInputValue(value === 0 ? '' : String(value));
    }
  }, [value, isFocused]);

  // Show formatted value when not focused, raw input when focused
  const displayValue = isFocused ? inputValue : formatIndianNumber(value);

  // Validate value whenever it changes
  useEffect(() => {
    let errorMsg = '';

    if (required && value === 0) {
      errorMsg = 'This field is required';
    } else if (min !== undefined && value < min && value !== 0) {
      errorMsg = `Minimum value is ${formatIndianNumber(min)}`;
    } else if (max !== undefined && value > max) {
      errorMsg = `Maximum value is ${formatIndianNumber(max)}`;
    }

    setError(errorMsg);
  }, [value, min, max, required]);

  const handleChange = (e) => {
    const input = e.target.value;
    setInputValue(input);

    // Remove all commas and non-numeric characters except decimal point
    let numericValue = input.replace(/[^0-9.]/g, '');

    // If decimals not allowed, remove decimal point
    if (!allowDecimals) {
      numericValue = numericValue.replace('.', '');
    }

    // Prevent multiple decimal points
    const parts = numericValue.split('.');
    if (parts.length > 2) {
      numericValue = parts[0] + '.' + parts.slice(1).join('');
    }

    // Allow empty input - only convert to number if not empty
    if (numericValue === '') {
      setValue(0);
      return;
    }

    let parsedValue = Number(numericValue);

    // Only apply max constraint during typing (not min, to allow partial entry)
    if (max !== undefined && parsedValue > max) {
      parsedValue = max;
      setInputValue(String(parsedValue));
    }

    setValue(parsedValue);
  };

  const handleFocus = () => {
    setIsFocused(true);
    setInputValue(value === 0 ? '' : String(value));
  };

  const handleBlur = () => {
    setIsFocused(false);

    // Apply min constraint on blur
    if (min !== undefined && value < min && value !== 0) {
      setValue(min);
    }
  };

  return {
    formattedValue: displayValue,
    handleChange,
    handleFocus,
    handleBlur,
    error,
    isValid: !error
  };
}
