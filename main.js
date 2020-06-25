if('serviceWorker' in navigator) { //ブラウザがServiceWorkerに対応しているかチェックする。
  navigator.serviceWorker.register('./serviceWorker.js', {scope: '/'})　//ServiceWorkerを登録して、明示的にコントロールできる範囲を設定
  .then(function(reg) {
    console.log('登録に成功しました。 Scopeは' + reg.scope);
  }).catch(function(error){
    console.log('登録に失敗しました。' + error);
  });
}