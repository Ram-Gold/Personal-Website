import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
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

  const isTransitioningRef = useRef(false);
  const cooldownTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    return () => {
      if (cooldownTimerRef.current !== null) {
        window.clearTimeout(cooldownTimerRef.current);
      }
    };
  }, []);

  const toggleTheme = (coords?: { x?: number; y?: number } | null) => {
    // Prevent overlapping transitions and enforce cooldown so animation plays only once
    if (isTransitioningRef.current) {
      return;
    }
    isTransitioningRef.current = true;

    if (cooldownTimerRef.current !== null) {
      window.clearTimeout(cooldownTimerRef.current);
      cooldownTimerRef.current = null;
    }

    const resetCooldown = () => {
      // 1200ms cooldown (1000ms animation duration + 200ms settling buffer)
      cooldownTimerRef.current = window.setTimeout(() => {
        isTransitioningRef.current = false;
        cooldownTimerRef.current = null;
      }, 1200);
    };

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
      try {
        const knob = document.querySelector('.pullcord-knob');
        const rect = knob?.getBoundingClientRect();
        const x = coords?.x ?? (rect ? rect.left + rect.width / 2 : window.innerWidth - 112);
        const y = coords?.y ?? (rect ? rect.top + rect.height / 2 : 180);
        const endRadius = Math.hypot(
          Math.max(x, window.innerWidth - x),
          Math.max(y, window.innerHeight - y)
        );

        // Pre-set coordinate variables so CSS clip-path initial rule on ::view-transition-new(root)
        // starts at 0px at this exact origin on the very first frame (preventing split-frame unclipped flash)
        document.documentElement.style.setProperty('--cord-x', `${x}px`);
        document.documentElement.style.setProperty('--cord-y', `${y}px`);
        document.documentElement.style.setProperty('--cord-r', `${endRadius}px`);

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
                duration: 1000,
                easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
                fill: 'forwards',
                pseudoElement: '::view-transition-new(root)',
              }
            );
          })
          .catch(() => {});

        transition.finished
          .catch(() => {})
          .finally(() => {
            resetCooldown();
          });
      } catch {
        updateDOM(nextTheme);
        setTheme(nextTheme);
        resetCooldown();
      }
    } else {
      // Instant change fallback
      updateDOM(nextTheme);
      setTheme(nextTheme);
      resetCooldown();
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
