import React, { useCallback } from 'react';
import { MdArrowBack } from 'react-icons/md';
import { useHistory } from 'react-router-dom';

import { Container } from './styles';

const GoBack: React.FC = () => {
  const history = useHistory();

  const goBack = useCallback(() => {
    history.goBack();
  }, [history]);

  return (
    <Container onClick={() => goBack()}>
      <MdArrowBack size={24} />
    </Container>
  );
};

export default GoBack;
