import React from 'react';

import logo from 'assets/from-latest-logo.png';

export default class Navbar extends React.Component{
  render() {
    return (
      <div  className="navbar">
        <a href="#"><img src={logo} alt='FROM latest' style={{width: '200px'}}/></a>

        <ul className="navbar-nav">
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
    );
  }
}
