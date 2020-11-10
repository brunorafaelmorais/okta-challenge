import styled, { css } from 'styled-components';

interface TextInfoProps {
  gutterTop?: boolean;
}

export const Container = styled.div``;

export const TitleContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.settings.gutterXl};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  .containerBtnAddAction {
    display: inline-flex;
    margin-left: ${({ theme }) => theme.settings.gutterSm};
  }

  > .left {
    display: flex;
    flex-direction: column;
    flex: 1 1;
  }

  > .left .group + .group {
    margin-top: ${({ theme }) => theme.settings.gutterXl};
  }

  > .right {
    flex-shrink: 0;
    margin-top: ${({ theme }) => theme.settings.gutterXl};
  }

  @media screen and (min-width: 768px) {
    flex-direction: row;

    > .left {
      margin-right: ${({ theme }) => theme.settings.gutterXl};
    }

    > .right {
      margin-top: 0;
    }
  }
`;

export const Image = styled.label`
  display: block;
  width: 250px;
  max-width: 100%;
  position: relative;
  cursor: pointer;

  > input {
    display: none;
  }

  &::before {
    content: '';
    padding-bottom: 100%;
    display: block;
  }

  > figure {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  > figure > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: ${({ theme }) => theme.settings.radius};
  }

  > .btn {
    width: 38px;
    height: 38px;
    position: absolute;
    bottom: ${({ theme }) => theme.settings.gutterSm};
    right: ${({ theme }) => theme.settings.gutterSm};
    background-color: rgba(37, 81, 124, 0.9);
    color: #fff;
    border: 0;
    outline: none;
    line-height: 32px;
    padding: 0 ${({ theme }) => theme.settings.gutterMd};
    border-radius: ${({ theme }) => theme.settings.radius};
    transition: background-color 0.2s;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      background-color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export const TextInfo = styled.div<TextInfoProps>`
  color: rgba(0, 0, 0, 0.57);

  ${({ gutterTop }) =>
    gutterTop &&
    css`
      margin-top: ${({ theme }) => theme.settings.gutterSm};
    `};
`;

export const EditContainer = styled.div`
  display: inline-flex;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const InnerTextTitle = styled.div`
  display: inline-flex;
  margin-right: ${({ theme }) => theme.settings.gutterSm};

  @media screen and (min-width: 1024px) {
    margin-right: ${({ theme }) => theme.settings.gutterXl};
  }
`;

export const CountData = styled.div`
  border-top: 1px solid #dee2e6;
  padding: 0.75rem;
`;
