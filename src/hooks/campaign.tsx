import React, { createContext, useCallback, useContext, useState } from 'react';
import _ from 'lodash';

import { Campaign } from '../models/Campaign';
import api from '../services/api';
import { useToast } from './toast';

interface CampaignCtxData {
  loading: boolean;
  allCampaigns: Campaign[];
  campaign: Campaign;
  getAllCampaigns(): void;
  getCampaignById(id: string): Promise<void>;
  resetCampaign(): void;
}

const CampaignCtx = createContext<CampaignCtxData>({} as CampaignCtxData);

export const CampaignProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [allCampaigns, setAllCampaigns] = useState<Campaign[]>([]);
  const [campaign, setCampaign] = useState<Campaign>({} as Campaign);

  const { addToast } = useToast();

  const resetCampaign = useCallback(() => {
    setCampaign({} as Campaign);
  }, []);

  const getAllCampaigns = useCallback(() => {
    setLoading(true);

    api
      .get<Campaign[]>('campaign')
      .then(response => setAllCampaigns(response.data))
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

  const getCampaignById = useCallback(
    async (id: string) => {
      setLoading(true);

      try {
        const response = await api.get<Campaign | string>(`campaign/${id}`);

        if (!_.isObject(response.data) && _.isString(response.data)) {
          addToast({
            type: 'warning',
            title: 'Warning',
            description: response.data,
          });

          return;
        }

        setCampaign(response.data);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Error',
          description: err.message,
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast],
  );

  return (
    <CampaignCtx.Provider
      value={{
        allCampaigns,
        campaign,
        getAllCampaigns,
        getCampaignById,
        loading,
        resetCampaign,
      }}
    >
      {children}
    </CampaignCtx.Provider>
  );
};

export function useCampaign(): CampaignCtxData {
  const ctx = useContext(CampaignCtx);

  if (!ctx) {
    throw new Error('useCampaign must be used within a CampaignProvider');
  }

  return ctx;
}
