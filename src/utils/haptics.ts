import { WebHaptics } from 'web-haptics';

// Shared instance of WebHaptics
export const haptics = new WebHaptics();

/**
 * Very subtle tap (8ms) - ideal for micro-interactions, selection changes,
 * expanding/collapsing sections, or hovering/tapping calendar items.
 */
export const hapticSelection = () => {
  try {
    haptics.trigger('selection');
  } catch {
    // Graceful fallback for non-supporting environments
  }
};

/**
 * Crisp light tap (15ms) - ideal for navigation, buttons, external links,
 * and standard UI element taps.
 */
export const hapticLight = () => {
  try {
    haptics.trigger('light');
  } catch {
    // Graceful fallback
  }
};

/**
 * Medium physical tactile impact (25ms) - ideal for physical toggles (like
 * pulling the light switch cord) or primary prominent actions.
 */
export const hapticMedium = () => {
  try {
    haptics.trigger('medium');
  } catch {
    // Graceful fallback
  }
};

/**
 * Success double-pulse - ideal for completed downloads, copy to clipboard,
 * or confirmation actions.
 */
export const hapticSuccess = () => {
  try {
    haptics.trigger('success');
  } catch {
    // Graceful fallback
  }
};

/**
 * Warning pulse pattern - for alerts or cautions.
 */
export const hapticWarning = () => {
  try {
    haptics.trigger('warning');
  } catch {
    // Graceful fallback
  }
};

/**
 * Error triple sharp pulse - for failed operations.
 */
export const hapticError = () => {
  try {
    haptics.trigger('error');
  } catch {
    // Graceful fallback
  }
};
