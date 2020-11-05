import styled, { css } from 'styled-components';

export interface ContainerProps {
  fullWidth?: boolean;
  outlined?: boolean;
}

export const Container = styled.button<ContainerProps>`
  height: 38px;
  border: 0;
  outline: none;
  border-radius: ${({ theme }) => theme.settings.radius};
  padding: ${({ theme }) => `0 ${theme.settings.gutterLg}`};
  display: inline-flex;
  align-items: center;
  line-height: 1.5;
  transition: all 0.2s;

  ${({ outlined }) =>
    outlined
      ? css`
          border: 1px solid ${({ theme }) => theme.colors.primary};
          background-color: transparent;

          &:not(:hover) {
            color: #666666;
          }

          &:hover {
            color: ${({ theme }) => theme.colors.primaryContrast};
            border-color: ${({ theme }) => theme.colors.primary};
            background-color: ${({ theme }) => theme.colors.primary};
          }
        `
      : css`
          background-color: ${({ theme }) => theme.colors.primary};
          color: ${({ theme }) => theme.colors.primaryContrast};

          &:hover {
            background-color: ${({ theme }) => theme.colors.primaryTint};
          }
        `};

  & + & {
    margin-left: ${({ theme }) => theme.settings.gutterSm};
  }

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
      justify-content: center;
    `};
`;
