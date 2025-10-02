'use client';

import { Camera, Rocket, ShieldCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';

const icons = {
  one: Camera,
  two: Rocket,
  three: ShieldCheck
};

export function HowItWorks() {
  const t = useTranslations('how');

  return (
    <section id="how" className="mx-auto mt-20 flex w-full max-w-5xl flex-col gap-8 px-4">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-semibold text-text sm:text-5xl">{t('title')}</h2>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {(Object.keys(icons) as Array<'one' | 'two' | 'three'>).map((key) => {
          const Icon = icons[key];
          return (
            <article key={key} className="glass-panel flex flex-col gap-4 p-6 text-left">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/20 text-accent">
                <Icon className="h-7 w-7" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-text">{t(`steps.${key}.title` as const)}</h3>
              <p className="text-muted leading-relaxed">{t(`steps.${key}.description` as const)}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
