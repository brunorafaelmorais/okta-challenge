import React, { useEffect } from 'react';
import { MdDateRange, MdToday, MdViewList } from 'react-icons/md';

import Card from '../../components/Card';
import Layout from '../../components/Layout';
import { useCampaign } from '../../hooks/campaign';

import { Container } from './styles';

const Dashboard: React.FC = () => {
  const { totalAllCampaigns, getAllCampaigns } = useCampaign();

  useEffect(() => {
    getAllCampaigns();
  }, [getAllCampaigns]);

  return (
    <Layout title="Infinity War Campaign">
      <Container>
        <Card
          type="success"
          primaryText="All campaigns"
          secondaryText={totalAllCampaigns}
          icon={MdViewList}
        />
        <Card
          type="info"
          primaryText="Active campaigns"
          secondaryText="7"
          icon={MdToday}
        />
        <Card
          type="danger"
          primaryText="Scheduled campaigns"
          secondaryText="7"
          icon={MdDateRange}
        />
      </Container>
    </Layout>
  );
};

export default Dashboard;
