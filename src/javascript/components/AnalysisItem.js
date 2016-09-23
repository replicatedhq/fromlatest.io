import React from 'react';
import marked  from 'marked';
import classNames from 'classnames';

import { Button } from 'react-bootstrap';

export default class AnalysisItem extends React.Component{
  constructor(props) {
    super(props);

    this.binder('onExpand', 'onCollapse');
  }

  binder(...methods) {
    methods.forEach(
      (method) => this[method] = this[method].bind(this)
    );
  }

  onExpand() {
    if (this.props.onExpand) {
      this.props.onExpand(this.props.item);
    }
  }

  onCollapse() {
    if (this.props.onCollapse) {
      this.props.onCollapse(this.props.item);
    }
  }

  render() {
    if (!this.props.item) {
      return <div></div>;
    }

    var classes = classNames('event-list', {'active': this.props.active});
    var category = this.props.item.category;
    category = category.replace(/\s/g, '');
    category = category.toLowerCase();

    var descriptionClasses = classNames('row', {hidden: !this.props.expanded});
    var bar;
    if (this.props.expanded) {
      bar = (
        <div className={'info ' + category} onClick={this.onCollapse}>
          <div className="row">
            <div className="col-md-10">
              <h4 className="desc"><strong>Line {this.props.item.line}:</strong> {this.props.item.title} ({this.props.item.category})</h4>
            </div>
            <div className="col-md-2" style={{textAlign: 'right'}}>
            <Button bsStyle="link" style={{fontSize: '12px', color: '#fff', margin: '4px 0px 0px'}} onClick={this.onCollapse}>
              <i className="fa fa-chevron-up" />
            </Button>
            </div>
          </div>
        </div>

      );
    } else {
      bar = (
        <div className={'info ' + category} onClick={this.onExpand}>
          <div className="row">
            <div className="col-md-10">
              <h4 className="desc"><strong>Line {this.props.item.line}:</strong> {this.props.item.title} ({this.props.item.category})</h4>
            </div>
            <div className="col-md-2" style={{textAlign: 'right'}}>
              <Button bsStyle="link" style={{fontSize: '12px', color: '#fff', margin: '4px 0px 0px'}} onClick={this.onExpand}>
                <i className="fa fa-chevron-down" />
              </Button>
            </div>
          </div>
        </div>

      );
    }


    return (
      <div className="row">
        <div className="col-md-12">
          <ul className={classes}>
            <li>
              {bar}
              <div className={descriptionClasses + ' description'}>
                <div className="col-md-12">
                  <div dangerouslySetInnerHTML={{__html: marked(this.props.item.description)}} />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
