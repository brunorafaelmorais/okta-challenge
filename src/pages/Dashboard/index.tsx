import React from 'react';
import { MdDateRange, MdToday, MdViewList } from 'react-icons/md';

import Card from '../../components/Card';
import Layout from '../../components/Layout';

import { Container } from './styles';

const Dashboard: React.FC = () => {
  return (
    <Layout title="Infinity War Campaign">
      <Container>
        <Card
          type="success"
          primaryText="All campaigns"
          secondaryText="7"
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
