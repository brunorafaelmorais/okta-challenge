import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { MdDelete, MdEdit, MdSearch } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { parseISO, format } from 'date-fns';
import clsx from 'clsx';

import { useToast } from '../../hooks/toast';
import Layout from '../../components/Layout';
import { TableContainer } from '../../components/TableContainer';
import { TitleInfos, Tab, CountData } from './styles';
import { TypoBody2, TypoHeadline4 } from '../../components/Typography';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import NoData from '../../components/NoData';
import { useCampaign } from '../../hooks/campaign';
import formatDate from '../../utils/formatDate';
import ModalEditCampaign, {
  EditingCampaignFormData,
} from '../../components/ModalEditCampaign';
import { Campaign } from '../../models/Campaign';
import getByStatus from '../../utils/getByStatus';

const Campaigns: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [activeTab, setActiveTab] = useState('recent');
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

  const filteredCampaigns = useMemo(
    () => getByStatus(activeTab)(allCampaigns),
    [activeTab, allCampaigns],
  );

  useEffect(() => {
    getAllCampaigns();
  }, [addToast, getAllCampaigns]);

  const toggleModal = useCallback(() => {
    setModalOpen(state => !state);
  }, []);

  const handleEditCampaign = useCallback(
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

  const handleTab = useCallback((tab: string) => {
    setSearchValue('');
    setActiveTab(tab);
  }, []);
  return (
    <Layout title="Infinity War Campaign">
      <ModalEditCampaign
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        editingCampaign={editingCampaign}
        handleUpdateCampaign={handleUpdateCampaign}
      />

      <TitleInfos>
        <div className="left">
          <TypoHeadline4>Campaigns</TypoHeadline4>
        </div>
        <div className="middle">
          <label htmlFor="input-search">
            <MdSearch size={24} />
            <input
              type="text"
              value={searchValue}
              id="input-search"
              placeholder="Search for a campaign title..."
              onChange={e => setSearchValue(e.target.value)}
            />
          </label>
        </div>
        <div className="right">
          <Link to="/campaigns/new">
            <Button>New Campaign</Button>
          </Link>
        </div>
      </TitleInfos>

      <Tab>
        <button
          className={clsx({ active: activeTab === 'recent' })}
          onClick={() => handleTab('recent')}
          type="button"
        >
          Recent
        </button>
        <button
          className={clsx({ active: activeTab === 'live' })}
          onClick={() => handleTab('live')}
          type="button"
        >
          Live
        </button>
        <button
          className={clsx({ active: activeTab === 'schedule' })}
          onClick={() => handleTab('schedule')}
          type="button"
        >
          Scheduled
        </button>
        <button
          className={clsx({ active: activeTab === 'closed' })}
          onClick={() => handleTab('closed')}
          type="button"
        >
          Closed
        </button>
      </Tab>

      {loading && !allCampaigns.length && <Loader />}

      {!filteredCampaigns.length && !loading && (
        <NoData text="No records to show" />
      )}

      {filteredCampaigns.length > 0 && (
        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Campaign</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th style={{ width: 200 }} />
              </tr>
            </thead>
            <tbody>
              {filteredCampaigns
                // eslint-disable-next-line
                .filter(item => {
                  if (!searchValue) return true;

                  if (
                    item.title
                      .toLocaleLowerCase()
                      .includes(searchValue.toLocaleLowerCase())
                  ) {
                    return true;
                  }
                })
                .map(campaign => (
                  <tr key={campaign._id}>
                    <td>{campaign.title}</td>
                    <td>{formatDate(campaign.dateBegin, 'MM/dd/yy')}</td>
                    <td>{formatDate(campaign.dateEnd, 'MM/dd/yy')}</td>
                    <td>{campaign.status}</td>
                    <td align="right">
                      <Link
                        to={`/campaigns/${campaign._id}`}
                        title="More details"
                      >
                        more details
                      </Link>
                      <button
                        onClick={() => {
                          return handleEditCampaign(campaign._id, campaign);
                        }}
                        type="button"
                        title="Edit"
                      >
                        <MdEdit size={24} />
                      </button>
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
          <CountData>
            <TypoBody2>
              <strong>{filteredCampaigns.length} Campaign(s)</strong>
            </TypoBody2>
          </CountData>
        </TableContainer>
      )}
    </Layout>
  );
};

export default Campaigns;
