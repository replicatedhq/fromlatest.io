import React from 'react';
import ReactBootstrap from 'react-bootstrap';
import * as _ from 'lodash';
import Alert from 'react-bootstrap/Alert';

var FlashActions = require('actions/FlashActions');
var FlashStore = require('stores/FlashStore');


export default class FlashMixin extends React.Component {
  componentWillMount() {
    this.state.flashes = [];
  }

  componentDidMount() {
    this.flashStoreUnsubscribe = FlashStore.listen(function (flashes) {
      var nextState = this.state;
      _.each(flashes, function (flash) {
        nextState.flashes.push(flash);
      });
      this.setState(nextState);
      FlashActions.clear();
    }.bind(this));
  }

  componentWillUnmount() {
    this.flashStoreUnsubscribe();
  }

  handleFlashClose = (flash) => {
    var nextState = this.state;
    nextState.flashes = _.filter(nextState.flashes, function (item) {
      return item !== flash;
    });
    this.setState(nextState);
  }

  clearFlash = () => {
    this.setState({ flashes: [] });
  }

  getFlash = () => {
    if (this.state.flashes && this.state.flashes.length) {
      return _.map(this.state.flashes, function (flash, i) {
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



  render() {
    return (
      <Alert bsstyle={this.props.severity} {...this.props}>
        {this.props.message}
      </Alert>
    );
  }
}
