// Service worker : jeu entièrement hors ligne.
// La page (index.html) passe d'abord par le réseau pour recevoir les mises à jour tout de suite,
// puis se rabat sur le cache hors ligne. Le reste (police, icônes) est servi depuis le cache.
// Pour publier une mise à jour, change le numéro de VERSION.
const VERSION = 'v6';
const CACHE = 'chat-en-cavale-' + VERSION;
const FILES = ['./', './index.html', './manifest.webmanifest', './fonts/press-start-2p.woff2',
  './icons/favicon-32.png', './icons/icon-192.png', './icons/icon-512.png', './icons/icon-maskable-512.png', './icons/apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k.startsWith('chat-en-cavale-') && k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  const isPage = e.request.mode === 'navigate' || url.pathname.endsWith('/') || url.pathname.endsWith('/index.html');
  if (isPage) {
    // réseau d'abord : la dernière version du jeu arrive sans attendre
    e.respondWith(fetch(e.request).then(res => {
      if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put('./index.html', copy)); }
      return res;
    }).catch(() => caches.match('./index.html')));
    return;
  }
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(hit => hit || fetch(e.request).then(res => {
    if (res && res.ok && url.origin === location.origin) {
      const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy));
    }
    return res;
  })));
});
