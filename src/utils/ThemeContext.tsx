import React, { createContext, useContext, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: (coords?: { x?: number; y?: number } | null) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem('theme') as Theme | null;
    return stored || 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = (coords?: { x?: number; y?: number } | null) => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';

    const updateDOM = (newTheme: Theme) => {
      const root = document.documentElement;
      if (newTheme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
      localStorage.setItem('theme', newTheme);
    };

    // Use native View Transitions with circular clip-path reveal
    const doc = document as any;
    if (
      typeof doc !== 'undefined' &&
      typeof doc.startViewTransition === 'function' &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      // Originate clip-path from the top-right corner
      const x = coords?.x ?? window.innerWidth;
      const y = coords?.y ?? 0;
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const transition = doc.startViewTransition(() => {
        updateDOM(nextTheme);
        flushSync(() => {
          setTheme(nextTheme);
        });
      });

      transition.ready
        .then(() => {
          document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: 500,
              easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
              pseudoElement: '::view-transition-new(root)',
            }
          );
        })
        .catch(() => {});
    } else {
      // Instant change fallback
      updateDOM(nextTheme);
      setTheme(nextTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
