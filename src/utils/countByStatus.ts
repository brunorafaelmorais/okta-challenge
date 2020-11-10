import { Campaign } from '../models/Campaign';

const countByStatus = (status: string) => (campaigns: Campaign[]): number =>
  campaigns.filter(campaign => campaign.status?.toLowerCase() === status)
    .length;

export default countByStatus;
