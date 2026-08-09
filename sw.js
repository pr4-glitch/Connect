const CACHE = "connect-v1";
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(["./", "./index.html"])).catch(()=>{}));
  self.skipWaiting();
});
self.addEventListener("activate", (e) => { self.clients.claim(); });
self.addEventListener("fetch", (e) => {
  // Network-first so data always stays fresh; falls back to cache only if offline
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
