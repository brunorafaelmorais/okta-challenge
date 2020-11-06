import styled from 'styled-components';

export const TitleInfos = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.settings.gutterXl};
`;

export const Tab = styled.nav`
  width: 100%;
  display: flex;
  overflow-x: auto;
  border-bottom: 1px solid #dee2e6;
  margin-bottom: ${({ theme }) => theme.settings.gutterLg};
  padding-bottom: 1px;

  > button {
    border: 0;
    outline: none;
    height: 38px;
    line-height: 38px;
    padding: 0 0.75rem;
    background-color: transparent;
    position: relative;
  }

  > button::before {
    content: '';
    width: 0;
    height: 2px;
    position: absolute;
    bottom: -1px;
    left: 0;
    background-color: ${({ theme }) => theme.colors.primary};
    z-index: 1;
    transition: width 0.2s;
  }

  > button:not(:last-child) {
    margin-right: ${({ theme }) => theme.settings.gutterLg};
  }

  > button.active::before {
    width: 100%;
  }

  > button.active,
  > button:hover:not(.active) {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
