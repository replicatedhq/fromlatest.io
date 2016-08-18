import React from 'react';
import {Router, Route, useRouterHistory} from 'react-router';
import { render } from 'react-dom'
import {createHashHistory} from 'history'

import Layout from 'components/Layout';
import Analyze from 'components/Analyze';
import About from 'components/About';

require('font-awesome-webpack');
require('styles/main.less');

const history = useRouterHistory(createHashHistory)({ queryKey: false })

render((
  <Router history={history}>
    <Route component={Layout}>
      <Route path="/" component={Analyze} />
      <Route path="/about" component={About} />
    </Route>
  </Router>
), document.getElementById('content'));
