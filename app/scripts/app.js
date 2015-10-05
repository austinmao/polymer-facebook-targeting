
(function(document) {
  'use strict';
  let app = document.querySelector('#app');
  app.addEventListener('dom-change', () => console.log('Our app is ready to rock!'));
  window.addEventListener('WebComponentsReady', () => {
    const ACCESS_TOKEN = '';
    const ACCOUNT = '';
    let app  = document.querySelector('app');
    let tabs = document.querySelector('paper-tabs');
    var appHeader = document.querySelector('app-header');
    var addLocation = document.querySelector('add-location');

    appHeader.account = ACCOUNT;
    appHeader.accessToken = ACCESS_TOKEN;

    addLocation.accessToken = ACCESS_TOKEN;
    tabs.select(0);
  });
})(document);
