'use strict';

const CACHE_NAME = 'pwa-v3'; //キャッシュさせる時のキャッシュ名
const urlsToCache = [
  './',
  './index.html',
  './common.css',
  './main.js',
  './manifest.json',
  '/images/index/hapikuru.jpg'
];

self.addEventListener('install', (event) => { //install時
  event.waitUntil(
    caches.open(CACHE_NAME)　//キャッシュを開く
      .then((cache) => {
        return cache.addAll(urlsToCache);　//指定されているリソースをキャッシュに保存させる。
      })
  );
});

// キャッシュcaches.openで開いて、cache.addAllで保存させる。
// event.waitUntilはPromiseをとって、インストールが成功仕方を確認するために使う。
//  ┗https://developer.mozilla.org/ja/docs/Web/API/ExtendableEvent/waitUntil
// ※ファイル数が多くなればなるほどキャッシュが失敗してService Workerがインストールされない確率も高くなる。



self.addEventListener('active', (event) => {
  var cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {  //ホワイトリストにないキャッシュは削除させる。
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName); //キャッシュを消す。
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {　//ページの更新などで、Service Workerはfetchイベントを受け取る。
  event.respondWith(
    caches.match(event.request) 
     .then((response) => {　
       if (response) {
         return response;
       }
       
       let fetchRequest = event.request.clone();
       return fetch(fetchRequest)
        .then((response) => {
          if(!response || response.status !== 200 || response.type !== 'basic') {
            //レスポンスが正しいか、レスポンスのステータスが200か、レスポンスの型がbasicか。（リクエストの送信元と送信先のドメインが同じである）
            return response;
          }

          let responseToCache = response.clone();
          cache.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache); //リクエストとレスポンスを受け取り指定されたキャッシュへ追加する。
            });
            return response;
        });
     })
  );
});