import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  border-radius: ${({ theme }) => theme.settings.radius};
  background-color: #dee2e6;
  padding: ${({ theme }) => theme.settings.gutterMd};
  margin: ${({ theme }) => theme.settings.gutterMd} 0;
  line-height: 1.5;
`;
