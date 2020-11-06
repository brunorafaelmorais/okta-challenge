import React, { useCallback, useEffect, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { Campaign } from '../../models/Campaign';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import Layout from '../../components/Layout';
import { TableContainer } from '../../components/TableContainer';
import { TitleInfos, Tab } from './styles';
import { TypoHeadline4 } from '../../components/Typography';
import Button from '../../components/Button';

enum TabOptions {
  Recent = 0,
  Live = 1,
  Scheduled = 2,
}

const Campaigns: React.FC = () => {
  const [activeTab, setActiveTab] = useState(TabOptions.Recent);
  const [loading, setLoading] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  const { addToast } = useToast();

  useEffect(() => {
    setLoading(true);

    api
      .get<Campaign[]>('campaign')
      .then(response => setCampaigns(response.data))
      .then(() => setLoading(false))
      .catch(err => {
        setLoading(false);

        addToast({
          type: 'error',
          title: 'Error',
          description: err.message,
        });
      });
  }, [addToast]);

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
            <tr>
              <td>Title campaign</td>
              <td>00/00/0000</td>
              <td>00/00/0000</td>
              <td>Live</td>
              <td align="right">
                <button type="button">
                  <MdEdit size={24} />
                </button>
                <button type="button">
                  <MdDelete size={24} />
                </button>
              </td>
            </tr>
            <tr>
              <td>Title campaign</td>
              <td>00/00/0000</td>
              <td>00/00/0000</td>
              <td>Scheduled</td>
              <td align="right">
                <button type="button">
                  <MdEdit size={24} />
                </button>
                <button type="button">
                  <MdDelete size={24} />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </TableContainer>
    </Layout>
  );
};

export default Campaigns;
