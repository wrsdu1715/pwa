if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./serviceWorker.js', {scope: '/'})
  .then(function(reg) {
    console.log('登録に成功しました。 Scopeは' + reg.scope);
  }).catch(function(error){
    console.log('登録に失敗しました。' + error);
  });
}