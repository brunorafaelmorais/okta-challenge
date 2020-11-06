import React, { createContext, useContext, useState } from 'react';

import { Campaign } from '../models/Campaign';

interface CampaignCtxData {
  allCampaigns: Campaign[];
  campaign: Campaign;
}

const CampaignCtx = createContext<CampaignCtxData>({} as CampaignCtxData);

export const CampaignProvider: React.FC = ({ children }) => {
  const [allCampaigns] = useState<Campaign[]>([]);
  const [campaign] = useState<Campaign>({} as Campaign);

  return (
    <CampaignCtx.Provider value={{ allCampaigns, campaign }}>
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
