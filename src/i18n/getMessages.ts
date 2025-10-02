import type { Locale } from './routing';

export async function loadMessages(locale: Locale) {
  switch (locale) {
    case 'fr':
      return (await import('../../messages/fr.json')).default;
    case 'en':
      return (await import('../../messages/en.json')).default;
    case 'es':
      return (await import('../../messages/es.json')).default;
    default:
      throw new Error(`Unsupported locale: ${locale}`);
  }
}
