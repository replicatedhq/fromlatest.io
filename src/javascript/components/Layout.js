var React = require('react');
var Router = require('react-router');

var RouteHandler = Router.RouteHandler;

var Navbar = require('components/Navbar');

var Layout = React.createClass({
  render: function() {
    return (
      <div>
        <div>
          <div className="container-fluid pad-navbar">
            <RouteHandler />
          </div>
        </div>
        <div className="sidebar">
          <Navbar />
        </div>
        <footer>
          Made with <i className="fa fa-heart" /> by <a href="https://www.replicated.com">Replicated</a>.
        </footer>
      </div>
    );
  }
});

module.exports = Layout;
