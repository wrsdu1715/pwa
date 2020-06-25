'use strict';

const CACHE_NAME = 'pwa'; //キャッシュさせる時のキャッシュ名
const urlsToCache = [
  './index.html',
  './common.css',
  './main.js',
  './manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);　//指定されているリソースをキャッシュ保存させる。
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        return response ? response : fetch(event.request);
      })
  );
});