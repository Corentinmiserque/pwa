const version = 1.00

self.addEventListener('install', e => {
    console.log("Install SW Version" + version)
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
})