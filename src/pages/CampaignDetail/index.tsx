import React from 'react';
import { useParams } from 'react-router-dom';

interface ParamTypes {
  id: string;
}

const CampaignDetail: React.FC = () => {
  const { id } = useParams<ParamTypes>();

  return (
    <div>
      <span>
        campaign detail
        {id}
      </span>
    </div>
  );
};

export default CampaignDetail;
