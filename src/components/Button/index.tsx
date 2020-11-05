import React, { ButtonHTMLAttributes } from 'react';

import { Container, ContainerProps } from './styles';

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    ContainerProps {}

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <Container type="button" {...rest}>
      {children}
    </Container>
  );
};

export default Button;
