'use client';

import { Moon, Sun, SunMoon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';
import { useTheme, ThemeMode } from '@/app/providers/theme-provider';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const t = useTranslations('buttons');

  const cycleTheme = useCallback(() => {
    const order: ThemeMode[] = ['auto', 'light', 'dark'];
    const nextIndex = (order.indexOf(theme) + 1) % order.length;
    setTheme(order[nextIndex]);
  }, [setTheme, theme]);

  const icon = theme === 'auto' ? <SunMoon className="h-5 w-5" aria-hidden="true" /> : theme === 'light' ? <Sun className="h-5 w-5" aria-hidden="true" /> : <Moon className="h-5 w-5" aria-hidden="true" />;
  const label =
    theme === 'auto'
      ? `${t('theme')} (${t('themeAuto')})`
      : theme === 'light'
        ? `${t('theme')} (${t('themeLight')})`
        : `${t('theme')} (${t('themeDark')})`;

  return (
    <button
      type="button"
      onClick={cycleTheme}
      className="glass-panel flex h-12 w-12 items-center justify-center rounded-full border border-border/40 bg-surface/70 text-text transition hover:bg-surface/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      aria-label={label}
    >
      {icon}
    </button>
  );
}
