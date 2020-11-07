import React, { useCallback, useEffect, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { useToast } from '../../hooks/toast';
import Layout from '../../components/Layout';
import { TableContainer } from '../../components/TableContainer';
import { TitleInfos, Tab } from './styles';
import { TypoHeadline4 } from '../../components/Typography';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import NoData from '../../components/NoData';
import { useCampaign } from '../../hooks/campaign';

enum TabOptions {
  Recent = 0,
  Live = 1,
  Scheduled = 2,
}

const Campaigns: React.FC = () => {
  const [activeTab, setActiveTab] = useState(TabOptions.Recent);

  const { addToast } = useToast();
  const { getAllCampaigns, allCampaigns, loading } = useCampaign();

  useEffect(() => {
    getAllCampaigns();
  }, [addToast, getAllCampaigns]);

  const handleTab = useCallback((tab: number) => {
    setActiveTab(tab);
  }, []);

  return (
    <Layout title="Infinity War Campaign">
      <TitleInfos>
        <TypoHeadline4>Campaigns</TypoHeadline4>
        <Link to="/campaigns/new">
          <Button>New Campaign</Button>
        </Link>
      </TitleInfos>

      <Tab>
        <button
          className={clsx({ active: activeTab === TabOptions.Recent })}
          onClick={() => handleTab(TabOptions.Recent)}
          type="button"
        >
          Recent
        </button>
        <button
          className={clsx({ active: activeTab === TabOptions.Live })}
          onClick={() => handleTab(TabOptions.Live)}
          type="button"
        >
          Live
        </button>
        <button
          className={clsx({ active: activeTab === TabOptions.Scheduled })}
          onClick={() => handleTab(TabOptions.Scheduled)}
          type="button"
        >
          Scheduled
        </button>
      </Tab>

      {loading && !allCampaigns.length && <Loader />}

      {!allCampaigns.length && !loading && (
        <NoData text="No records to show." />
      )}

      {allCampaigns.length > 0 && (
        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Campaign</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th style={{ width: 90 }} />
              </tr>
            </thead>
            <tbody>
              {allCampaigns.map(campaign => (
                <tr key={campaign._id}>
                  <td>{campaign.title}</td>
                  <td>{campaign.dateBegin}</td>
                  <td>{campaign.dateEnd}</td>
                  <td>Live</td>
                  <td align="right">
                    <Link to={`/campaigns/${campaign._id}`}>
                      <MdEdit size={24} />
                    </Link>
                    <button type="button">
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
