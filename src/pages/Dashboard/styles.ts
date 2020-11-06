import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-gap: ${({ theme }) => theme.settings.gutterMd};
  grid-template-columns: repeat(1, 1fr);
  justify-items: stretch;
  align-items: stretch;

  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: ${({ theme }) => theme.settings.gutterXl};
  }
`;
