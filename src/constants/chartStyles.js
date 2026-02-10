import {
  COLOR_DARK_BG,
  COLOR_DARK_BORDER,
  COLOR_DARK_TEXT,
  COLOR_LIGHT_BORDER,
  COLOR_SLATE_500,
  COLOR_CHART_GRID,
  COLOR_WHITE
} from './colors';

/**
 * Reusable chart styling constants
 */

// Tooltip styling for dark mode charts
export const CHART_TOOLTIP_STYLE = {
  backgroundColor: COLOR_DARK_BG,
  border: `2px solid ${COLOR_DARK_BORDER}`,
  borderRadius: '8px',
  color: COLOR_DARK_TEXT
};

// Tooltip styling for light mode (if needed)
export const CHART_TOOLTIP_STYLE_LIGHT = {
  backgroundColor: COLOR_WHITE,
  border: `2px solid ${COLOR_LIGHT_BORDER}`,
  borderRadius: '8px'
};

// Common tick colors
export const CHART_TICK_COLOR = COLOR_SLATE_500;
export const CHART_GRID_COLOR = COLOR_CHART_GRID;

// Chart styling constants
export const CHART_STROKE_DASHARRAY = '3 3';
export const CHART_STROKE_WIDTH = 2;
export const CHART_BAR_RADIUS = [4, 4, 0, 0]; // Rounded top corners
export const CHART_DOT_RADIUS = 4;

// Chart dimensions
export const CHART_HEIGHT = 300;
export const CHART_LABEL_OFFSET = -5;

// Chart axis label props
export const CHART_AXIS_CLASSES = {
  light: 'fill-slate-600',
  dark: 'dark:fill-slate-400'
};
