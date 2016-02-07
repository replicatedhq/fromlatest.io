var React = require('react');
var ReactBootstrap = require('react-bootstrap');

var Button = ReactBootstrap.Button;

var DockerfileAnalysis = React.createClass({
  getDefaultProps: function() {
    return {
      messages: []
    };
  },

  onShowDocs: function(docName) {
    if (this.props.onShowDocs) {
      this.props.onShowDocs(docName);
    }
  },

  render: function() {
    var nodes = [];
    this.props.messages.forEach(function(msg) {
      var annotation = (
        <div key={msg.name + msg.line} className="container">
          <div className="row">
            <div className="col-xs-6">
              <ul className="event-list">
                <li>
                  <div className="title">
                    <span>Optimization</span>
                  </div>
                  <div className="info">
                    <div className="row">
                      <div className="col-xs-10">
                        <h2 className="title">Line {msg.line}</h2>
                        <p className="desc">{msg.message}</p>
                      </div>
                      <div className="col-xs-2" style={{marginTop: '12px', textAlign: 'right'}}>
                        <Button bsStyle="link" style={{fontSize: '24px', color: '#aaa'}} onClick={this.onShowDocs.bind(this, msg.name)}>
                          <i className="fa fa-chevron-right" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
      nodes.push(annotation);
    }.bind(this));

    return (
      <div>
        <h3>Suggestions</h3>
        {nodes}
      </div>
    );
  }
});

module.exports = DockerfileAnalysis;
