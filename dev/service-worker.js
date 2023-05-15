
// Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v1';

var periodicUpdate = [
  'index.html',
  'bundle.js',
  'style_bundle.css',
  'global.css',
  'https://raw.githubusercontent.com/antonelepfl/ebrains-sim-cl-dev/usecases-data/usecases-info.json',
  'https://drive.ebrains.eu/api2/repos/',
  'https://validation.brainsimulation.eu/models',
];

const neverUseSW = [
  'https://iam.ebrains.eu/auth/',
  'livereload.js',
  '/dir/?',
  '/file/?',
  '/upload-link/?',
];

self.addEventListener('install', (evt) => {
  console.log('[ServiceWorker] Install');
});

self.addEventListener('activate', (evt) => {
  console.log('[ServiceWorker] Activate');
});

self.addEventListener('fetch', function (event) {
  if (event.request.method !== 'GET') return;
  if (neverUseSW.some(u => event.request.url.includes(u))) return;

  function updateInBackground() {
    if (!navigator.onLine) return;
    if (!periodicUpdate.some(f => event.request.url.includes(f))) return;

    fetch(event.request).then(function (response) {
      caches.open(CACHE_NAME).then(function (cache) {
        cache.put(event.request, response.clone());
      });
    });
  }

  event.respondWith(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.match(event.request).then(function (response) {
        if (response) {
          updateInBackground();
          return response;
        } else {
          return fetch(event.request).then(function (response) {
            cache.put(event.request, response.clone());
            return response;
          });
        }
      });
    }),
  );
});
