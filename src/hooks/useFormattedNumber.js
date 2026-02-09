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

  const formattedValue = formatIndianNumber(value);

  // Validate value whenever it changes
  useEffect(() => {
    let errorMsg = '';

    if (required && value === 0) {
      errorMsg = 'This field is required';
    } else if (min !== undefined && value < min) {
      errorMsg = `Minimum value is ${formatIndianNumber(min)}`;
    } else if (max !== undefined && value > max) {
      errorMsg = `Maximum value is ${formatIndianNumber(max)}`;
    }

    setError(errorMsg);
  }, [value, min, max, required]);

  const handleChange = (e) => {
    const input = e.target.value;

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

    // Convert to number, defaulting to 0 if empty or invalid
    let parsedValue = numericValue === '' ? 0 : Number(numericValue);

    // Apply constraints
    if (min !== undefined && parsedValue < min) {
      parsedValue = min;
    }
    if (max !== undefined && parsedValue > max) {
      parsedValue = max;
    }

    setValue(parsedValue);
  };

  return { formattedValue, handleChange, error, isValid: !error };
}
