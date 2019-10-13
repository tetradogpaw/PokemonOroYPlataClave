const CACHE_VERSION = 6;
const CACHE_INMUTABLE = "CACHE_INMUTABLE";
const INMUTABLES = ["index.html", "icon.png", "manifest.json"];


self.addEventListener('install', e => {

    e.waitUntil(caches.open(CACHE_INMUTABLE)
        .then(cache => {
            return cache.addAll(INMUTABLES).then(() => { cache.put("/", cache[INMUTABLES[0]]); });

        }));

});


self.addEventListener('fetch', e => {

    var url;
    if (String(e.request.url).includes("PokemonOroYPlataClave"))
        url = String(e.request.url).substr("https://tetradogpaw.github.io".length);
    else url = e.request.url;

    console.log(url);

    e.respondWith(caches.match(url));

});