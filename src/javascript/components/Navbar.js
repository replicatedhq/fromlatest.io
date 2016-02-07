var React = require('react');
var Router = require('react-router');
var ReactBootstrap = require('react-bootstrap');
var request = require('superagent/lib/client');
var pubsub = require('pubsub-js');

var DropdownButton = ReactBootstrap.DropdownButton;
var ReactBootstrapNavbar = ReactBootstrap.Navbar;
var MenuItem = ReactBootstrap.MenuItem;
var Nav = ReactBootstrap.Nav;

var AlertActions = require('actions/AlertActions');
var Errors = require('services/Errors');

var Navbar = React.createClass({
  mixins: [
    Router.State,
    Router.Navigation
  ],

  getInitialState: function() {
    return {
      officialImages: {
        'busybox': 'https://raw.githubusercontent.com/docker-library/busybox/master/uclibc/Dockerfile',
        'swarm': 'https://raw.githubusercontent.com/docker/swarm-library-image/master/Dockerfile'
      }
    };
  },

  handleOfficialImageClick: function(imageName) {
    request
      .get(this.state.officialImages[imageName])
      .end(function(err, res) {
        if (err) {
          var errMsg = Errors.toString(err, res);
          AlertActions.error('Error', errMsg);
          return;
        }
        pubsub.publish('set.dockerfile', res.text);
      });
  },

  render: function() {
    var officialImagesNodes = [];
    for (var i in this.state.officialImages) {
      var node = <MenuItem onClick={this.handleOfficialImageClick.bind(this, i)}>{i}</MenuItem>;
      officialImagesNodes.push(node);
    }

    return (
      <ReactBootstrapNavbar inverse fixedTop fluid toggleNavKey={0}>
        <Nav right style={{display: 'none'}}>
          <DropdownButton title='Official Images'>
            {officialImagesNodes}
          </DropdownButton>
        </Nav>
      </ReactBootstrapNavbar>
    );
  }
});

module.exports = Navbar;
