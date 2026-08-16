import React from 'react';
import { PullCord } from 'pullcord';
import 'pullcord/pullcord.css';
import { useTheme } from '../utils/ThemeContext';
import { hapticMedium } from '../utils/haptics';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const handlePull = () => {
    hapticMedium();
    toggleTheme();
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
