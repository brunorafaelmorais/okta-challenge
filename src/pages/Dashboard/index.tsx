import React, { useEffect } from 'react';
import { MdDateRange, MdToday, MdViewList, MdCancel } from 'react-icons/md';

import Card from '../../components/Card';
import Layout from '../../components/Layout';
import { useCampaign } from '../../hooks/campaign';

import { Container } from './styles';

const Dashboard: React.FC = () => {
  const {
    totalAllCampaigns,
    totalLiveCampaigns,
    totalScheduleCampaigns,
    totalClosesCampaigns,
    getAllCampaigns,
  } = useCampaign();

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
          secondaryText={totalLiveCampaigns}
          icon={MdToday}
        />
        <Card
          type="danger"
          primaryText="Scheduled campaigns"
          secondaryText={totalScheduleCampaigns}
          icon={MdDateRange}
        />
        <Card
          type="primary"
          primaryText="Closed campaigns"
          secondaryText={totalClosesCampaigns}
          icon={MdCancel}
        />
      </Container>
    </Layout>
  );
};

export default Dashboard;
