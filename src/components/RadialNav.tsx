'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Circle, FileText } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { LocaleSwitcher } from './LocaleSwitcher';
import { LegalModal } from './LegalModal';
import { ThemeToggle } from './ThemeToggle';

const positions = [
  { angle: -90, distance: 96 },
  { angle: -150, distance: 96 },
  { angle: -30, distance: 96 }
];

export function RadialNav() {
  const t = useTranslations('aria');
  const buttonLabels = useTranslations('buttons');
  const [isOpen, setIsOpen] = useState(false);
  const [legalOpen, setLegalOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const items = [
    {
      id: 'theme',
      label: buttonLabels('theme'),
      element: <ThemeToggle />
    },
    {
      id: 'language',
      label: buttonLabels('language'),
      element: <LocaleSwitcher />
    },
    {
      id: 'legal',
      label: buttonLabels('legal'),
      element: (
        <button
          type="button"
          onClick={() => {
            setLegalOpen(true);
            setIsOpen(false);
          }}
          className="glass-panel flex h-12 w-12 items-center justify-center rounded-full border border-border/40 bg-surface/70 text-text transition hover:bg-surface/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          aria-label={t('legalOpen')}
        >
          <FileText className="h-5 w-5" aria-hidden="true" />
        </button>
      )
    }
  ];

  return (
    <>
      <div
        className="fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 flex-col items-center gap-4 md:bottom-8 md:left-auto md:right-8 md:translate-x-0 md:items-end"
        aria-label={t('radialMenu')}
      >
        <AnimatePresence>
          {isOpen &&
            items.map((item, index) => {
              const position = positions[index];
              const radians = (position.angle * Math.PI) / 180;
              const x = Math.cos(radians) * position.distance;
              const y = Math.sin(radians) * position.distance;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.8, x: 0, y: 0 }}
                  animate={{ opacity: 1, scale: 1, x, y }}
                  exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.8, x: 0, y: 0 }}
                  transition={{ type: shouldReduceMotion ? 'tween' : 'spring', stiffness: 200, damping: 20 }}
                  className="pointer-events-auto"
                >
                  {item.element}
                </motion.div>
              );
            })}
        </AnimatePresence>
        <button
          type="button"
          className="glass-panel flex h-14 w-14 items-center justify-center rounded-full border border-border/40 bg-accent text-white shadow-lg transition hover:bg-accent/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label={isOpen ? buttonLabels('close') : t('radialMenu')}
        >
          <Circle className={`h-6 w-6 transition-transform ${isOpen ? 'rotate-45' : ''}`} aria-hidden="true" />
        </button>
      </div>
      <LegalModal open={legalOpen} onClose={() => setLegalOpen(false)} />
    </>
  );
}
