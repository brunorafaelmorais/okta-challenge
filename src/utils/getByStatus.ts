import { Campaign } from '../models/Campaign';

const getByStatus = (status: string) => (campaigns: Campaign[]): Campaign[] => {
  if (status === 'recent') {
    return campaigns;
  }

  const filteredCampaigns = campaigns.filter(
    campaign => campaign.status?.toLowerCase() === status,
  );

  return filteredCampaigns;
};

export default getByStatus;
