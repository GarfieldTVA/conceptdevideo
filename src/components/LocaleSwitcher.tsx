'use client';

import { Languages } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next-intl/client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { routing, locales, type Locale } from '@/i18n/routing';

const STORAGE_KEY = 'locale';

export function LocaleSwitcher() {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const [selectedLocale, setSelectedLocale] = useState<Locale>(routing.defaultLocale);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (stored && locales.includes(stored)) {
      setSelectedLocale(stored);
    } else {
      const parts = pathname?.split('/') ?? [];
      const current = parts[1];
      if (locales.includes(current as Locale)) {
        setSelectedLocale(current as Locale);
      }
    }
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        open &&
        listRef.current &&
        !listRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  const changeLocale = useCallback(
    (locale: Locale) => {
      setOpen(false);
      setSelectedLocale(locale);
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, locale);
      }
      router.replace(pathname, { locale });
    },
    [pathname, router]
  );

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="glass-panel flex h-12 w-12 items-center justify-center rounded-full border border-border/40 bg-surface/70 text-text transition hover:bg-surface/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t('aria.localeToggle')}
      >
        <Languages className="h-5 w-5" aria-hidden="true" />
      </button>
      {open ? (
        <div
          ref={listRef}
          role="menu"
          className="glass-panel absolute bottom-16 left-1/2 z-50 w-44 -translate-x-1/2 space-y-1 p-3 text-left"
        >
          {locales.map((locale) => (
            <button
              key={locale}
              type="button"
              role="menuitemradio"
              aria-checked={selectedLocale === locale}
              onClick={() => changeLocale(locale)}
              className={`flex w-full items-center justify-between rounded-full px-4 py-2 text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${selectedLocale === locale ? 'bg-accent/20 text-text' : 'hover:bg-surface/90'}`}
            >
              <span>{t(`locale.${locale}` as const)}</span>
              {selectedLocale === locale ? <span aria-hidden="true">•</span> : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
