import styled from 'styled-components';

export const TitleInfos = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.settings.gutterXl};

  > .left,
  > .right {
    flex-shrink: 0;
  }

  > .middle {
    flex: 1 1;
    display: flex;
    justify-content: center;
    margin: ${({ theme }) => theme.settings.gutterSm} 0;

    > label {
      position: relative;
    }

    > label > svg {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 8px;
      fill: #ccc;
      pointer-events: none;
      margin: auto;
    }

    > label > input {
      height: 38px;
      border: 1px solid #ccc;
      transition: border-color 0.2s;
      border-radius: ${({ theme }) => theme.settings.radius};
      outline: none;
      padding: 0 ${({ theme }) => theme.settings.gutterSm};
      text-indent: 26px;
      width: 400px;
      max-width: 100%;
      line-height: 1.5;

      &:focus {
        border-color: ${({ theme }) => theme.colors.primary};
      }
    }
  }

  @media screen and (min-width: 1024px) {
    flex-direction: row;

    > .middle {
      padding: 0 ${({ theme }) => theme.settings.gutterSm};
      margin: 0;
    }
  }
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

export const CountData = styled.div`
  border-top: 1px solid #dee2e6;
  padding: 0.75rem;
`;
