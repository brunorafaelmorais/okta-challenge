import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import _ from 'lodash';

import Layout from '../../components/Layout';
import { Container, Content, TitleContainer, TextInfo, Image } from './styles';
import GoBack from '../../components/GoBack';
import Loader from '../../components/Loader';
import NoData from '../../components/NoData';
import { useCampaign } from '../../hooks/campaign';
import {
  TypoHeadline4,
  TypoBody1,
  TypoBody2,
} from '../../components/Typography';
import Button from '../../components/Button';
import { TableContainer } from '../../components/TableContainer';

interface ParamTypes {
  id: string;
}

const CampaignDetail: React.FC = () => {
  const { getCampaignById, campaign, loading } = useCampaign();

  const { id } = useParams<ParamTypes>();

  useEffect(() => {
    getCampaignById(id);
  }, [getCampaignById, id]);

  return (
    <Layout title="Infinity War Campaign">
      <Container>
        <GoBack />

        {loading && <Loader />}

        {_.isEmpty(campaign) && !loading && (
          <NoData text="Campaign not found" />
        )}

        {!_.isEmpty(campaign) && !loading && (
          <Content>
            <div className="left">
              <TitleContainer>
                <TypoHeadline4>{campaign.title}</TypoHeadline4>
                <TextInfo gutterTop>
                  <TypoBody1>Created on {campaign.createdAt}</TypoBody1>
                </TextInfo>
              </TitleContainer>

              <div className="group">
                <TypoBody2>
                  <strong>Description</strong>
                </TypoBody2>
                <TextInfo gutterTop>
                  <TypoBody1>{campaign.description}</TypoBody1>
                </TextInfo>
              </div>

              <div className="group">
                <TypoBody2>
                  <strong>Schedule</strong>
                </TypoBody2>
                <TextInfo gutterTop>
                  <TypoBody1>
                    {campaign.dateBegin} - {campaign.dateEnd}
                  </TypoBody1>
                </TextInfo>
              </div>

              <div className="group">
                <TypoBody2>
                  <strong>Actions</strong>
                </TypoBody2>
                {!campaign.actions.length && (
                  <TextInfo gutterTop>
                    <TypoBody1>No actions added yet.</TypoBody1>
                  </TextInfo>
                )}

                {campaign.actions.length > 0 && (
                  <TableContainer noGutterStart>
                    <table>
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {campaign.actions.map((action, index) => (
                          <tr key={index}>
                            <td>{action.title}</td>
                            <td>{action.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </TableContainer>
                )}
              </div>

              <div className="group">
                <Link to="/campaigns">
                  <Button outlined>Save and exit</Button>
                </Link>
                <div className="containerBtnAddAction">
                  <Link to={`/campaigns/${id}/new-action`}>
                    <Button>Add action</Button>
                  </Link>
                </div>
              </div>
            </div>
            {campaign.imgUrl && (
              <div className="right">
                <Image>
                  <figure>
                    <img src={campaign.imgUrl} alt={campaign.title} />
                  </figure>
                </Image>
              </div>
            )}
          </Content>
        )}
      </Container>
    </Layout>
  );
};

export default CampaignDetail;
