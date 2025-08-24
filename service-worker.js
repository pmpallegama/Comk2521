const CACHE_NAME = "github-pwa-v1";
const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./Styling/reset_style.css",
  "./Styling/style.css",
  "./manifest.json",
  "./web-app-manifest-192x192.png",
  "./web-app-manifest-512x512.png"
];

// Install event - cache files
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  console.log("✅ Service Worker: Installed");
});

// Activate event - clean old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
  console.log("✅ Service Worker: Activated");
});

// Fetch event - serve cached files if offline
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
