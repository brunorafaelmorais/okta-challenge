import styled, { css } from 'styled-components';

interface Props {
  variant?: 'primary' | 'success' | 'info' | 'danger';
}

const bgs = {
  primary: css`
    background: linear-gradient(45deg, #f57c00, #ffb64d);
  `,
  success: css`
    background: linear-gradient(45deg, #2ca961, #2ed88a);
  `,
  info: css`
    background: linear-gradient(45deg, #3949ab, #2962ff);
  `,
  danger: css`
    background: linear-gradient(45deg, #e52d27, #b31217);
  `,
};

const colors = {
  primary: css`
    color: #f57c00;
  `,
  success: css`
    color: #2ca961;
  `,
  info: css`
    color: #3949ab;
  `,
  danger: css`
    color: #e52d27;
  `,
};

export const Container = styled.div<Props>`
  display: flex;
  align-items: center;
  border-radius: ${({ theme }) => theme.settings.radius};
  padding: ${({ theme }) => theme.settings.gutterMd};
  color: #fff;

  ${props => bgs[props.variant || 'primary']};
`;

export const IconAvatar = styled.div<Props>`
  width: 50px;
  height: 50px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;

  ${props => colors[props.variant || 'primary']};
`;

export const Content = styled.div`
  flex: 1 1;
  min-width: 0;

  > * {
    display: block;
  }

  > *:not(:last-child) {
    margin-bottom: 8px;
  }
`;
