var _ = require('lodash');
var React = require('react'); //eslint-disable-line no-unused-vars
var ReactBootstrap = require('react-bootstrap');
var ValidationMixin = require('react-validation-mixin');

var Alert = ReactBootstrap.Alert;

var FormMixin = {
  mixins: [ValidationMixin],

  handleChange: function(field, e) {
    var nextState = this.state;
    if (e.target.type === 'checkbox' || e.target.type === 'radio') {
      nextState[field] = e.target.checked;
    } else {
      nextState[field] = e.target.value;
    }
    // TODO: select???
    this.setState(nextState);
  },

  handleInputChange: function(field, value) {
    var nextState = this.state;
    nextState[field] = value;
    this.setState(nextState);
  },

  validationState: function(field) {
    if (!this.isValid(field)) {
      return 'error';
    }
  },

  getValidationErrorMessages: function() {
    var validationErrors = [];
    _.each(this.state.errors, function(errors) {
      if (errors && errors.length > 0) {
        validationErrors.push(errors[0]);
      }
    });
    return validationErrors;
  },

  getAlert: function(errors) {
    if (errors.length) {
      var nodeErrors = _.map(errors, function(error, i) {
        return <p key={i}>{error}</p>;
      });
      return (
        <Alert bsstyle="danger">
          {nodeErrors}
        </Alert>
      );
    }
    return null;
  }
};

module.exports = FormMixin;
