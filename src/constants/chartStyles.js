import {
  COLOR_DARK_BG,
  COLOR_DARK_BORDER,
  COLOR_DARK_TEXT
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


// Chart styling constants
export const CHART_STROKE_DASHARRAY = '3 3';
export const CHART_STROKE_WIDTH = 2;
export const CHART_BAR_RADIUS = [4, 4, 0, 0]; // Rounded top corners
export const CHART_DOT_RADIUS = 4;

// Chart dimensions
export const CHART_HEIGHT = 300;
export const CHART_LABEL_OFFSET = -5;
