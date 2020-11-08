import React, { useCallback } from 'react';
import { MdArrowBack } from 'react-icons/md';
import { useHistory } from 'react-router-dom';

import { Container } from './styles';

interface GoBackProps {
  url?: string;
}

const GoBack: React.FC<GoBackProps> = ({ url }) => {
  const history = useHistory();

  const goBack = useCallback(() => {
    if (url) {
      history.push(url);

      return;
    }

    history.goBack();
  }, [history, url]);

  return (
    <Container onClick={() => goBack()}>
      <MdArrowBack size={24} />
    </Container>
  );
};

export default GoBack;
