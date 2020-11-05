import styled, { css } from 'styled-components';

interface TypoProps {
  fullWidth?: boolean;
  center?: boolean;
}

const TypoBase = styled.span<TypoProps>`
  color: inherit;

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      display: block;
      width: 100%;
    `};

  ${({ center }) =>
    center &&
    css`
      text-align: center;
    `};
`;

export const TypoHeadline1 = styled(TypoBase).attrs({ as: 'h1' })`
  font-size: 96px;
  letter-spacing: -1.5px;
`;

export const TypoHeadline2 = styled(TypoBase).attrs({ as: 'h2' })`
  font-size: 60px;
  letter-spacing: -0.5px;
`;

export const TypoHeadline3 = styled(TypoBase).attrs({ as: 'h3' })`
  font-size: 48px;
`;

export const TypoHeadline4 = styled(TypoBase).attrs({ as: 'h4' })`
  font-size: 34px;
  letter-spacing: 0.25px;
`;

export const TypoHeadline5 = styled(TypoBase).attrs({ as: 'h5' })`
  font-size: 24px;
`;

export const TypoHeadline6 = styled(TypoBase).attrs({ as: 'h6' })`
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 0.15px;
`;

export const TypoSubtitle1 = styled(TypoBase)`
  font-size: 16px;
  letter-spacing: 0.15px;
`;

export const TypoSubtitle2 = styled(TypoBase)`
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.1px;
`;

export const TypoBody1 = styled(TypoBase)`
  font-size: 16px;
  letter-spacing: 0.5px;
`;

export const TypoBody2 = styled(TypoBase)`
  font-size: 14px;
  letter-spacing: 0.25px;
`;

export const TypoButton = styled(TypoBase)`
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.25px;
`;

export const TypoCaption = styled(TypoBase)`
  font-size: 12px;
  letter-spacing: 0.4px;
`;

export const TypoOverline = styled(TypoBase)`
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
`;
