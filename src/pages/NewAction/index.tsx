import React from 'react';
import { useParams } from 'react-router-dom';

interface ParamTypes {
  id: string;
}

const NewAction: React.FC = () => {
  const { id } = useParams<ParamTypes>();

  return (
    <div>
      <span>
        new action for id:
        {id}
      </span>
    </div>
  );
};

export default NewAction;
