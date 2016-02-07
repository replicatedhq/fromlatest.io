var React = require('react');
var Router = require('react-router');
var ReactBootstrap = require('react-bootstrap');

var ReactBootstrapNavbar = ReactBootstrap.Navbar;

var Navbar = React.createClass({
  mixins: [
    Router.State,
    Router.Navigation
  ],

  render: function() {
    return (
      <ReactBootstrapNavbar inverse fixedTop fluid toggleNavKey={0}>
      </ReactBootstrapNavbar>
    );
  }
});

module.exports = Navbar;
