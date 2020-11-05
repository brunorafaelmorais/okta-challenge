import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.settings.gutterXl};
`;

export const ContainerButton = styled.div`
  margin-top: 16px;
`;
