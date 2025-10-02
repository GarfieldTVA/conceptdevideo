'use client';

import { useTranslations } from 'next-intl';

export function LegalContent() {
  const t = useTranslations('legal');
  const sections = ['disclaimer', 'responsibility', 'key', 'compliance', 'privacy', 'legal'] as const;

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <h2 className="text-3xl font-semibold text-text">{t('title')}</h2>
        <p className="text-muted max-w-2xl">{t('intro')}</p>
      </header>
      <nav aria-label={t('title')} className="glass-panel p-4">
        <ul className="space-y-2 text-sm">
          {sections.map((section) => (
            <li key={section}>
              <a className="text-accent hover:underline" href={`#${section}`}>
                {t(`sections.${section}.title` as const)}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="space-y-10">
        {sections.map((section) => (
          <section key={section} id={section} className="space-y-3">
            <h3 className="text-2xl font-semibold text-text">{t(`sections.${section}.title` as const)}</h3>
            <p className="text-muted leading-relaxed">{t(`sections.${section}.body` as const)}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
