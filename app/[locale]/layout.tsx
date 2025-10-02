import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { ThemeProvider } from '@/app/providers/theme-provider';
import { LocaleSync } from '@/app/providers/locale-sync';
import { loadMessages } from '@/i18n/getMessages';
import { locales, type Locale } from '@/i18n/routing';
import { RadialNav } from '@/components/RadialNav';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: { locale: Locale };
}) {
  const { locale } = params;

  if (!locales.includes(locale)) {
    notFound();
  }

  unstable_setRequestLocale(locale);
  const messages = await loadMessages(locale);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider>
        <LocaleSync locale={locale} />
        <div className="relative flex min-h-screen flex-col items-center">
          {children}
          <RadialNav />
        </div>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
