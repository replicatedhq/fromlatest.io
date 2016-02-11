var React = require('react');
var _ = require('lodash');
var classNames = require('classnames');

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
    if (this.props.items.length === 0) {
      return (
        <div>
          <h3>
            No problems or suggestions found!
          </h3>
        </div>
      );
    }

    var nodes = {
      'possibleBugs': [],
      'optimization': [],
      'clarity': [],
      'deprecation': []
    };

    this.props.items.forEach(function(item) {
      var node = (
        <AnalysisItem expanded={_.includes(this.state.expanded, item)} key={item.line + item.title} item={item} onExpand={this.onItemExpand} onCollapse={this.onItemCollapse}/>
      );
      if (item.category === 'Possible Bug') {
        nodes.possibleBugs.push(node);
      } else if (item.category === 'Optimization') {
        nodes.optimization.push(node);
      } else if (item.category === 'Clarity') {
        nodes.clarity.push(node);
      } else if (item.category === 'Deprecation') {
        nodes.deprecation.push(node);
      }
    }.bind(this));

    return (
      <div className="analysis">
        <div className={classNames({hidden: nodes.possibleBugs.length === 0})}>
          <h3>Possible Bugs</h3>
          {nodes.possibleBugs}
        </div>
        <div className={classNames({hidden: nodes.optimization.length === 0})}>
          <h3>Optimization</h3>
          {nodes.optimization}
        </div>
        <div className={classNames({hidden: nodes.clarity.length === 0})}>
          <h3>Clarity</h3>
          {nodes.clarity}
        </div>
        <div className={classNames({hidden: nodes.deprecation.length === 0})}>
          <h3>Deprecation</h3>
          {nodes.deprecation}
        </div>
      </div>
    );
  }
});

module.exports = DockerfileAnalysis;
