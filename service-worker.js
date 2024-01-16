const version = 1.01

const cache_NAME = "demo" + version

const toCache=[
    '/',
    'script.js',
    'style.css',
    'index.html',
    'register.js',
    'service-worker.js',
    './icons/favicon.ico',
    './icons/favicon-16x16.png',
    './icons/favicon-32x32.png',
    './icons/favicon-96x96.png',
    './icons/favicon-256x256.png',
    'manifest.json',
    'https://api.punkapi.com/v2/beers/random',
    // 'page.html'
]

const ressourcesToCache= async(ressources) => {

const cache = await caches.open(cache_NAME)
await cache.addAll(ressources)
}
 
self.addEventListener('install', e => {
    console.log("Install SW Version" + version)
    e.waitUntil(
        ressourcesToCache(toCache)
    )
    return self.skipWaiting()

})

self.addEventListener('activate', e => {
    console.log("Install SW Version" + version)
    return self.clients.claim()
})

//priorité cache
const cacheFirst = async(request) => {
    const responseFromcCache = await caches.match(request)
    return responseFromcCache
}

//priorité réseau
const networkFirst = async(request) => {
    const responseFromNetwork = await fetch(request)
    .catch( () => {
        return caches.match(request)
    })
    return responseFromNetwork

}

//update cache
function updateCache(request) {
    return caches.open(cache_NAME).then(cache => {
        return fetch(request).then(response => {
            const resClone = response.clone()
            if (response.status < 400)
                return cache.put(request, resClone)
            return response
        })
    })
}

//simple fetch general
self.addEventListener('fetch', e => {
    const requestUrl = new URL(
        e.request.url
    )
    if(!requestUrl.href.includes("https://api")) {
        e.respondWith(cacheFirst(requestUrl))
    }
    else {
        e.respondWith(networkFirst(requestUrl))
    }
    updateCache(requestUrl)
})

//notification//

self.addEventListener('push', e =>{
    if( !(self.Notification && self.Notification.permission === 'granted') ){
        return;
    }
    console.log('testnotification')
})


