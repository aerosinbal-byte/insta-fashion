self.addEventListener('install', e => {
  e.waitUntil(caches.open('insta-fashion-v1').then(cache => cache.addAll([
    '/', '/index.html', '/styles.css', '/app.js', '/assets/placeholder.jpg', '/assets/logo.svg'
  ])));
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});