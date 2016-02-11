var React = require('react');
var AceEditor = require('react-ace-wrapper');
var pubsub = require('pubsub-js');

require('brace/mode/dockerfile');
require('brace/theme/tomorrow_night_bright');
require('brace/ext/searchbox');

var DockerfileEditor = React.createClass({
  getInitialState: function() {
    return {
      initialValue: null
    };
  },

  componentDidMount: function() {
    pubsub.subscribe('set.dockerfile', this.onSetDockerfile);
    this.onSetDockerfile('', this.props.dockerfile);
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
      <form>
        <AceEditor
          ref="editor"
          mode="dockerfile"
          theme="tomorrow_night_bright"
          name="editor"
          fontSize="12px"
          width="100%"
          onChange={this.onChange}
          height="100vh" />
      </form>
    );
  }
});

module.exports = DockerfileEditor;
