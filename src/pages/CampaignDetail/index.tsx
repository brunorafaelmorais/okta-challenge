import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import _ from 'lodash';

import Layout from '../../components/Layout';
import { Container } from './styles';
import GoBack from '../../components/GoBack';
import TitlePage from '../../components/TitlePage';
import Loader from '../../components/Loader';
import NoData from '../../components/NoData';
import { useCampaign } from '../../hooks/campaign';

interface ParamTypes {
  id: string;
}

const CampaignDetail: React.FC = () => {
  const { getCampaignById, resetCampaign, campaign, loading } = useCampaign();

  const { id } = useParams<ParamTypes>();

  useEffect(() => {
    getCampaignById(id);

    return () => resetCampaign();
  }, [getCampaignById, resetCampaign, id]);

  return (
    <Layout title="Infinity War Campaign">
      <Container>
        <GoBack />

        {loading && <Loader />}

        {_.isEmpty(campaign) && !loading && (
          <NoData text="Campaign not found" />
        )}

        {!_.isEmpty(campaign) && (
          <>
            <TitlePage text={campaign.title} />
          </>
        )}
      </Container>
    </Layout>
  );
};

export default CampaignDetail;
