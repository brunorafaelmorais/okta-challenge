import { CampaignAction } from './CampaignAction';

export interface Campaign {
  _id: string;
  imgUrl: string;
  title: string;
  description: string;
  dateEnd: string;
  dateBegin: string;
  actions: CampaignAction[];
  createdAt: string;
  updatedAt: string;
  status?: string;
}
