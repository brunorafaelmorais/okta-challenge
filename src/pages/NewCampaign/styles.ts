import styled from 'styled-components';

export const Container = styled.div``;

export const ContainerField = styled.div`
  & + & {
    margin-top: ${({ theme }) => theme.settings.gutterLg};
  }
`;

export const ContainerButtons = styled.div`
  margin-top: ${({ theme }) => theme.settings.gutterXl};
`;
