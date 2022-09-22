console.info('Worker!');

const CACHE_VERSION = 'v1';

const RESOURCES = [
  '/',
  'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css'
];

self.addEventListener(
  'install',
  async (event) => {
    console.info('install', event);

    const cache = await caches.open(
      CACHE_VERSION
    );

    await cache.addAll(RESOURCES);

    return self.skipWaiting();
  }
);

self.addEventListener('activate', (event) => {
  console.info('activate', event);

  event.waitUntil(
    caches
      .open(CACHE_VERSION)
      .then((cache) => cache.keys())
      .then((keys) => deleteCache(keys))
      .then(() => self.clients.claim())
  );
});

function deleteCache(names) {
  return Promise.all(
    names
      .filter(
        (cacheName) => cacheName !== CACHE_VERSION
      )
      .map((cacheName) =>
        caches.delete(cacheName)
      )
  );
}

self.addEventListener('fetch', (event) => {
  console.info('fetch', event);

  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        if (response) {
          console.log(
            'Found ',
            event.request.url,
            ' in cache'
          );
          return response;
        }

        console.log(
          'Network request for ',
          event.request.url
        );

        return fetch(event.request).then(
          (response) => {
            caches
              .open(CACHE_VERSION)
              .then((cache) => {
                cache.put(
                  event.request.url,
                  response
                );
              })
              .catch((err) => console.error(err));

            return response.clone();
          }
        );
      })
      .catch((err) => console.error(err))
  );
});

self.addEventListener('sync', (event) => {
  console.info('sync', event);

  if (Notification.permission === 'granted') {
    if (event.tag === 'some-sync-tag') {
      self.registration.showNotification(
        'Some title',
        {
          body: 'this is long text'
          // icon: '<some icon>',
          // data: '<some data>'
        }
      );
    }
  } else {
    console.error(
      'Error: notification permissions denied.'
    );
  }
});

self.addEventListener('message', (event) =>
  console.info('message', event)
);

self.addEventListener('push', (event) =>
  console.info('push', event)
);
