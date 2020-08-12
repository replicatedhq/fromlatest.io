import React from 'react';
import Input from 'react-bootstrap/Input';
import PropTypes from 'prop-types';
import * as _ from 'lodash';

export default class Input extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired
  };

  getValue = () => {
    var node = this.refs.input;
    if (node.isCheckboxOrRadio()) {
      return node.getChecked();
    } else {
      return node.getValue();
    }
    // TODO: select
  }

  handleOnChange = () => {
    if (this.props.onChange) {
      this.props.onChange(this.props.name, this.getValue());
    }
  }

  render(){
    var props = _.omit(this.props, 'autoComplete', 'onChange');
    return (
      <Input
        ref="input"
        {...props}
        autoComplete={this.props.autoComplete || 'off'}
        onChange={this.handleOnChange} />
    );
  }
}
