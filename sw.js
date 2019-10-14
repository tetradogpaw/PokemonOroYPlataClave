const CACHE_VERSION = 7.7;
const CACHE_INMUTABLE = "CACHE_INMUTABLE";
const CACHE_DINAMICO = "CACHE_DINAMICO";
const INMUTABLES = [];


self.addEventListener('install', e => {

    var inmutable = caches.open(CACHE_INMUTABLE)
        .then(cache => {

            return cache.addAll(INMUTABLES);

        });
    var dinamico = new Primise((okey, error) => {
        caches.open(CACHE_DINAMICO).then(cache => {
            cache.keys.forEach(key => {
                cache.delete(key);

            });
            okey();
        });
    });
    Promise.all(inmutable, dinamico);

});


self.addEventListener('fetch', e => {

    e.respondWith(caches.match(e.request).then(resp => {
        var respuesta;
        if (resp)
            respuesta = resp;
        else {
            respuesta = fetch(e.request)
                .then(data => {
                    return caches.open(CACHE_DINAMICO)
                        .then(cache => {
                            cache.put(e.request, data.clone());
                            return data;
                        });
                });
        }
        return respuesta;

    }));

});