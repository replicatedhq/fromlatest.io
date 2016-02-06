var React = require('react');

var Loading = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="col-sm-12 main">
          <h4>loading...</h4>
        </div>
      </div>
    );
  }
});

module.exports = Loading;
