import { Campaign } from '../models/Campaign';

const totalCampaignsByStatus = (
  status: string,
  campaigns: Campaign[],
): number => {
  return campaigns.filter(campaign => campaign.status === status).length;
};

export default totalCampaignsByStatus;
