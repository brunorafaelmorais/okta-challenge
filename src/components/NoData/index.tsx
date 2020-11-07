import React from 'react';

import { TypoBody1 } from '../Typography';
import { Container } from './styles';

interface NoDataProps {
  text: string;
}

const NoData: React.FC<NoDataProps> = ({ text }) => {
  return (
    <Container>
      <TypoBody1>{text}</TypoBody1>
    </Container>
  );
};

export default NoData;
