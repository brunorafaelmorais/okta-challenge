import styled, { css } from 'styled-components';

interface ContainerProps {
  hasError?: boolean;
  isFocused: boolean;
  isFilled: boolean;
}

export const Label = styled.label`
  display: block;
  color: rgba(0, 0, 0, 0.57);
  margin-bottom: ${({ theme }) => theme.settings.gutterXs};
`;

export const Container = styled.div<ContainerProps>`
  height: 38px;
  border: 1px solid #ccc;
  transition: border-color 0.2s;
  border-radius: ${({ theme }) => theme.settings.radius};

  > input {
    width: 100%;
    height: inherit;
    background-color: transparent;
    outline: none;
    border: 0;
    line-height: 1.5;
    padding: ${({ theme }) => `0 ${theme.settings.gutterSm}`};
    font-size: 16px;
  }

  &,
  > input::placeholder {
    color: #999;
  }

  ${props =>
    props.isFocused &&
    css`
      border-color: ${props.theme.colors.primary};
    `}

  ${props =>
    props.hasError &&
    css`
      border-color: #f44336;
    `}

  ${props => props.isFilled && css``}
`;

export const Error = styled.div`
  color: #f44336;
  display: block;
  margin-top: 3px;
`;
