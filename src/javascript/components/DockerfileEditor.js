var React = require('react');
var AceEditor = require('react-ace-wrapper');
var pubsub = require('pubsub-js');

require('brace/mode/dockerfile');
require('brace/theme/tomorrow_night_bright');
require('brace/ext/searchbox');

var DockerfileEditor = React.createClass({
  getInitialState: function() {
    return {
      initialValue: null,
      highlightedLineStart: -1,
      highlightedLineEnd: -1
    };
  },

  componentDidMount: function() {
    pubsub.subscribe('set.dockerfile', this.onSetDockerfile);
    this.onSetDockerfile('', this.props.dockerfile);
    var timer = setInterval(this.onTick, 50);
    this.setState({timer: timer});
  },

  componentWillUnmount: function() {
    pubsub.unsubscribe('set.dockerfile', this.onSetDockerfile);
    if (this.state.timer) {
      clearInterval(this.state.timer);
    }
  },

  onTick: function() {
    if (this.refs.editor) {
      var selectionRange = this.refs.editor.editor.getSelectionRange();
      if ((selectionRange.start.row + 1 !== this.state.highlightedLineStart) || (selectionRange.end.row + 1 !== this.state.highlightedLineEnd)) {
        this.state.hightlightedLineStart = selectionRange.start.row + 1;
        this.state.hightlightedLineEnd = selectionRange.end.row + 1;
        this.setState(this.state);
        if (this.props.onSelectionChange) {
          this.props.onSelectionChange(selectionRange.start.row + 1, selectionRange.end.row + 1);
        }
      }
    }
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
          fontSize={12}
          width="100%"
          onChange={this.onChange}
          height="100vh" />
      </form>
    );
  }
});

module.exports = DockerfileEditor;
