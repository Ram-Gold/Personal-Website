import { WebHaptics } from 'web-haptics';

// Shared instance of WebHaptics
export const haptics = new WebHaptics();

// Helper to safely trigger vibration across mobile browsers (Android Chrome, Vivaldi, etc.)
const triggerVibration = (pattern: number | number[], presetName?: 'selection' | 'light' | 'medium' | 'success' | 'warning' | 'error') => {
  try {
    if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
      navigator.vibrate(pattern);
    } else if (presetName) {
      haptics.trigger(presetName);
    }
  } catch {
    // Graceful fallback for non-supporting environments
  }
};

/**
 * Very subtle tap (15ms) - ideal for micro-interactions, selection changes,
 * expanding/collapsing sections, or hovering/tapping calendar items.
 */
export const hapticSelection = () => {
  triggerVibration(15, 'selection');
};

/**
 * Crisp light tap (25ms) - ideal for navigation, buttons, external links,
 * and standard UI element taps.
 */
export const hapticLight = () => {
  triggerVibration(25, 'light');
};

/**
 * Medium physical tactile impact (45ms) - ideal for physical toggles (like
 * pulling the light switch cord) or primary prominent actions.
 */
export const hapticMedium = () => {
  triggerVibration(45, 'medium');
};

/**
 * Success double-pulse - ideal for completed downloads, copy to clipboard,
 * or confirmation actions.
 */
export const hapticSuccess = () => {
  triggerVibration([35, 60, 45], 'success');
};

/**
 * Warning pulse pattern - for alerts or cautions.
 */
export const hapticWarning = () => {
  triggerVibration([50, 80, 50], 'warning');
};

/**
 * Error triple sharp pulse - for failed operations.
 */
export const hapticError = () => {
  triggerVibration([40, 50, 40, 50, 40], 'error');
};

