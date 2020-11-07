import React from 'react';

import { TypoSubtitle1 } from '../Typography';
import { Container, Center, ContainerText } from './styles';

const Loader: React.FC = () => {
  return (
    <Center>
      <Container>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </Container>
      <ContainerText>
        <TypoSubtitle1>Loading...</TypoSubtitle1>
      </ContainerText>
    </Center>
  );
};

export default Loader;
