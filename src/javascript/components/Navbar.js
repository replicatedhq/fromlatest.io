var React = require('react');
var ReactRouterBootstrap = require('react-router-bootstrap');

var NavItemLink = ReactRouterBootstrap.NavItemLink;

var Navbar = React.createClass({
  render: function() {
    return (
      <nav className="navbar navbar-default" role="navigation">
        <div className="navbar-header">
          <a className="navbar-brand" href="#">Dockerfile</a>
        </div>

        <div className="collapse navbar-collapse navbar-ex1-collapse">
          <ul className="nav navbar-nav">
            <li>
              <NavItemLink to="analyze">Analyze</NavItemLink>
            </li>
            <li>
              <NavItemLink to="about">About</NavItemLink>
            </li>
            <li>
              <a href="https://github.com/replicatedhq/dockerfilelint"><i className="fa fa-github" /> Contribute</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
});

module.exports = Navbar;
