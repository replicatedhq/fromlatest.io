var _ = require('lodash');
var React = require('react');
var ReactBootstrap = require('react-bootstrap');

var Input = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired
  },

  getValue: function() {
    var node = this.refs.input;
    if (node.isCheckboxOrRadio()) {
      return node.getChecked();
    } else {
      return node.getValue();
    }
    // TODO: select
  },

  handleOnChange: function() {
    if (this.props.onChange) {
      this.props.onChange(this.props.name, this.getValue());
    }
  },

  render: function() {
    var props = _.omit(this.props, 'autoComplete', 'onChange');
    return (
      <ReactBootstrap.Input
        ref="input"
        {...props}
        autoComplete={this.props.autoComplete || 'off'}
        onChange={this.handleOnChange} />
    );
  }
});

module.exports = Input;
