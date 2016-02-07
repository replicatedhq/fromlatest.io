var React = require('react');

var DockerfileAnalysis = React.createClass({

  getDefaultProps: function() {
    return {
      messages: []
    };
  },

  render: function() {
    var nodes = [];
    this.props.messages.forEach(function(msg) {
      var annotation = (
        <div key={msg.line + msg.name + msg.message}>
          <span style={{fontSize: '16px'}}>
            <strong>Line {msg.line}</strong>
          </span>
          <span>
            {' '}{msg.message}
          </span>
        </div>
      );
      nodes.push(annotation);
    });

    return (
      <div>
        <h3>Suggestions</h3>
        {nodes}
      </div>
    );
  }
});

module.exports = DockerfileAnalysis;
