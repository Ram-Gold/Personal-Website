import React, { useRef } from 'react';
import { PullCord } from 'pullcord';
import 'pullcord/pullcord.css';
import { useTheme } from '../utils/ThemeContext';
import { hapticMedium } from '../utils/haptics';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const lastPullTimeRef = useRef(0);

  const handlePull = () => {
    const now = Date.now();
    // 1200ms cooldown prevents duplicate firing (e.g. drag release + click) and rapid toggling during the 1-second animation
    if (now - lastPullTimeRef.current < 1200) {
      return;
    }
    lastPullTimeRef.current = now;

    hapticMedium();

    const knob = typeof document !== 'undefined' ? document.querySelector('.pullcord-knob') : null;
    const rect = knob?.getBoundingClientRect();
    const coords = rect
      ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
      : undefined;

    toggleTheme(coords);
  };

  return (
    <PullCord
      onPull={handlePull}
      pulled={theme === 'light'}
      ariaLabel="Toggle theme"
      className="absolute-pullcord"
    />
  );
};
