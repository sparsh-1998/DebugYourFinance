import { useTheme } from '../../contexts/ThemeContext';
import { COLOR_ACCENT_GREEN, COLOR_DARK_TRACK, COLOR_LIGHT_TRACK } from '../../constants/colors';

/**
 * Reusable range slider component with label and value display
 */
export default function RangeSlider({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit = '',
  className = ''
}) {
  const { theme } = useTheme();

  // Calculate percentage for gradient
  const percentage = ((value - min) / (max - min)) * 100;

  // Define colors based on theme
  const accentColor = COLOR_ACCENT_GREEN;
  const trackColor = theme === 'dark' ? COLOR_DARK_TRACK : COLOR_LIGHT_TRACK;

  // Create gradient background showing filled portion in green
  const backgroundStyle = {
    background: `linear-gradient(to right, ${accentColor} 0%, ${accentColor} ${percentage}%, ${trackColor} ${percentage}%, ${trackColor} 100%)`
  };

  return (
    <div className={className}>
      <label className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>
        <span className="text-lg font-semibold text-accent">{value}{unit}</span>
      </label>
      <input
        type="range"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={backgroundStyle}
        className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-accent"
        min={min}
        max={max}
        step={step}
      />
      <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );
}
