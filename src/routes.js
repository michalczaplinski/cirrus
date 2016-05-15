import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';

import App from './components/App';
import MainPage from './containers/MainPage';
import Hot from './containers/Hot';

export default (
  <Route path="/" component={App}>
    <IndexRedirect to="/hot"/>
    <Route path="hot" component={MainPage}/>
    <Route path="best" component={MainPage}/>
    <Route path="top" component={MainPage}/>
  </Route>
);
