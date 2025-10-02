'use client';

import { Clipboard, ClipboardCheck, Info } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import { STREAM_KEY, STREAM_KEY_LAST_UPDATED } from '@/lib/streamKey';

export function KeyCard() {
  const t = useTranslations();
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(STREAM_KEY);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = STREAM_KEY;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'absolute';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Clipboard copy failed', error);
    }
  }, []);

  return (
    <section
      className="glass-panel max-w-2xl w-full p-8 text-center space-y-6"
      aria-describedby="stream-key-description"
    >
      <div className="flex flex-col items-center gap-3">
        <span className="text-sm uppercase tracking-[0.3em] text-muted">{t('keyCard.label')}</span>
        <div
          className="relative w-full"
          onContextMenu={(event) => {
            event.preventDefault();
          }}
        >
          <code
            id="stream-key"
            className="block w-full truncate rounded-full border border-border/50 bg-surface/80 px-6 py-4 text-lg font-medium text-text shadow-inner"
          >
            {STREAM_KEY}
          </code>
          <button
            type="button"
            onClick={handleCopy}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-accent/80 px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <span className="flex items-center gap-2">
              {copied ? <ClipboardCheck className="h-4 w-4" aria-hidden="true" /> : <Clipboard className="h-4 w-4" aria-hidden="true" />}
              <span>{copied ? t('buttons.copied') : t('buttons.copy')}</span>
            </span>
          </button>
          <span className="sr-only">{t('keyCard.contextMenu')}</span>
          <span className="sr-only" aria-live="polite">
            {copied ? t('buttons.copied') : ''}
          </span>
        </div>
      </div>
      <p id="stream-key-description" className="text-sm text-muted flex items-center justify-center gap-2">
        <Info className="h-4 w-4" aria-hidden="true" />
        {t('hero.notice')}
      </p>
      <p className="text-xs uppercase tracking-[0.35em] text-muted/80">
        {t('hero.lastUpdated')}: <time dateTime={STREAM_KEY_LAST_UPDATED}>{STREAM_KEY_LAST_UPDATED}</time>
      </p>
    </section>
  );
}
