const STATIC_CACHE = "portfolio-static-v1";
const ASSET_CACHE = "portfolio-assets-v1";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(["/", "/index.html"]))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => ![STATIC_CACHE, ASSET_CACHE].includes(key))
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const isStaticAsset = /\.(?:js|css|png|jpg|jpeg|webp|svg|mp4|mp3|woff2?)$/i.test(new URL(request.url).pathname);

  if (isStaticAsset) {
    event.respondWith(
      caches.open(ASSET_CACHE).then(async (cache) => {
        const cached = await cache.match(request);
        const network = fetch(request)
          .then((response) => {
            if (response.ok && response.status !== 206 && response.type !== "opaque") {
              cache.put(request, response.clone());
            }
            return response;
          })
          .catch(() => cached);

        return cached || network;
      })
    );
    return;
  }

  event.respondWith(
    fetch(request).catch(async () => {
      const cache = await caches.open(STATIC_CACHE);
      return cache.match("/index.html");
    })
  );
});