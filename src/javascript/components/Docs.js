var React = require('react');
var ReactBootstrap = require('react-bootstrap');

var Panel = ReactBootstrap.Panel;
var Button = ReactBootstrap.Button;

var Docs = React.createClass({
  getDocTitle: function() {
    switch (this.props.name) {
      case 'required_params':
        return 'Require Parameters';
      case 'uppercase_commands':
        return 'Capitalize Dockerfile Commands';
      case 'from_first':
        return 'First Command Must Be FROM';
      case 'invalid_line':
        return 'Invalid Line';
      case 'sudo_usage':
        return 'Use Of sudo Is Not Allowed';
      case 'apt-get_missing_param':
        return 'Missing parameter for apt-get';
      case 'apt-get_recommends':
        return 'Consider --no-install-recommends';
      case 'apt-get-upgrade':
        return 'apt-get upgrade Is Not Allowed';
      case 'apt-get-dist-upgrade':
        return 'apt-get dist-upgrade Is Not Allowed';
      case 'apt-get-update_require_install':
        return 'apt-get update without matching apt-get install';
      case 'invalid_port':
        return 'Invalid Port Exposed';
      case 'invalid_command':
        return 'Invalid Command';
      case 'expose_host_port':
        return 'Expose Only Container Port';
      case 'label_invalid':
        return 'Label Is Invalid';
      case 'missing_tag':
        return 'Base Image Missing Tag';
      case 'latest_tag':
        return 'Base Image Latest Tag';
      case 'extra_args':
        return 'Extra Arguments';
      case 'missing_args':
        return 'Missing Arguments';
      case 'add_src_invalid':
        return 'Invalid ADD Source';
      case 'add_dest_invalid':
        return 'Invalid ADD Destination';
      case 'invalid_workdir':
        return 'Invalid WORKDIR';
      case 'invalid_format':
        return 'Invalid Argument Format';
      case 'apt-get_missing_rm':
        return 'apt-get update with matching cache rm';
      default:
        return 'ERROR';
    }
  },

  getDocDescription: function() {
    switch (this.props.name) {
      case 'required_params':
        return 'All commands in a Dockerfile require at least 1 argument.';
      case 'uppercase_commands':
        return 'For clarity and readability, all commands in a Dockerfile should be uppercase.';
      case 'from_first':
        return 'The first command in a Dockerfile must specify the base image using a FROM command.  Additionally, FROM cannot appear later in a Dockerfile.';
      case 'invalid_line':
        return 'This line is not a valid Dockerfile line.';
      case 'sudo _usage':
        return 'Use of sudo is not allowed in a Dockerfile.';
      case 'apt-get_missing_param':
        return 'All usage of apt-get should include a -y flag to ensure it will not block while waiting for input.';
      case 'apt-get_recommends':
        return 'Consider using a --no-install-recommends when apt-get installing packages.  This will result in a smaller image size.';
      case 'apt-get-upgrade':
        return 'Use of apt-get upgrade is not allowed in a Dockerfile.';
      case 'apt-get-dist-upgrade':
        return 'Use of apt-get dist-upgrade is not allowed in a Dockerfile.';
      case 'apt-get-update_require_install':
        return 'All instances of apt-get update should have the apt-get install commands on the same line to reduce image size.';
      case 'invalid_port':
        return 'Exposing ports should only be valid port numbers.';
      case 'invalid_command':
        return 'Only valid commands are allowed in a Dockerfile.';
      case 'expose_host_port':
        return 'Using EXPOSE to specify a host port is not allowed.';
      case 'label_invalid':
        return 'Using LABEL should be in key=value format.';
      case 'missing_tag':
        return 'Base images should specify a tag to use.';
      case 'latest_tag':
        return 'Base images should not use the latest tag.';
      case 'extra_args':
        return 'This command has extra arguments and will be ignored.';
      case 'missing_args':
        return 'This commands requires additional arguments.';
      case 'add_src_invalid':
        return 'All files referenced in an ADD command should be part of the Docker build context.';
      case 'add_dest_invalid':
        return 'When adding multiple files, the destination should be a directory.';
      case 'invalid_workdir':
        return 'Using a WORKDIR parameter that has spaces should be escaped.';
      case 'invalid_format':
        return 'The arguments to this command are invalid';
      case 'apt-get_missing_rm':
        return 'Use of apt-get update should be paired with rm -rf /var/lib/apt/lists/* in the same layer.';
      default:
        return 'The documentation for this error was not found.';
    }
  },

  onCloseDocs: function() {
    if (this.props.onClose) {
      this.props.onClose();
    }
  },

  render: function() {
    return (
      <div>
        <h3>Explanation</h3>
        <Panel>
          <div>
            <strong>{this.getDocTitle()}</strong>
          </div>
          <div>
            {this.getDocDescription()}
          </div>
          <div className="pull-right">
            <Button bsSize="medium" bsStyle="danger" onClick={this.onCloseDocs}><i className="fa fa-chevron-left" /> Back</Button>
          </div>
        </Panel>
      </div>
    );
  }
});

module.exports = Docs;
