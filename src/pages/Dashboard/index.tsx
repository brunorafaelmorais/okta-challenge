import React, { useEffect, useMemo } from 'react';
import { MdDateRange, MdToday, MdViewList } from 'react-icons/md';

import Card from '../../components/Card';
import Layout from '../../components/Layout';
import { useCampaign } from '../../hooks/campaign';

import { Container } from './styles';

const Dashboard: React.FC = () => {
  const { allCampaigns, getAllCampaigns } = useCampaign();

  const totalAllCampaigns = useMemo(() => allCampaigns.length, [allCampaigns]);

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
