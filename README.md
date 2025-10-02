# Stream Anywhere Showcase

Un site vitrine minimaliste construit avec Next.js 14, Tailwind CSS et next-intl pour présenter le concept « tout le monde peut streamer sur n’importe quoi ».

## Démarrage

```bash
npm install
npm run dev
```

## Production

```bash
npm run build
npm start
```

## Tests

```bash
npm test
```

## Modifier la clé de stream

La clé affichée est définie côté client dans `src/lib/streamKey.ts`. Mettez à jour la constante `STREAM_KEY` (et la date `STREAM_KEY_LAST_UPDATED`) pour la changer.

## Localisation

Les traductions se trouvent dans `messages/fr.json`, `messages/en.json` et `messages/es.json`. Ajoutez/modifiez les chaînes puis redémarrez le serveur de développement.

## Sécurité & hébergement

Les en-têtes de sécurité (CSP, HSTS, Permissions-Policy, etc.) sont configurés dans `next.config.mjs` et reproduits dans `vercel.json` et `_headers` pour un déploiement Vercel ou Netlify.
