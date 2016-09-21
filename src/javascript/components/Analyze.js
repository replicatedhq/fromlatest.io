import React from 'react';

import DockerfileEditor from 'components/DockerfileEditor';
import DockerfileAnalysis from 'components/DockerfileAnalysis';

import dockerfilelint from 'dockerfilelint';

export default class Analyze extends React.Component{
  constructor(props) {
    super(props);

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

    this.binder('handleSelectionChange', 'handleInputChange');

    this.state = {
      content: dockerfile,
      analysis: [],
      item: null,
      selectionStart: -1,
      selectionStop: -1
    }
  }

  binder(...methods) {
    methods.forEach(
      (method) => this[method] = this[method].bind(this)
    );
  }

  handleSelectionChange(start, stop) {
    this.state.selectionStart = start;
    this.state.selectionStop = stop;
    this.setState(this.state);
  }

  handleInputChange(content) {
    this.setState({content: content});

    // analyze it
    window.ga('send', {
      hitType: 'event',
      eventCategory: 'Analysis',
      eventAction: 'start',
      eventLabel: 'Dockerfile analysis start'
    });

    var analysis = dockerfilelint.run('', content);
    var resultLabel = analysis.length === 0 ? 'no problems detected' : 'problems detected';
    window.ga('send', {
      hitType: 'event',
      eventCategory: 'Analysis',
      eventAction: analysis.length === 0 ? 'no-problems' : 'problems',
      eventLabel: 'Dockerfile analysis end with ' + resultLabel
    });

    this.setState({analysis: analysis});
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-6" style={{paddingLeft: '0px'}}>
                <DockerfileEditor dockerfile={this.state.content} onChange={this.handleInputChange} onSelectionChange={this.handleSelectionChange}/>
              </div>
              <div className="col-md-6" >
                <DockerfileAnalysis
                  dockerfile={this.state.content}
                  items={this.state.analysis}
                  onShowDocs={this.onShowDocs}
                  selectionStart={this.state.selectionStart}
                  selectionStop={this.state.selectionStop}/>
              </div>
            </div>
          </div>
        </div>
        <footer>
          <p>{this.state.analysis.length} issue{this.state.analysis.length === 1 ? '' : 's'} found</p>
        </footer>
      </div>
    );
  }
}
