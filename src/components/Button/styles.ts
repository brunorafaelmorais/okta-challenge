import styled, { css } from 'styled-components';

interface ContainerProps {
  fullWidth?: boolean;
}

export const Container = styled.button<ContainerProps>`
  height: 40px;
  border: 0;
  outline: none;

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
      justify-content: center;
    `};
`;
