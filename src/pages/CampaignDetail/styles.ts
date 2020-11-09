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

  .containerBtnAddAction {
    display: inline-flex;
    margin-left: ${({ theme }) => theme.settings.gutterSm};
  }

  > .left {
    display: flex;
    flex-direction: column;
    flex: 1 1;
    margin-right: ${({ theme }) => theme.settings.gutterXl};
  }

  > .left .group + .group {
    margin-top: ${({ theme }) => theme.settings.gutterXl};
  }

  > .right {
    flex-shrink: 0;
  }
`;

export const Image = styled.div`
  display: block;
  width: 250px;
  max-width: 100%;
  position: relative;

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
`;

export const TextInfo = styled.div<TextInfoProps>`
  color: rgba(0, 0, 0, 0.57);

  ${({ gutterTop }) =>
    gutterTop &&
    css`
      margin-top: ${({ theme }) => theme.settings.gutterXs};
    `};
`;
