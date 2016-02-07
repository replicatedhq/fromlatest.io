var React = require('react');

var turtle = require('assets/turtle.png');

var PerfectDockerfile = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="col-sm-12 main" style={{textAlign: 'center', paddingTop: '30px'}}>
          <img src={turtle} />
        </div>
      </div>
    );
  }
});

module.exports = PerfectDockerfile;
