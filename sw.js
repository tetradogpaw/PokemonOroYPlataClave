const CACHE_VERSION = 4;
const CACHE_INMUTABLE = "CACHE_INMUTABLE";
const INMUTABLES = ["index.html"];


self.addEventListener('install', e => {

    e.waitUntil(caches.open(CACHE_INMUTABLE)
        .then(cache => {
            return cache.addAll(INMUTABLES);

        }));

});


self.addEventListener('fetch', e => {
    var req = caches.match(e.request.url);
    console.log(req);
    e.respondWith(req);

});