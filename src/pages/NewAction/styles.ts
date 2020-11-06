import styled, { css } from 'styled-components';

interface ContainerFieldProps {
  dateRange?: boolean;
}

export const Container = styled.div``;

export const ContainerField = styled.div<ContainerFieldProps>`
  & + & {
    margin-top: ${({ theme }) => theme.settings.gutterLg};
  }

  ${({ dateRange }) =>
    dateRange &&
    css`
      display: flex;
      flex: 0 1 auto;

      > div {
        flex-grow: 1;
        flex-basis: 0;
        max-width: 100%;
      }

      > div:first-child {
        margin-right: 8px;
      }

      > div:last-child {
        margin-left: 8px;
      }
    `}
`;

export const ContainerButtons = styled.div`
  margin-top: ${({ theme }) => theme.settings.gutterXl};
`;
