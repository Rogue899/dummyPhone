// const CACHE_NAME = 'my-cache-v1';
// const urlsToCache = [
//   '/',
//   '/index.html',
//   '/assets/videos/highlight-first.mp4',
//   '/assets/videos/highlight-second.mp4',
//   '/assets/videos/highlight-third.mp4',
//   '/assets/videos/highlight-fourth.mp4',
//   '/assets/videos/explore.mp4',
//   '/assets/videos/hero.mp4',
//   '/assets/videos/small-hero.mp4',
//   '/assets/videos/frameVideo.mp4',
//   '/assets/images/yellow.svg',
//   '/assets/images/white.svg',
//   '/assets/images/hero.svg',
//   '/assets/images/frameImg.svg',
//   '/assets/models/scene.glb',
//   '/src/index.css',
//   '/src/utils/index.js',
//   '/src/utils/animations.js',
//   '/src/constants/index.js',
// ];

// self.addEventListener('install', event => {
//   event.waitUntil(
//     caches.open(CACHE_NAME)
//       .then(cache => {
//         return cache.addAll(urlsToCache);
//       })
//   );
// });

// self.addEventListener('fetch', event => {
//   event.respondWith(
//     caches.match(event.request)
//       .then(response => {
//         if (response) {
//           return response;
//         }
//         return fetch(event.request).then(networkResponse => {
//           return caches.open(CACHE_NAME).then(cache => {
//             cache.put(event.request, networkResponse.clone());
//             return networkResponse;
//           });
//         }).catch(() => {
//           // Provide a fallback response if the fetch fails
//           if (event.request.destination === 'document') {
//             return caches.match('/offline.html');
//           }
//         });
//       })
//   );
// });

// self.addEventListener('activate', event => {
//   const cacheWhitelist = [CACHE_NAME];
//   event.waitUntil(
//     caches.keys().then(cacheNames => {
//       return Promise.all(
//         cacheNames.map(cacheName => {
//           if (!cacheWhitelist.includes(cacheName)) {
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });