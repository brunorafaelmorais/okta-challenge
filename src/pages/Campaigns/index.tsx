import React, { useCallback, useEffect, useState } from 'react';
import { MdDelete, MdEdit, MdVisibility } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { parseISO, format } from 'date-fns';

import { useToast } from '../../hooks/toast';
import Layout from '../../components/Layout';
import { TableContainer } from '../../components/TableContainer';
import { TitleInfos } from './styles';
import { TypoHeadline4 } from '../../components/Typography';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import NoData from '../../components/NoData';
import { useCampaign } from '../../hooks/campaign';
import formatGridDate from '../../utils/formatGridDate';
import ModalEditCampaign, {
  EditingCampaignFormData,
} from '../../components/ModalEditCampaign';
import { Campaign } from '../../models/Campaign';

const Campaigns: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(
    {} as EditingCampaignFormData,
  );
  const [editingCampaignId, setEditingCampaignId] = useState('');

  const { addToast } = useToast();
  const {
    getAllCampaigns,
    deleteCampaign,
    updateCampaign,
    allCampaigns,
    loading,
  } = useCampaign();

  useEffect(() => {
    getAllCampaigns();
  }, [addToast, getAllCampaigns]);

  const toggleModal = useCallback(() => {
    setModalOpen(state => !state);
  }, []);

  const handleEditAction = useCallback(
    async (id: string, campaign: Campaign) => {
      setEditingCampaignId(id);

      const parsedDateBegin = parseISO(campaign.dateBegin);
      const parsedDateEnd = parseISO(campaign.dateEnd);

      const transformedCampaign = {
        title: campaign.title,
        description: campaign.description,
        dateBegin: format(parsedDateBegin, 'yyyy-MM-dd'),
        dateEnd: format(parsedDateEnd, 'yyyy-MM-dd'),
      };

      setEditingCampaign(transformedCampaign);

      toggleModal();
    },
    [toggleModal, setEditingCampaignId],
  );

  const handleUpdateCampaign = useCallback(
    async (campaign: EditingCampaignFormData) => {
      await updateCampaign(editingCampaignId, campaign);
      getAllCampaigns();
    },
    [updateCampaign, getAllCampaigns, editingCampaignId],
  );

  const handleDeleteCampaign = useCallback(
    (id: string) => {
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
          await deleteCampaign(id);
        }
      });
    },
    [deleteCampaign],
  );

  return (
    <Layout title="Infinity War Campaign">
      <ModalEditCampaign
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        editingCampaign={editingCampaign}
        handleUpdateCampaign={handleUpdateCampaign}
      />

      <TitleInfos>
        <TypoHeadline4>Campaigns</TypoHeadline4>
        <Link to="/campaigns/new">
          <Button>New Campaign</Button>
        </Link>
      </TitleInfos>

      {loading && !allCampaigns.length && <Loader />}

      {!allCampaigns.length && !loading && (
        <NoData text="No records to show." />
      )}

      {allCampaigns.length > 0 && (
        <TableContainer noGutterStart>
          <table>
            <thead>
              <tr>
                <th>Campaign</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th style={{ width: 120 }} />
              </tr>
            </thead>
            <tbody>
              {allCampaigns.map(campaign => (
                <tr key={campaign._id}>
                  <td>{campaign.title}</td>
                  <td>{formatGridDate(campaign.dateBegin)}</td>
                  <td>{formatGridDate(campaign.dateEnd)}</td>
                  <td>{campaign.status}</td>
                  <td align="right">
                    <button
                      onClick={() => handleEditAction(campaign._id, campaign)}
                      type="button"
                      title="Edit"
                    >
                      <MdEdit size={24} />
                    </button>
                    <Link to={`/campaigns/${campaign._id}`} title="See details">
                      <MdVisibility size={24} />
                    </Link>
                    <button
                      onClick={() => handleDeleteCampaign(campaign._id)}
                      type="button"
                      title="Delete"
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
    </Layout>
  );
};

export default Campaigns;
