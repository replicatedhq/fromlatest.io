var React = require('react');
var Router = require('react-router');
var ReactBootstrap = require('react-bootstrap');

var Link = Router.Link;
var ReactBootstrapNavbar = ReactBootstrap.Navbar;

var Navbar = React.createClass({
  mixins: [
    Router.State,
    Router.Navigation
  ],

  render: function() {
    var brand = (
      <Link to={"/"} title="Dockerfile Review">
        Dockerfile Review
      </Link>
    );

    return (
      <ReactBootstrapNavbar brand={brand} inverse fixedTop fluid toggleNavKey={0}>
      </ReactBootstrapNavbar>
    );
  }
});

module.exports = Navbar;
