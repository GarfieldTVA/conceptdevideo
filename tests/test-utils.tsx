import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@/app/providers/theme-provider';
import fr from '../messages/fr.json';

type RenderOptions = {
  locale?: string;
  messages?: Record<string, unknown>;
};

export function renderWithProviders(ui: ReactNode, { locale = 'fr', messages = fr }: RenderOptions = {}) {
  if (typeof window !== 'undefined' && !window.matchMedia) {
    window.matchMedia = () => ({
      matches: false,
      media: '',
      onchange: null,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      addListener: () => undefined,
      removeListener: () => undefined,
      dispatchEvent: () => false
    });
  }
  return render(
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider>{ui}</ThemeProvider>
    </NextIntlClientProvider>
  );
}
