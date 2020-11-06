import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import _ from 'lodash';

import { Campaign } from '../../models/Campaign';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';

interface ParamTypes {
  id: string;
}

const CampaignDetail: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [campaign, setCampaign] = useState<Campaign>({} as Campaign);

  const { addToast } = useToast();

  const { id } = useParams<ParamTypes>();

  const getCampaignById = useCallback(async () => {
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
  }, [addToast, id]);

  useEffect(() => {
    getCampaignById();
  }, [getCampaignById]);

  return (
    <div>
      {loading && <span>loading...</span>}

      {!_.isEmpty(campaign) && (
        <div>
          <span>{campaign.title}</span>
        </div>
      )}
    </div>
  );
};

export default CampaignDetail;
