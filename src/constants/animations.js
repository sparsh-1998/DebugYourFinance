/**
 * Animation timing constants for consistent UX
 */

// Framer Motion animation durations (in seconds)
export const ANIMATION_DURATION_FAST = 0.2;      // Navbar, quick toggles
export const ANIMATION_DURATION_NORMAL = 0.3;    // Page transitions
export const ANIMATION_DURATION_SMOOTH = 0.4;    // Tool switching
export const ANIMATION_DURATION_SLOW = 0.5;      // Calculator results
export const ANIMATION_DURATION_HERO = 0.6;      // Hero sections, feature reveals

// Animation delays
export const ANIMATION_DELAY_SHORT = 0.1;        // Staggered list items
export const ANIMATION_DELAY_MEDIUM = 0.2;       // Sequential elements
export const ANIMATION_DELAY_LONG = 0.4;         // Final reveal elements

// Common animation variants
export const FADE_IN_VARIANT = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

export const SLIDE_UP_VARIANT = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};
