import React, { ButtonHTMLAttributes } from 'react';
import { TypoButton } from '../Typography';

import { Container, ContainerProps } from './styles';

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    ContainerProps {}

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <Container type="button" {...rest}>
      <TypoButton>{children}</TypoButton>
    </Container>
  );
};

export default Button;
