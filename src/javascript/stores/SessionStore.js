var uuid = require('node-uuid');
var Reflux = require('reflux');

var SessionActions = require('actions/SessionActions');
var DB = require('services/DB');

var SessionStore = Reflux.createStore({
  listenables: [SessionActions],

  init: function () {
    this.initStore();
    this.session = this.getDefaultState();
    this.setSessionData(this.session);
    this.startAnonSession();
    this.session.loaded = true;
  },

  getInitialState: function () {
    return this.session;
  },

  isLoaded: function() {
    return this.session.loaded;
  },

  initStore: function() {
    this.db = new DB(window.localStorage.getItem('dockerfilereview.sessionid') !== null);
  },

  getDefaultState: function() {
    return {
      id: this.getSessionId(),
      loaded: false,
      user: null,
      team: null,
      invite: null,
      accessToken: null,
      needsOtp: false,
      auditLogLink: ''
    };
  },

  getSessionId: function() {
    var sessionId = this.db.getItem('dockerfilereview.sessionid');
    if (!sessionId) {
      sessionId = uuid.v4();
      this.setSessionId(sessionId);
    }
    return sessionId;
  },

  setSessionId: function(sessionId) {
    this.db.setItem('dockerfilereview.sessionid', sessionId);
  },

  getSessionData: function() {
    var data = this.db.getItem('dockerfilereview.data');
    if (data) {
      return JSON.parse(data);
    }
    return null;
  },

  setSessionData: function(data) {
    this.db.setItem('dockerfilereview.data', JSON.stringify(data));
  },

  updateSession: function() {
    this.setSessionData(this.session);
    this.trigger(this.session);
    SessionActions.change();
  },

  startAnonSession: function() {
  }
});

module.exports = SessionStore;
