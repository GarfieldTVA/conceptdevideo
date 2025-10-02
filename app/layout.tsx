import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Stream On Anything',
  description: 'Un concept expérimental pour diffuser n\'importe où avec une clé partagée.',
  robots: {
    index: false,
    follow: false
  },
  other: {
    robots: 'noindex, nofollow'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
