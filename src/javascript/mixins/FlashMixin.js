var _ = require('lodash');
var React = require('react'); //eslint-disable-line no-unused-vars
var ReactBootstrap = require('react-bootstrap');

var Alert = ReactBootstrap.Alert;

var FlashActions = require('actions/FlashActions');
var FlashStore = require('stores/FlashStore');

var FlashMessage = React.createClass({
  render: function() {
    return (
      <Alert bsStyle={this.props.severity} {...this.props}>
        {this.props.message}
      </Alert>
    );
  }
});

var FlashMixin = {
  componentWillMount: function() {
    this.state.flashes = [];
  },

  componentDidMount: function() {
    this.flashStoreUnsubscribe = FlashStore.listen(function(flashes) {
      var nextState = this.state;
      _.each(flashes, function(flash) {
        nextState.flashes.push(flash);
      });
      this.setState(nextState);
      FlashActions.clear();
    }.bind(this));
  },

  componentWillUnmount: function() {
    this.flashStoreUnsubscribe();
  },

  handleFlashClose: function(flash) {
    var nextState = this.state;
    nextState.flashes = _.filter(nextState.flashes, function(item) {
      return item !== flash;
    });
    this.setState(nextState);
  },

  clearFlash: function() {
    this.setState({flashes: []});
  },

  getFlash: function() {
    if (this.state.flashes && this.state.flashes.length) {
      return _.map(this.state.flashes, function(flash, i) {
        return (
          <FlashMessage
            key={i}
            severity={flash.severity}
            message={flash.message}
            onDismiss={this.handleFlashClose.bind(this, flash)} />
        );
      }.bind(this));
    }
    return null;
  }
};

module.exports = FlashMixin;
