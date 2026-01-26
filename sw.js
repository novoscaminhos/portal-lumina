self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', () => {
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Só nos importamos com páginas HTML do portal
  if (!url.pathname.endsWith('.html')) return;

  event.respondWith((async () => {
    const client = await self.clients.get(event.clientId);
    if (!client) return fetch(event.request);

    // Lê estados do LocalStorage via postMessage
    client.postMessage({ type: 'CHECK_ACCESS_STATE' });

    return fetch(event.request);
  })());
});
