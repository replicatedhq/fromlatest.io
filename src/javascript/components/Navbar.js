var React = require('react');

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
              <a href="#">About</a>
            </li>
            <li>
              <a href="https://github.com/replicatedhq/dockerfilelint">Contribute</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
});

module.exports = Navbar;
