import styled, { css } from 'styled-components';

interface ContainerFieldProps {
  dateRange?: boolean;
}

export const Container = styled.div`
  padding: ${({ theme }) => theme.settings.gutterMd};

  @media screen and (min-width: 1024px) {
    padding: ${({ theme }) => theme.settings.gutterXl};
  }
`;

export const ContainerField = styled.div<ContainerFieldProps>`
  & + & {
    margin-top: ${({ theme }) => theme.settings.gutterLg};
  }

  ${({ dateRange }) =>
    dateRange &&
    css`
      display: flex;
      justify-content: space-between;

      > div {
        width: calc(50% - 8px);
      }
    `}
`;

export const ContainerButtons = styled.div`
  margin-top: ${({ theme }) => theme.settings.gutterXl};
`;
