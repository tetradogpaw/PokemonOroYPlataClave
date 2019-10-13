const CACHE_VERSION = 6;
const CACHE_INMUTABLE = "CACHE_INMUTABLE";
const CACHE_DINAMICO = "CACHE_DINAMICO";
const INMUTABLES = [];


self.addEventListener('install', e => {

    e.waitUntil(caches.open(CACHE_INMUTABLE)
        .then(cache => {
            return cache.addAll(INMUTABLES);

        }));

});


self.addEventListener('fetch', e => {

    e.respondWith(caches.match(e.request).then(resp => {
        var respuesta;
        if (resp)
            respuesta = resp;
        else {
            respuesta = fetch(e.request);
            caches.open(CACHE_DINAMICO).then(cache => {
                cache.put(e.request, respuesta.clone());
            });
        }
        return respuesta;

    }));

});