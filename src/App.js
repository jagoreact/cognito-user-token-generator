import React from 'react';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Landing from './pages/landing';
import Client from './pages/client';

function App() {
  return (

    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/client/:poolId/:clientId" component={Client} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
