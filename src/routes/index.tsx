import React from 'react';
import { Switch, Route } from 'react-router-dom';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={() => <span>Dashboard</span>} />
      <Route path="/campaigns" component={() => <span>Campaigns</span>} />
    </Switch>
  );
};

export default Routes;
