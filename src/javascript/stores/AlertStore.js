var Reflux = require('reflux');

var AlertActions = require('actions/AlertActions');

var AlertStore = Reflux.createStore({
  listenables: [AlertActions],

  getInitialState: function () {
    this.alert = {
      severity: '',
      title: '',
      body: '',
      visible: false,
      options: {}
    };
    return this.alert;
  },

  onInfo: function(title, body, options) {
    this.alert.severity = 'info';
    this.alert.title = title;
    this.alert.body = body;
    this.alert.visible = true;
    this.alert.options = options || {};
    this.trigger(this.alert);
  },

  onError: function(title, body, options) {
    this.alert.severity = 'danger';
    this.alert.title = title;
    this.alert.body = body;
    this.alert.visible = true;
    this.alert.options = options || {};
    this.trigger(this.alert);
  },

  onSuccess: function(title, body, options) {
    this.alert.severity = 'success';
    this.alert.title = title;
    this.alert.body = body;
    this.alert.visible = true;
    this.alert.options = options || {};
    this.trigger(this.alert);
  },

  onDismiss: function() {
    this.alert.visible = false;
    this.trigger(this.alert);
  }
});

module.exports = AlertStore;
