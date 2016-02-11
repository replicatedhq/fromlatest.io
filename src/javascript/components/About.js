var React = require('react');

var About = React.createClass({
  render: function() {
    return (
      <div className="row" style={{padding: '50px'}}>
        <div className="col-md-12">
          <h2>Our goal</h2>
          <p>
            The goal of this project is to help Dockerfile authors create better and more portable Docker images.  This includes:
            <ul>
              <li>Writing Dockerfiles that are maintainable</li>
              <li>Learning best practices that aren't always clearly documented</li>
              <li>Avoiding deprecated syntax</li>
              <li>Smallest possible images</li>
            </ul>
          </p>
        </div>
      </div>
    );
  }
});

module.exports = About;
