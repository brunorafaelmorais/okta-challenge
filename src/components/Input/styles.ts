import styled, { css } from 'styled-components';

interface ContainerProps {
  hasError?: boolean;
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.div<ContainerProps>`
  position: relative;
  height: 50px;
  display: flex;
  align-items: center;
  border: 2px solid transparent;
  transition: border-color 0.2s;

  > input {
    width: 100%;
    height: inherit;
    background-color: transparent;
    outline: none;
    border: 0;
    line-height: 1.5;
    flex: 1 1;
  }

  &,
  > input::placeholder {
    /* define color */
  }

  ${props => props.isFocused && css``}

  ${props => props.isFilled && css``}
`;

export const Error = styled.div`
  color: #f44336;
`;
