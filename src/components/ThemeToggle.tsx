import React from 'react';
import { PullCord } from 'pullcord';
import 'pullcord/pullcord.css';
import { useTheme } from '../utils/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <PullCord
      onPull={toggleTheme}
      pulled={theme === 'light'}
      ariaLabel="Toggle theme"
      className="absolute-pullcord"
    />
  );
};
