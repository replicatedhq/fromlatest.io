import React from 'react';

import Navbar from 'components/Navbar';
import OverlayAlert from 'components/OverlayAlert';

export default class Layout extends React.Component{
  render() {
    return (
      <div>
        <div>
          <div className="container-fluid pad-navbar">
            {this.props.children}
          </div>
        </div>
        <div className="sidebar">
          <Navbar />
        </div>
        <footer>
          Made with <i className="fa fa-heart" /> by <a href="https://www.replicated.com">Replicated</a>.
        </footer>
        <OverlayAlert />
      </div>
    );
  }
}
