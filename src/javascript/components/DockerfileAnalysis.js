var React = require('react');
var _ = require('lodash');

var AnalysisItem = require('components/AnalysisItem');

var DockerfileAnalysis = React.createClass({
  getDefaultProps: function() {
    return {
      items: []
    };
  },

  getInitialState: function() {
    return {
      expanded: []
    };
  },

  onItemExpand: function(item) {
    this.state.expanded.push(item);
    this.setState(this.state);
  },

  onItemCollapse: function(item) {
    var expanded = this.state.expanded;
    expanded = _.without(expanded, item);
    this.setState({expanded: expanded});
  },

  render: function() {
    var nodes = [];
    this.props.items.forEach(function(item) {
      var node = (
        <AnalysisItem expanded={_.includes(this.state.expanded, item)} key={item.line + item.title} item={item} onExpand={this.onItemExpand} onCollapse={this.onItemCollapse}/>
      );
      nodes.push(node);
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
