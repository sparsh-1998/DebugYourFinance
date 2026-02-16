import { useId, memo } from 'react';
import PropTypes from 'prop-types';
import { useFormattedNumber } from '../../hooks/useFormattedNumber';
import { formatCurrency } from '../../utils/calculations';

/**
 * Reusable form input component with label, formatting, and validation
 */
const FormInput = memo(function FormInput({
  label,
  value,
  setValue,
  validation = {},
  placeholder = '',
  className = ''
}) {
  const id = useId();
  const errorId = `${id}-error`;
  const { formattedValue, handleChange, handleFocus, handleBlur, error } = useFormattedNumber(
    value,
    setValue,
    validation
  );

  return (
    <div className={className}>
      <label htmlFor={id} className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>
        <span className="text-lg font-semibold text-accent">{formatCurrency(value)}</span>
      </label>
      <input
        id={id}
        type="text"
        value={formattedValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 transition-colors
          bg-white dark:bg-slate-800 text-slate-900 dark:text-white
          placeholder:text-slate-400 dark:placeholder:text-slate-500 ${
          error
            ? 'border-red-500 focus:border-red-600 dark:border-red-400 dark:focus:border-red-500'
            : 'border-slate-200 dark:border-slate-700 focus:border-accent'
        }`}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
      />
      {error && (
        <p id={errorId} className="text-xs text-red-600 dark:text-red-400 mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  setValue: PropTypes.func.isRequired,
  validation: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number,
    allowDecimals: PropTypes.bool,
    required: PropTypes.bool
  }),
  placeholder: PropTypes.string,
  className: PropTypes.string
};

export default FormInput;
