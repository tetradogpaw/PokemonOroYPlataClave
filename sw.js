const CACHE_VERSION = 5;
const CACHE_INMUTABLE = "CACHE_INMUTABLE";
const INMUTABLES = ["index.html"];


self.addEventListener('install', e => {

    e.waitUntil(caches.open(CACHE_INMUTABLE)
        .then(cache => {
            return cache.addAll(INMUTABLES);

        }));

});


self.addEventListener('fetch', e => {

    var url;
    if (String(e.request.url).includes("PokemonOroYPlataClave"))
        url = String(e.request.url).substr("https://tetradogpaw.github.io/PokemonOroYPlataClave".length);
    else url = e.request.url;

    console.log(url);
    console.log(caches);
    e.respondWith(caches.match(url));

});