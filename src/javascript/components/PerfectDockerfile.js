var React = require('react');

var thumbsUp = require('assets/thumbs-up.png');

var PerfectDockerfile = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="col-sm-12 main" style={{textAlign: 'center', paddingTop: '30px'}}>
          <img src={thumbsUp} />
        </div>
      </div>
    );
  }
});

module.exports = PerfectDockerfile;
