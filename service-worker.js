const version = 1.00

const cache_NAME = "demi" + version

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
    'https://api.punkapi.com/v2/beers?per_page=10'
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

self.addEventListener('fetch', e => {
    const requestUrl = new URL(
        e.request.url
    )
    console.log(requestUrl)
    e.respondWith(caches.match(requestUrl))
})