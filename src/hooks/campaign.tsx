import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import _ from 'lodash';

import { Campaign } from '../models/Campaign';
import api from '../services/api';
import { useToast } from './toast';
import { CampaignAction } from '../models/CampaignAction';

interface CampaignCtxData {
  loading: boolean;
  allCampaigns: Campaign[];
  campaign: Campaign;
  totalAllCampaigns: number;
  getAllCampaigns(): Promise<void>;
  getCampaignById(id: string): Promise<void>;
  deleteCampaign(id: string): Promise<void>;
  updateCampaign(id: string, actions: CampaignAction[]): Promise<void>;
}

const CampaignCtx = createContext<CampaignCtxData>({} as CampaignCtxData);

export const CampaignProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [allCampaigns, setAllCampaigns] = useState<Campaign[]>([]);
  const [campaign, setCampaign] = useState<Campaign>({} as Campaign);

  const totalAllCampaigns = useMemo(() => allCampaigns.length, [allCampaigns]);

  const { addToast } = useToast();

  const getAllCampaigns = useCallback(async () => {
    setLoading(true);

    try {
      const response = await api.get<Campaign[]>('campaign');

      setAllCampaigns(response.data);
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Error',
        description: err.message,
      });
    } finally {
      setLoading(false);
    }
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

  const deleteCampaign = useCallback(
    async (id: string) => {
      try {
        await api.delete(`campaign/${id}`);

        setAllCampaigns(state => state.filter(campaign => campaign._id !== id));
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Error',
          description: err.message,
        });
      }
    },
    [addToast],
  );

  const updateCampaign = useCallback(
    async (id: string, actions: CampaignAction[]) => {
      try {
        const response = await api.put<Campaign>(`campaign/${id}`, { actions });

        setCampaign(response.data);

        addToast({
          type: 'success',
          title: 'Success',
          description: 'Campaign updated.',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Error',
          description: err.message,
        });
      }
    },
    [addToast],
  );

  return (
    <CampaignCtx.Provider
      value={{
        allCampaigns,
        campaign,
        loading,
        totalAllCampaigns,
        getAllCampaigns,
        getCampaignById,
        deleteCampaign,
        updateCampaign,
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
