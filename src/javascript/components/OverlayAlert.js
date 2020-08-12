import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
var AlertActions = require('actions/AlertActions');

export default class OverlayAlert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: null
    }
  }

  renderIcon() {
    if (this.state.alert.severity === 'danger') {
      return (
        <div className="sa-icon sa-error animate animateErrorIcon">
          <span className="sa-x-mark animateXMark">
            <span className="sa-line sa-left"></span>
            <span className="sa-line sa-right"></span>
          </span>
        </div>
      );
    } else {
      return (
        <div>
          <div className="sa-icon sa-success animate">
            <span className="sa-line sa-tip animateSuccessTip"></span>
            <span className="sa-line sa-long animateSuccessLong"></span>
            <div className="sa-placeholder"></div>
            <div className="sa-fix"></div>
          </div>
        </div>
      );
    }
  }

  renderBody() {
    if (this.state.alert.options.html) {
      return <p dangerouslySetInnerHTML={{ __html: this.state.alert.body }} />;
    } else {
      return <p>{this.state.alert.body}</p>;
    }
  }


  render() {
    if (!this.state.alert || !this.state.alert.visible) {
      return <span />;
    } else {
      return (
        <Modal
          title={this.renderIcon()}
          closeButton={false}
          onRequestHide={AlertActions.dismiss}
          className="repl-alert text-center">
          <div className="modal-body">
            <h3>aa</h3>
            {this.renderBody()}
          </div>
          <div className="modal-footer">
            <Button bsstyle="primary" onClick={AlertActions.dismiss}>Ok</Button>
          </div>
        </Modal>
      );
    }
  }
}
