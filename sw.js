// PROJECT : Piano Harmony Master
// VERSION : 1.3.5 - Label Toggle Edition (Cache Updated)

const CACHE_NAME = 'piano-harmony-v1.3.5';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// Install: Create new cache and add assets
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting(); // Force the waiting service worker to become active
});

// Activate: Clean up old versions of the cache
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Fetch: Serve from cache, fallback to network
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
