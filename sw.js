var CACHE_VERSION = '1.9.4'
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

self.addEventListener('fetch', (event) => {
  event.respondWith(async function() {
    try {
      return await fetch(event.request);
    } catch (err) {
      return caches.match(event.request);
    }
  }());
});