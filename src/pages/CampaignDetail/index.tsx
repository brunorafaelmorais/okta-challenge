import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import _ from 'lodash';
import { MdDelete, MdEdit, MdCreate } from 'react-icons/md';
import Swal from 'sweetalert2';

import Layout from '../../components/Layout';
import {
  Container,
  Content,
  TitleContainer,
  TextInfo,
  Image,
  EditContainer,
  CountData,
  InnerTextTitle,
} from './styles';
import GoBack from '../../components/GoBack';
import Loader from '../../components/Loader';
import NoData from '../../components/NoData';
import { useCampaign } from '../../hooks/campaign';
import {
  TypoHeadline4,
  TypoBody1,
  TypoBody2,
  TypoSubtitle1,
} from '../../components/Typography';
import Button from '../../components/Button';
import { TableContainer } from '../../components/TableContainer';
import formatDate from '../../utils/formatDate';
import { CampaignAction } from '../../models/CampaignAction';
import ModalEditAction from '../../components/ModalEditAction';
import toBase64 from '../../utils/toBase64';
import ModalEditCampaign, {
  EditingCampaignFormData,
} from '../../components/ModalEditCampaign';
import { Campaign } from '../../models/Campaign';

interface ParamTypes {
  id: string;
}

const CampaignDetail: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAction, setEditingAction] = useState({} as CampaignAction);
  const [editingActionIndex, setEditingActionIndex] = useState(0);
  const [modalOpenCampaign, setModalOpenCampaign] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(
    {} as EditingCampaignFormData,
  );

  const { getCampaignById, updateCampaign, campaign, loading } = useCampaign();

  const { id } = useParams<ParamTypes>();

  useEffect(() => {
    getCampaignById(id);
  }, [getCampaignById, id]);

  const toggleModal = useCallback(() => {
    setModalOpen(state => !state);
  }, []);

  const toggleModalCampaign = useCallback(() => {
    setModalOpenCampaign(state => !state);
  }, []);

  const handleEditCampaign = useCallback(
    async (id: string, campaign: Campaign) => {
      const transformedCampaign = {
        title: campaign.title,
        description: campaign.description,
        dateBegin: formatDate(campaign.dateBegin, 'yyyy-MM-dd'),
        dateEnd: formatDate(campaign.dateEnd, 'yyyy-MM-dd'),
      };

      setEditingCampaign(transformedCampaign);

      toggleModalCampaign();
    },
    [toggleModalCampaign],
  );

  const handleUpdateCampaign = useCallback(
    async (campaign: EditingCampaignFormData) => {
      await updateCampaign(id, campaign);
    },
    [updateCampaign, id],
  );

  const handleEditAction = useCallback(
    (index: number, action: CampaignAction) => {
      setEditingActionIndex(index);
      setEditingAction(action);

      toggleModal();
    },
    [toggleModal],
  );

  const handleUpdateAction = useCallback(
    async (action: CampaignAction) => {
      const updatedActions = campaign.actions.map((item, index) => {
        if (index === editingActionIndex) {
          return action;
        }

        return item;
      });

      await updateCampaign(id, { actions: updatedActions });
    },
    [campaign.actions, editingActionIndex, updateCampaign, id],
  );

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

  const handleImageChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (file) {
        const imgUrl = (await toBase64(file)) as string;

        await updateCampaign(id, { imgUrl });
      }
    },
    [id, updateCampaign],
  );

  return (
    <Layout title="Infinity War Campaign">
      <ModalEditAction
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        editingAction={editingAction}
        handleUpdateAction={handleUpdateAction}
      />
      <ModalEditCampaign
        isOpen={modalOpenCampaign}
        setIsOpen={toggleModalCampaign}
        editingCampaign={editingCampaign}
        handleUpdateCampaign={handleUpdateCampaign}
      />
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
                <TypoHeadline4>
                  <InnerTextTitle>{campaign.title}</InnerTextTitle>
                  <EditContainer
                    onClick={() => handleEditCampaign(campaign._id, campaign)}
                  >
                    <TypoSubtitle1>Edit</TypoSubtitle1>
                  </EditContainer>
                </TypoHeadline4>
                <TextInfo gutterTop>
                  <TypoBody1>
                    Created on{' '}
                    {formatDate(campaign.createdAt, "MMM'.' dd',' yyyy")}
                  </TypoBody1>
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
                    {formatDate(campaign.dateBegin, "MMM'.' dd',' yyyy")} -{' '}
                    {formatDate(campaign.dateEnd, "MMM'.' dd',' yyyy")}
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
                  <TableContainer>
                    <table>
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Description</th>
                          <th>Start Date</th>
                          <th>End Date</th>
                          <th style={{ width: 90 }} />
                        </tr>
                      </thead>
                      <tbody>
                        {campaign.actions.map((action, index) => (
                          <tr key={index}>
                            <td>{action.title}</td>
                            <td>{action.description}</td>
                            <td>{formatDate(action.dateBegin, 'MM/dd/yy')}</td>
                            <td>{formatDate(action.dateEnd, 'MM/dd/yy')}</td>
                            <td align="right">
                              <button
                                onClick={() => handleEditAction(index, action)}
                                type="button"
                              >
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
                    <CountData>
                      <TypoBody2>
                        <strong>{campaign.actions.length} Action(s)</strong>
                      </TypoBody2>
                    </CountData>
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
                <Image htmlFor="fileImage">
                  <figure>
                    <img src={campaign.imgUrl} alt={campaign.title} />
                  </figure>
                  <input
                    type="file"
                    accept="image/png,image/jpg,image/jpeg"
                    id="fileImage"
                    onChange={handleImageChange}
                  />
                  <div className="btn">
                    <MdCreate size={24} />
                  </div>
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
