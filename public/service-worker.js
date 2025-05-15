const CACHE_NAME = 'app-cache-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/manifest.webmanifest',
  '/icon-192.png',
  '/icon-512.png'
  // tambahkan file lainnya sesuai build output
];

// Install Service Worker & cache static files
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting(); // aktifkan segera
});

// Activate: Hapus cache lama
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) return caches.delete(name);
        })
      )
    )
  );
  self.clients.claim(); // kendalikan semua tab
});

// Fetch handler
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request)
        .then(async (response) => {
          const cache = await caches.open(CACHE_NAME);

          // Cache ikon hanya sekali
          if (event.request.url.includes('/icons/')) {
            await cache.put(event.request, response.clone());
          } else if (event.request.destination === 'document' || event.request.destination === 'script' || event.request.destination === 'style') {
            // Cache dokumen penting lainnya
            await cache.put(event.request, response.clone());
          }

          return response;
        })
        .catch(() => {
          // fallback kalau offline dan tidak ada di cache
          if (event.request.destination === 'document') {
            return caches.match('/index.html');
          }
        });
    })
  );
});
