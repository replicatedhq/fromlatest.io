import React from 'react';

import logo from 'assets/from-latest-logo.png';

export default class Navbar extends React.Component{
  render() {
    return (
      <nav className="navbar navbar-default" role="navigation">
        <div className="navbar-header">
          <a className="navbar-brand" href="#"><img src={logo} alt='FROM latest' style={{width: '120px'}}/></a>
        </div>

        <div className="collapse navbar-collapse navbar-ex1-collapse">
          <ul className="nav navbar-nav">
            <li>
              <a href="/#">Analyze</a>
            </li>
            <li>
              <a href="/#/about">About</a>
            </li>
            <li>
              <a href="https://github.com/replicatedhq/dockerfilelint"><i className="fa fa-github" /> Contribute</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}