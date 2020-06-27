'use strict';

const CACHE_NAME = 'pwa2'; //キャッシュさせる時のキャッシュ名
const urlsToCache = [
  './',
  './index.html',
  './common.css',
  './main.js',
  './manifest.json'
];

self.addEventListener('install', (event) => { //install時
  event.waitUntil(
    caches.open(CACHE_NAME)　//キャッシュを開く
      .then((cache) => {
        return cache.addAll(urlsToCache);　//指定されているリソースをキャッシュに保存させる。
      })
  );
});

self.addEventListener('active', (event) => {
  var cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.add(
        cacheNames.map((cacheName) => {  //ホワイトリストにないキャッシュは削除させる。
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
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