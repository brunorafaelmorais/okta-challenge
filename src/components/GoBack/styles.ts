import styled from 'styled-components';

export const Container = styled.div`
  display: inline-flex;
  margin-bottom: ${({ theme }) => theme.settings.gutterXs};
  cursor: pointer;

  > svg {
    margin-left: -4px;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
