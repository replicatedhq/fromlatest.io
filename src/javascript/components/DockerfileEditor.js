var React = require('react');
var AceEditor = require('react-ace-wrapper');
var pubsub = require('pubsub-js');

require('brace/mode/dockerfile');
require('brace/theme/tomorrow');
require('brace/ext/searchbox');

var DockerfileEditor = React.createClass({
  getInitialState: function() {
    return {
      initialValue: null
    };
  },

  componentDidMount: function() {
    pubsub.subscribe('set.dockerfile', this.onSetDockerfile);
  },

  componentWillUnmount: function() {
    pubsub.unsubscribe('set.dockerfile', this.onSetDockerfile);
  },

  onSetDockerfile: function(msg, content) {
    this.refs.editor.editor.setValue(content, -1);
  },

  componentDidUpdate: function() {
    if (this.refs.editor) {
      this.refs.editor.editor.setOption('useSoftTabs', true);
      this.refs.editor.editor.setOption('tabSize', 2);
      this.refs.editor.editor.setOption('cursorStyle', 'smooth');
    }
  },

  onChange: function(content) {
    if (this.props.onChange) {
      this.props.onChange(content);
    }
  },

  render: function() {
    return (
      <form style={{border: '1px solid #000'}}>
        <AceEditor
          ref="editor"
          mode="dockerfile"
          theme="tomorrow"
          name="editor"
          fontSize="16px"
          width="100%"
          onChange={this.onChange}
          height="initial" />
      </form>
    );
  }
});

module.exports = DockerfileEditor;
