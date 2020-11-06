import React from 'react';
import { TypoCaption } from '../Typography';

import { Container } from './styles';

interface FieldError {
  text: string;
}

const FieldError: React.FC<FieldError> = ({ text }) => {
  return (
    <Container>
      <TypoCaption>{text}</TypoCaption>
    </Container>
  );
};

export default FieldError;
