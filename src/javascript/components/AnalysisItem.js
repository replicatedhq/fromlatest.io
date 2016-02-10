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
        <Button bsStyle="link" style={{fontSize: '24px', color: '#aaa'}} onClick={this.onCollapse}>
          <i className="fa fa-chevron-down" />
        </Button>
      );
    } else {
      button = (
        <Button bsStyle="link" style={{fontSize: '24px', color: '#aaa'}} onClick={this.onExpand}>
          <i className="fa fa-chevron-right" />
        </Button>
      );
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-6">
            <ul className="event-list">
              <li>
                <div className="title">
                  <span>{this.props.item.category}</span>
                </div>
                <div className="info">
                  <div className="row">
                    <div className="col-xs-10">
                      <h2 className="title">Line {this.props.item.line}</h2>
                      <p className="desc">{this.props.item.title}</p>
                    </div>
                    <div className="col-xs-2" style={{marginTop: '12px', textAlign: 'right'}}>
                      {button}
                    </div>
                  </div>
                  <div className={descriptionClasses}>
                    <div className="col-xs-12">
                      <div dangerouslySetInnerHTML={{__html: marked(this.props.item.description)}} />
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = AnalysisItem;
