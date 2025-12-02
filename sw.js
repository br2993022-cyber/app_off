const CACHE_NAME = "app-cache-v1";

const URLS_TO_CACHE = [
  "./",
  "./index.html",
  "./pantalla2.html",
  "./pantalla3.html",
  "./pantalla4.html",
  "./pantalla5.html",
  "./pantalla6.html",
  "./pantalla7.html",
  "./referencias.html",

  "./style.css",

  "./script.js",
  "./auth.js",
  "./firebaseConfig.js",

  "./icon-192.png",
  "./icon-512.png"
];

// Instala la caché
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

// Responde con datos de cache cuando esté offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        return cachedResponse || fetch(event.request);
      })
  );
});
