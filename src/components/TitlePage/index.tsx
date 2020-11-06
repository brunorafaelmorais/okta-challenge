import React from 'react';
import { TypoHeadline4 } from '../Typography';

import { Container } from './styles';

interface TitlePageProps {
  text: string;
}

const TitlePage: React.FC<TitlePageProps> = ({ text }) => {
  return (
    <Container>
      <TypoHeadline4>{text}</TypoHeadline4>
    </Container>
  );
};

export default TitlePage;
