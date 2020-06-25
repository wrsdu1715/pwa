'use strict';

const CACHE_NAME = 'pwa'; //キャッシュさせる時のキャッシュ名
const urlsToCache = [
  './'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);　//指定されているリソースをキャッシュ保存させる。
      })
  );
});