import styled, { css } from 'styled-components';

interface ContainerProps {
  hasError?: boolean;
  label?: string;
}

export const Label = styled.span`
  display: block;
  color: rgba(0, 0, 0, 0.57);
  margin-bottom: ${({ theme }) => theme.settings.gutterXs};
`;

export const Container = styled.label<ContainerProps>`
  width: 200px;
  border: 1px solid #ccc;
  position: relative;
  cursor: pointer;
  display: block;
  border-radius: ${({ theme }) => theme.settings.radius};
  overflow: hidden;
  color: #ccc;
  transition: color, border-color 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }

  > input {
    display: none;
  }

  > div {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  > div > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &::before {
    content: '';
    padding-bottom: 100%;
    display: block;
  }

  ${props =>
    props.hasError &&
    css`
      border-color: #f44336;
    `}
`;

export const AddImage = styled.div`
  width: 50px;
  height: 50px;
`;
