import React from 'react';
import _ from 'lodash';
import Navbar from 'components/Navbar';
import OverlayAlert from 'components/OverlayAlert';
import AnalysisItem from 'components/AnalysisItem';

export default class Layout extends React.Component{
  render() {
    return (
      <div>
        <div>
          <Navbar />
        </div>

        <div>
          <div className="container-fluid">
            {this.props.children}
          </div>
        </div>
        <OverlayAlert />
      </div>
    );
  }
}
