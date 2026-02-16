import { useId, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '../../contexts/ThemeContext';
import { COLOR_ACCENT_GREEN, COLOR_DARK_TRACK, COLOR_LIGHT_TRACK } from '../../constants/colors';

/**
 * Reusable range slider component with label and value display
 */
function RangeSlider({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit = '',
  className = ''
}) {
  const id = useId();
  const { theme } = useTheme();

  // Memoize gradient background calculation for performance
  const backgroundStyle = useMemo(() => {
    const percentage = ((value - min) / (max - min)) * 100;
    const accentColor = COLOR_ACCENT_GREEN;
    const trackColor = theme === 'dark' ? COLOR_DARK_TRACK : COLOR_LIGHT_TRACK;
    return {
      background: `linear-gradient(to right, ${accentColor} 0%, ${accentColor} ${percentage}%, ${trackColor} ${percentage}%, ${trackColor} 100%)`
    };
  }, [value, min, max, theme]);

  return (
    <div className={className}>
      <label htmlFor={id} className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>
        <span className="text-lg font-semibold text-accent">{value}{unit}</span>
      </label>
      <input
        id={id}
        type="range"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={backgroundStyle}
        className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-accent"
        min={min}
        max={max}
        step={step}
        aria-label={label}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={`${value}${unit}`}
        role="slider"
      />
      <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );
}

RangeSlider.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number,
  unit: PropTypes.string,
  className: PropTypes.string
};

export default RangeSlider;
