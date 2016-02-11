var React = require('react');
var marked = require('marked');
var classNames = require('classnames');
var ReactBootstrap = require('react-bootstrap');

var Button = ReactBootstrap.Button;

var AnalysisItem = React.createClass({
  onExpand: function() {
    if (this.props.onExpand) {
      this.props.onExpand(this.props.item);
    }
  },

  onCollapse: function() {
    if (this.props.onCollapse) {
      this.props.onCollapse(this.props.item);
    }
  },

  render: function() {
    if (!this.props.item) {
      return <div></div>;
    }

    var descriptionClasses = classNames('row', {hidden: !this.props.expanded});
    var button;
    if (this.props.expanded) {
      button = (
        <Button bsStyle="link" style={{fontSize: '24px', color: '#000'}} onClick={this.onCollapse}>
          <i className="fa fa-chevron-down" />
        </Button>
      );
    } else {
      button = (
        <Button bsStyle="link" style={{fontSize: '24px', color: '#000'}} onClick={this.onExpand}>
          <i className="fa fa-chevron-right" />
        </Button>
      );
    }
    return (
      <div className="row">
        <div className="col-md-12">
          <ul className="event-list">
            <li>
              <div className="title">
                <span>{this.props.item.category}</span>
              </div>
              <div className="info">
                <div className="row">
                  <div className="col-md-10">
                    <h4 className="desc"><strong>Line {this.props.item.line}</strong> {this.props.item.title}</h4>
                  </div>
                  <div className="col-md-2" style={{textAlign: 'right'}}>
                    {button}
                  </div>
                </div>
                <div className={descriptionClasses}>
                  <div className="col-md-12">
                    <div dangerouslySetInnerHTML={{__html: marked(this.props.item.description)}} />
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = AnalysisItem;
