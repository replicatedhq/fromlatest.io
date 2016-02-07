var React = require('react');
var classNames = require('classnames');

var DockerfileEditor = require('components/DockerfileEditor');
var EmptyDockerfile = require('components/EmptyDockerfile');
var PerfectDockerfile = require('components/PerfectDockerfile');
var DockerfileAnalysis = require('components/DockerfileAnalysis');
var Docs = require('components/Docs');

var dockerfilelint = require('dockerfilelint');

var Analyze = React.createClass({
  getInitialState: function() {
    return {
      content: '',
      analysis: [],
      docName: ''
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


    window.ga('send', {
      hitType: 'event',
      eventCategory: 'Analysis',
      eventAction: analysis.length === 0 ? 'no-problems' : 'problems',
      eventLabel: 'Dockerfile analysis end with ' + (analysis.length === 0 ? 'no problems detected' : 'problems detected')
    });

    this.setState({analysis: analysis});
  },

  onShowDocs: function(docName) {
    this.setState({docName: docName});
  },

  onCloseDocs: function() {
    this.setState({docName: ''});
  },

  render: function() {
    var editorClasses = classNames('col-xs-6', {hidden: this.state.docName !== ''});
    var editor = (
      <div>
        <h3>Paste your Dockerfile here</h3>
        <DockerfileEditor onChange={this.handleInputChange}/>
      </div>
    );

    var analysisClasses = classNames('col-xs-6');
    var analysisStyles;
    if (this.state.docName === '') {
      analysisStyles = {paddingLeft: '20px', marginTop: '40px', paddingRight: '40px'};
    } else {
      analysisStyles = {paddingLeft: '40px', marginTop: '40px', paddingRight: '20px'};
    }
    var analysis;
    if (this.state.content.trim().length === 0) {
      analysis = <EmptyDockerfile />;
    } else {
      if (this.state.analysis.length === 0) {
        analysis = <PerfectDockerfile />;
      } else {
        analysis = <DockerfileAnalysis dockerfile={this.state.content} messages={this.state.analysis} onShowDocs={this.onShowDocs}/>;
      }
    }

    var docsClasses = classNames('col-xs-6', {hidden: this.state.docName === ''});
    var docs = (
      <Docs name={this.state.docName} onClose={this.onCloseDocs}/>
    );

    return (
      <div className="row">
        <div className="col-xs-12">
          <div className="row">
            <div className={editorClasses} style={{paddingLeft: '40px', marginTop: '40px', paddingRight: '20px'}}>
              {editor}
            </div>
            <div className={analysisClasses} style={analysisStyles}>
              {analysis}
            </div>
            <div className={docsClasses} style={{paddingLeft: '20px', paddingRight: '40px', marginTop: '40px'}}>
              {docs}
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Analyze;
