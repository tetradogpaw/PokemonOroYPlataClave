const CACHE_VERSION = 4;
const CACHE_INMUTABLE = "CACHE_INMUTABLE";
const INMUTABLES = ["index.html"];


self.addEventListener('install', e => {

    e.waitUntil(caches.open(CACHE_INMUTABLE)
        .then(cache => {
            return new Promise((resolve, reject) => {
                for (i in CACHE_INMUTABLE) {
                    fetch(CACHE_INMUTABLE[i]).then((resp) => {

                            cache.put(CACHE_INMUTABLE[i], resp);
                        }

                    ).catch(reject);
                }
                resolve();
            });

        }));

});


self.addEventListener('fetch', e => {

    var url;
    if (String(e.request.url).includes("PokemonOroYPlataClave"))
        url = String(e.request.url).substr("https://tetradogpaw.github.io/PokemonOroYPlataClave".length);
    else url = e.request.url;
    console.log(url);
    e.respondWith(caches.match(url));

});