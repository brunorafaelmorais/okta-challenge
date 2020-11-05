import React, { useCallback, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import Button from '../../components/Button';
import { TypoHeadline1, TypoSubtitle1 } from '../../components/Typography';
import { Container, ContainerButton } from './styles';

const NotFound: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    document.title = '404 Page Not Found';

    return () => {
      document.title = 'Oktagon Test';
    };
  }, []);

  const handleRedirect = useCallback(() => {
    history.push('/');
  }, [history]);

  return (
    <Container>
      <TypoHeadline1>404</TypoHeadline1>
      <TypoSubtitle1>
        Address <strong>{location.pathname}</strong> not found
      </TypoSubtitle1>
      <ContainerButton>
        <Button onClick={handleRedirect}>Back to the home page</Button>
      </ContainerButton>
    </Container>
  );
};

export default NotFound;
