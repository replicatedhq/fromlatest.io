import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';

import AnalysisItem from 'components/AnalysisItem';

export default class DockerfileAnalysis extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      expandedItems: [],
      expandedGroups: ['possibleBugs', 'optimization', 'clarity', 'deprecation']
    }
  }

  onGroupToggle(groupName) {
    if (_.includes(this.state.expandedGroups, groupName)) {
      this.state.expandedGroups = _.without(this.state.expandedGroups, groupName);
    } else {
      this.state.expandedGroups.push(groupName);
    }
    this.setState({expandedGroups: this.state.expandedGroups});
  }

  onItemExpand(item) {
    this.state.expandedItems.push(item);
    this.setState({expandedItems: this.state.expandedItems});
  }

  onItemCollapse(item) {
    var expandedItems = this.state.expandedItems;
    expandedItems = _.without(expandedItems, item);
    this.setState({expandedItems: expandedItems});
  }

  render() {
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
          <div className={classNames({'hidden': !_.includes(this.state.expandedGroups, 'possibleBugs')})}>
            {nodes.possibleBugs}
          </div>
        </div>

        <div>
          <div className={classNames({'hidden': !_.includes(this.state.expandedGroups, 'optimization')})}>
            {nodes.optimization}
          </div>
        </div>

        <div>
          <div className={classNames({'hidden': !_.includes(this.state.expandedGroups, 'clarity')})}>
            {nodes.clarity}
          </div>
        </div>
        <div>
          <div className={classNames({'hidden': !_.includes(this.state.expandedGroups, 'deprecation')})}>
            {nodes.deprecation}
          </div>
        </div>
      </div>
    );
  }
}

DockerfileAnalysis.defaultProps = {items: []};
