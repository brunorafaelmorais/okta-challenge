import React, { useCallback, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import _ from 'lodash';
import { MdDelete, MdEdit } from 'react-icons/md';
import Swal from 'sweetalert2';

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
  const { getCampaignById, updateCampaign, campaign, loading } = useCampaign();

  const { id } = useParams<ParamTypes>();

  useEffect(() => {
    getCampaignById(id);
  }, [getCampaignById, id]);

  const handleDeleteAction = useCallback(
    (actionIndex: number) => {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#083a6b',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then(async result => {
        if (result.isConfirmed) {
          const updatedActions = campaign.actions.filter(
            (_, index) => index !== actionIndex,
          );

          await updateCampaign(id, { actions: updatedActions });
        }
      });
    },
    [campaign.actions, id, updateCampaign],
  );

  return (
    <Layout title="Infinity War Campaign">
      <Container>
        <GoBack url="/campaigns" />

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
                          <th style={{ width: 90 }} />
                        </tr>
                      </thead>
                      <tbody>
                        {campaign.actions.map((action, index) => (
                          <tr key={index}>
                            <td>{action.title}</td>
                            <td>{action.description}</td>
                            <td align="right">
                              <button type="button">
                                <MdEdit size={24} />
                              </button>
                              <button
                                onClick={() => handleDeleteAction(index)}
                                type="button"
                              >
                                <MdDelete size={24} />
                              </button>
                            </td>
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
