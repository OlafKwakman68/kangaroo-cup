/* Minimal service worker: caches the app shell so it opens instantly
   and works offline once visited. Bump CACHE_NAME whenever you change
   the site so visitors get the fresh version. */

const CACHE_NAME = "kangaroo-cup-v6";
const APP_SHELL = [
  "index.html",
  "program.html",
  "format.html",
  "results.html",
  "history.html",
  "css/style.css",
  "js/app.js",
  "js/data.js",
  "manifest.json",
  "assets/img/crest-hero.png",
  "assets/img/crest-nav.png",
  "assets/img/icon-192-v2.png",
  "assets/img/icon-512-v2.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  /* HTML pages: always fetch from the network (bypassing HTTP cache too)
     so edits show up on the very next load, no cache-version bump needed.
     Falls back to the cached copy only when offline. */
  const isHTML =
    event.request.mode === "navigate" ||
    (event.request.headers.get("accept") || "").includes("text/html");

  if (isHTML) {
    event.respondWith(
      fetch(event.request, { cache: "no-store" })
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  /* CSS/JS/images: cache-first for speed, refreshed in the background. */
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const network = fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
