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
        <tr>
          <td>{msg.line}</td>
          <td>{msg.name}</td>
          <td>{msg.message}</td>
        </tr>
      );
      nodes.push(annotation);
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Line</th>
            <th>Problem</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>
          {nodes}
        </tbody>
      </table>
    );
  }
});

module.exports = DockerfileAnalysis;
