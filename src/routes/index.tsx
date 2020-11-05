import React from 'react';
import { Switch, Route } from 'react-router-dom';

import NoMatch from '../components/NoMatch';

import CampaignsPage from '../pages/Campaigns';
import CampaignDetailPage from '../pages/CampaignDetail';
import NewCampaignPage from '../pages/NewCampaign';
import NewActionPage from '../pages/NewAction';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={() => <span>Dashboard</span>} />
      <Route path="/campaigns" exact component={CampaignsPage} />
      <Route path="/campaigns/new" exact component={NewCampaignPage} />
      <Route path="/campaigns/:id" exact component={CampaignDetailPage} />
      <Route path="/campaigns/:id/new-action" exact component={NewActionPage} />
      <Route path="*" component={NoMatch} />
    </Switch>
  );
};

export default Routes;
