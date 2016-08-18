import React from 'react';

export default class About extends React.Component{
  render() {
    return (
      <div className="row" style={{padding: '50px'}}>
        <div className="col-md-12">
          <h2>Our goal</h2>
          <p>
            The goal of this project is to help Dockerfile authors create better and more portable Docker images.  This includes:
          </p>
          <ul>
            <li>Writing Dockerfiles that are maintainable</li>
            <li>Learning best practices that aren't always clearly documented</li>
            <li>Avoiding deprecated syntax</li>
            <li>Smallest possible images</li>
          </ul>
          <h2><i className="fa fa-github" /> Contribute</h2>
          <div className="row">
            <div className="col-md-6">
              The linter is available at replicatedhq/dockerfilelint<br />
              <iframe src="https://ghbtns.com/github-btn.html?user=replicatedhq&repo=dockerfilelint&type=star&count=true&size=large" frameBorder="0" scrolling="0" width="158px" height="30px"></iframe>
            </div>
            <div className="col-md-6">
              This site is available at replicatedhq/fromlatest.io<br />
              <iframe src="https://ghbtns.com/github-btn.html?user=replicatedhq&repo=fromlatest.io&type=star&count=true&size=large" frameBorder="0" scrolling="0" width="158px" height="30px"></iframe>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
