var Reflux = require('reflux');

var AlertActions = Reflux.createActions([
  'error',
  'success',
  'dismiss',
  'info'
]);

module.exports = AlertActions;
