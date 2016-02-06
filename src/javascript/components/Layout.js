var React = require('react');

var Navbar = require('components/Navbar');
var Analyze = require('components/Analyze');

var Layout = React.createClass({
  render: function() {
    return (
      <div>
        <Navbar />
        <div className="container-fluid pad-navbar">
          <Analyze/>
        </div>
      </div>
    );
  }
});

module.exports = Layout;
