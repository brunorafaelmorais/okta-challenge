import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-gap: ${({ theme }) => theme.settings.gutterMd};
  grid-template-columns: repeat(1, 1fr);
  justify-items: stretch;
  align-items: stretch;

  @media screen and (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;
