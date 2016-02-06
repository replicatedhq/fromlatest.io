var React = require('react');
var Reflux = require('reflux');
var ReactBootstrap = require('react-bootstrap');

var AlertActions = require('actions/AlertActions');
var AlertStore = require('stores/AlertStore');

var Modal = ReactBootstrap.Modal;
var Button = ReactBootstrap.Button;

var OverlayAlert = React.createClass({
  mixins: [
    Reflux.connect(AlertStore, 'alert'),
    ReactBootstrap.OverlayMixin
  ],

  render: function() {
    return <span></span>;
  },

  renderOverlay: function() {
    if (!this.state.alert.visible) {
      return <span />;
    }

    var icon;
    switch (this.state.alert.severity) {
      case 'danger':
        icon = (
          <div className="sa-icon sa-error animate animateErrorIcon">
            <span className="sa-x-mark animateXMark">
              <span className="sa-line sa-left"></span>
              <span className="sa-line sa-right"></span>
            </span>
          </div>
        );
        break;
      // TODO: warning
      case 'success':
      default:
        icon = (
          <div>
            <div className="sa-icon sa-success animate">
              <span className="sa-line sa-tip animateSuccessTip"></span>
              <span className="sa-line sa-long animateSuccessLong"></span>
              <div className="sa-placeholder"></div>
              <div className="sa-fix"></div>
            </div>
          </div>
        );
        break;
    }

    var body;
    if (this.state.alert.options.html) {
      body = <p dangerouslySetInnerHTML={{__html: this.state.alert.body}} />;
    } else {
      body = <p>{this.state.alert.body}</p>;
    }

    return (
      <Modal
        title={icon}
        closeButton={false}
        onRequestHide={AlertActions.dismiss}
        className="repl-alert text-center">
        <div className="modal-body">
          <h3>{this.state.alert.title}</h3>
          {body}
        </div>
        <div className="modal-footer">
          <Button bsStyle="primary" onClick={AlertActions.dismiss}>Ok</Button>
        </div>
      </Modal>
    );
  }
});

module.exports = OverlayAlert;
