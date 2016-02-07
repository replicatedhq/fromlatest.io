var React = require('react');
var Router = require('react-router');

var RouteHandler = Router.RouteHandler;

var Navbar = require('components/Navbar');

var Layout = React.createClass({
  render: function() {
    return (
      <div>
        <Navbar />
        <div className="container-fluid pad-navbar">
          <RouteHandler />
        </div>
      </div>
    );
  }
});

module.exports = Layout;
