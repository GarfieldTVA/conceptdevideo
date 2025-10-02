import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export default async function NotFound({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'notFound' });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 px-4 py-16 text-center">
      <div className="glass-panel max-w-xl space-y-6 p-12">
        <h1 className="text-5xl font-semibold text-text">{t('title')}</h1>
        <p className="text-muted">{t('description')}</p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full border border-accent/40 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-accent transition hover:bg-accent/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {t('cta')}
        </Link>
      </div>
    </main>
  );
}
