import React from 'react';
import { IconSun, IconMoon } from '@tabler/icons-react';
import { useTheme } from '../utils/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 flex items-center justify-center rounded-xl border border-card-border cursor-pointer transition-all duration-200 active:scale-[0.93] focus-visible:ring-2 focus-visible:ring-pink-500 outline-none shrink-0"
      style={{
        background: `color-mix(in srgb, var(--theme-card-bg) 70%, transparent)`,
        backdropFilter: 'blur(12px)',
      }}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span
        className="flex items-center justify-center transition-transform duration-350 cubic-bezier(0.23, 1, 0.32, 1)"
        style={{
          transform: theme === 'dark' ? 'rotate(0deg)' : 'rotate(360deg)',
        }}
      >
        {theme === 'dark' ? (
          <IconSun size={18} className="text-theme-muted" />
        ) : (
          <IconMoon size={18} className="text-theme-muted" />
        )}
      </span>
    </button>
  );
};
