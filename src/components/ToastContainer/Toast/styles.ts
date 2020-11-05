import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

interface ContainerProps {
  type?: 'success' | 'info' | 'error' | 'warning';
}

const toastTypeVariations = {
  success: css`
    color: #6ad764;
  `,
  info: css`
    color: #2e86eb;
  `,
  error: css`
    color: #f44336;
  `,
  warning: css`
    color: #ffc027;
  `,
};

export const Container = styled(animated.div)<ContainerProps>`
  width: 360px;
  position: relative;
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: ${({ theme }) =>
    `${theme.settings.gutterSm} ${theme.settings.gutterMd}`};
  border-radius: ${({ theme }) => theme.settings.radius};
  line-height: 1.4;
  border-left: 5px solid currentColor;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
  color: ${({ theme }) => theme.colors.primary};
  will-change: right, opacity;

  & + div {
    margin-top: ${({ theme }) => theme.settings.gutterSm};
  }

  > svg:first-of-type {
    margin-right: ${({ theme }) => theme.settings.gutterMd};
  }

  > svg:last-of-type {
    margin-left: ${({ theme }) => theme.settings.gutterSm};
    color: #999;
    transition: color 0.2s;
    cursor: pointer;
  }

  > svg:last-of-type:hover {
    color: #666;
  }

  > .content {
    flex: 1 1;
  }

  > .content > strong {
    text-transform: uppercase;
    display: block;
  }

  > .content > p {
    display: block;
    color: #777;
    margin-top: 4px;
  }

  ${props => toastTypeVariations[props.type || 'info']}
`;
