import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { KeyCard } from '@/components/KeyCard';
import { HowItWorks } from '@/components/HowItWorks';

export default async function HomePage({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'hero' });
  const buttonT = await getTranslations({ locale: params.locale, namespace: 'buttons' });

  return (
    <main className="flex w-full flex-1 flex-col items-center justify-center gap-20 px-4 py-16 md:py-24">
      <section className="flex w-full max-w-5xl flex-col items-center gap-10 text-center">
        <div className="space-y-6">
          <h1 className="text-4xl font-semibold tracking-tight text-text sm:text-6xl">
            {t('title')}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted sm:text-xl">{t('subtitle')}</p>
        </div>
        <KeyCard />
        <Link
          href="#how"
          className="rounded-full border border-accent/30 bg-transparent px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-accent transition hover:bg-accent/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {buttonT('howItWorks')}
        </Link>
      </section>
      <HowItWorks />
    </main>
  );
}
