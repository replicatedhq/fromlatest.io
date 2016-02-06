var CookieStore = require('services/CookieStore');

var DB = function(persist) {
  // session storage or more permaneny local storage
  try {
    window.localStorage.setItem('dockerfilereview.test', 'test');
    window.localStorage.removeItem('dockerfilereview.test');
    this.store = persist ? window.localStorage : window.sessionStorage;
  } catch (e) {
    // private browsing?
    this.store = CookieStore;
  }
};

DB.prototype.getItem = function(key) {
  return this.store.getItem(key);
};

DB.prototype.setItem = function(key, value) {
  return this.store.setItem(key, value);
};

DB.prototype.removeItem = function(key) {
  return this.store.removeItem(key);
};

DB.prototype.clear = function() {
  window.localStorage.removeItem('dockerfilereview.sessionid');
  window.localStorage.removeItem('dockerfilereview.data');
  window.localStorage.clear();
  window.sessionStorage.removeItem('dockerfilereview.sessionid');
  window.sessionStorage.removeItem('dockerfilereview.data');
  window.sessionStorage.clear();
  CookieStore.removeItem('dockerfilereview.sessionid');
  CookieStore.removeItem('dockerfilereview.data');
};

module.exports = DB;
