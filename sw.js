var CACHE_VERSION = '1.9.6c'
var CACHE_NAME = 'cache-v' + CACHE_VERSION;
var urlsToCache = [
  '/',
  '/main.css',
  '/main.js'
];

self.addEventListener('install', function (event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function(cache) {
      console.log("Criando cache");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});