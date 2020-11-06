import React, { useEffect, useState } from 'react';

import { Campaign } from '../../models/Campaign';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';

const Campaigns: React.FC = () => {
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

  return (
    <div>
      {loading && <span>loading...</span>}

      <ul>
        {campaigns.map(campaign => (
          <li key={campaign._id}>{campaign.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Campaigns;
