var React = require('react');

var DockerfileEditor = require('components/DockerfileEditor');
var EmptyDockerfile = require('components/EmptyDockerfile');
var DockerfileAnalysis = require('components/DockerfileAnalysis');

var dockerfilelint = require('dockerfilelint');

var Analyze = React.createClass({
  getInitialState: function() {
    return {
      content: ''
    };
  },

  handleInputChange: function(content) {
    this.setState({content: content});

    // analyze it
    window.ga('send', {
      hitType: 'event',
      eventCategory: 'Analysis',
      eventAction: 'start',
      eventLabel: 'Dockerfile analysis start'
    });

    var analysis = dockerfilelint.run(content);

    window.ga('send', {
      hitType: 'event',
      eventCategory: 'Analysis',
      eventAction: 'end',
      eventLabel: 'Dockerfile analysis end'
    });

    window.ga('send', {
      hitType: 'event',
      eventCategory: 'Analysis',
      eventAction: analysis.length === 0 ? 'no-problems' : 'problems',
      eventLabel: 'Dockerfile analysis start'
    });

    this.setState({analysis: analysis});
  },

  render: function() {
    var analysis;
    if (this.state.content.trim().length === 0) {
      analysis = <EmptyDockerfile />;
    } else {
      analysis = <DockerfileAnalysis dockerfile={this.state.content} messages={this.state.analysis}/>;
    }

    return (
      <div className="row">
        <div className="col-xs-12">
          <div className="row">
            <div className="col-xs-6" style={{paddingLeft: '40px', marginTop: '40px', paddingRight: '20px'}}>
              <h3>Paste your Dockerfile here</h3>
              <DockerfileEditor onChange={this.handleInputChange}/>
            </div>
            <div className="col-xs-6" style={{paddingLeft: '20px', marginTop: '60px', paddingRight: '40px'}}>
              {analysis}
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Analyze;
