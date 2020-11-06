import React from 'react';
import { Switch, Route } from 'react-router-dom';

import NotFoundPage from '../pages/NotFound';
import CampaignsPage from '../pages/Campaigns';
import CampaignDetailPage from '../pages/CampaignDetail';
import NewCampaignPage from '../pages/NewCampaign';
import NewActionPage from '../pages/NewAction';
import DashboardPage from '../pages/Dashboard';
import Layout from '../components/Layout';

const FakePage: React.FC = () => {
  return (
    <Layout title="Campaign XXX">
      <div>
        <span>Fake Page</span>
      </div>
    </Layout>
  );
};

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={DashboardPage} />

      <Route path="/campaigns" exact component={CampaignsPage} />
      <Route path="/campaigns/new" exact component={NewCampaignPage} />
      <Route path="/campaigns/:id" exact component={CampaignDetailPage} />
      <Route path="/campaigns/:id/new-action" exact component={NewActionPage} />

      <Route path="*" component={NotFoundPage} />
    </Switch>
  );
};

export default Routes;
