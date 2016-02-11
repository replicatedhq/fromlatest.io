var React = require('react');

var DockerfileEditor = require('components/DockerfileEditor');
var DockerfileAnalysis = require('components/DockerfileAnalysis');

var dockerfilelint = require('dockerfilelint');

var Analyze = React.createClass({
  getInitialState: function() {
    var dockerfile = '# This is a sample Dockerfile with a couple of problems.\n' +
                     '# Paste your Dockerfile here.\n\n' +
                     'FROM ubuntu:latest\n' +
                     'RUN apt-get update && \\\n' +
                     '    apt-get install -y make nasm && \\\n' +
                     '    rm -rf /var/lib/apt/lists/*\n\n' +
                     'WORKDIR /usr/src/hello\n' +
                     'copy . /usr/src/hello\n\n' +
                     'RUN make clean hello test\n\n' +
                     'CMD ["./hello"]';
    return {
      content: dockerfile,
      analysis: [],
      item: null
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
    var resultLabel = analysis.length === 0 ? 'no problems detected' : 'problems detected';
    window.ga('send', {
      hitType: 'event',
      eventCategory: 'Analysis',
      eventAction: analysis.length === 0 ? 'no-problems' : 'problems',
      eventLabel: 'Dockerfile analysis end with ' + resultLabel
    });

    this.setState({analysis: analysis});
  },

  render: function() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-7" style={{paddingLeft: '0px'}}>
              <DockerfileEditor dockerfile={this.state.content} onChange={this.handleInputChange}/>
            </div>
            <div className="col-md-5">
              <DockerfileAnalysis dockerfile={this.state.content} items={this.state.analysis} onShowDocs={this.onShowDocs}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Analyze;
