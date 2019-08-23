const CACHE_VERSION=1;
const CACHE_INMUTABLE="CACHE_INMUTABLE";
const INMUTABLES ={"index.html"};


self.addEventListener('install',e => {

e.waituntil(cache.open(CACHE_INMUTABLE)
	.then(cache=>{
         var i;
		for(i=0;i<INMUTABLES.lenght;i++)
		{
			fetch(INMUTABLES[i]).then(resp=>{
				cache.put(INMUTABLES[i],resp);

			});

		}

	});

}));


self.addEventListener('fetch',e => {

e.respondWith(caches.match(e.request));

});
