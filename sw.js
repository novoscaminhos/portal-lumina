self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', () => {
  self.clients.claim();
});

self.addEventListener('fetch', () => {
  // Por enquanto, não interceptamos nada.
  // Portal sempre online = mais controle.
});
