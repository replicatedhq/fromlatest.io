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
      expandedItems: [],
      expandedGroups: ['possibleBugs', 'optimization', 'clarity', 'deprecation']
    };
  },

  onGroupToggle: function(groupName) {
    if (_.includes(this.state.expandedGroups, groupName)) {
      this.state.expandedGroups = _.without(this.state.expandedGroups, groupName);
    } else {
      this.state.expandedGroups.push(groupName);
    }
    this.setState({expandedGroups: this.state.expandedGroups});
  },

  onItemExpand: function(item) {
    this.state.expandedItems.push(item);
    this.setState({expandedItems: this.state.expandedItems});
  },

  onItemCollapse: function(item) {
    var expandedItems = this.state.expandedItems;
    expandedItems = _.without(expandedItems, item);
    this.setState({expandedItems: expandedItems});
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
        <AnalysisItem
          active={(this.props.selectionStart <= item.line) && (this.props.selectionStop >= item.line)}
          expanded={_.includes(this.state.expandedItems, item)}
          key={item.line + item.title}
          item={item} onExpand={this.onItemExpand}
          onCollapse={this.onItemCollapse}/>
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

    var groupHeaderIconClasses = {
      'possibleBugs':
        classNames('fa',
          {'fa-caret-down': _.includes(this.state.expandedGroups, 'possibleBugs'),
           'fa-caret-right': !_.includes(this.state.expandedGroups, 'possibleBugs')
         }),
      'optimization':
        classNames('fa',
          {'fa-caret-down': _.includes(this.state.expandedGroups, 'optimization'),
           'fa-caret-right': !_.includes(this.state.expandedGroups, 'optimization')
         }),
      'clarity':
        classNames('fa',
          {'fa-caret-down': _.includes(this.state.expandedGroups, 'clarity'),
           'fa-caret-right': !_.includes(this.state.expandedGroups, 'clarity')
         }),
      'deprecation':
        classNames('fa',
          {'fa-caret-down': _.includes(this.state.expandedGroups, 'deprecation'),
           'fa-caret-right': !_.includes(this.state.expandedGroups, 'deprecation')
         })
    };

    return (
      <div className="analysis">
        <div>
          <h3>
            <a href="#" onClick={this.onGroupToggle.bind(this, 'possibleBugs')}>
              <i className={groupHeaderIconClasses.possibleBugs} />
              {' '}
              Possible Bugs - {nodes.possibleBugs.length} found
            </a>
          </h3>
          <div className={classNames({'hidden': !_.includes(this.state.expandedGroups, 'possibleBugs')})}>
            {nodes.possibleBugs}
          </div>
        </div>
        <div>
          <h3>
            <a href="#" onClick={this.onGroupToggle.bind(this, 'optimization')}>
              <i className={groupHeaderIconClasses.optimization} />
              {' '}
              Optimization - {nodes.optimization.length} found
            </a>
          </h3>
          <div className={classNames({'hidden': !_.includes(this.state.expandedGroups, 'optimization')})}>
            {nodes.optimization}
          </div>
        </div>
        <div>
          <h3>
            <a href="#" onClick={this.onGroupToggle.bind(this, 'clarity')}>
              <i className={groupHeaderIconClasses.clarity} />
              {' '}
              Clarity - {nodes.clarity.length} found
            </a>
          </h3>
          <div className={classNames({'hidden': !_.includes(this.state.expandedGroups, 'clarity')})}>
            {nodes.clarity}
          </div>
        </div>
        <div>
          <h3>
            <a href="#" onClick={this.onGroupToggle.bind(this, 'deprecation')}>
              <i className={groupHeaderIconClasses.deprecation} />
              {' '}
              Deprecation - {nodes.deprecation.length} found
            </a>
          </h3>
          <div className={classNames({'hidden': !_.includes(this.state.expandedGroups, 'deprecation')})}>
            {nodes.deprecation}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = DockerfileAnalysis;
