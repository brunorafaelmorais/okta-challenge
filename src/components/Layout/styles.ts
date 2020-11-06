import styled, { css } from 'styled-components';

interface NavLinkProps {
  isActive?: boolean;
}

interface OverlayProps {
  show?: boolean;
}

const headerHeight = '56px';

export const Container = styled.div`
  padding-top: ${headerHeight};

  > header {
    width: 100%;
    height: ${headerHeight};
    position: fixed;
    top: 0;
    left: 0;
    border-bottom: 1px solid #ddd;
    background-color: #fff;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  > aside {
    width: 250px;
    height: 100%;
    padding-top: ${headerHeight};
    background-color: ${({ theme }) => theme.colors.primary};
    position: fixed;
    top: 0;
    left: 0;
    transition: all 0.2s;
    z-index: 9;
  }

  > aside > div {
    padding: ${({ theme }) => theme.settings.gutterMd};
  }

  > section {
    padding: ${({ theme }) => theme.settings.gutterMd};
  }

  @media screen and (min-width: 1024px) {
    padding-left: 250px;

    > aside > div {
      padding: ${({ theme }) => theme.settings.gutterXl};
    }

    > section {
      padding: ${({ theme }) => theme.settings.gutterXl};
    }
  }

  @media screen and (max-width: 1024px) {
    > aside:not(.opened) {
      transform: translateX(-250px);
    }
  }
`;

export const ContainerLogo = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px ${({ theme }) => theme.settings.gutterMd};
  flex-shrink: 0;

  > img {
    width: 80px;
    max-width: 100%;
    max-height: 100%;
  }

  @media screen and (min-width: 1024px) {
    > img {
      width: auto;
    }

    width: 250px;
  }
`;

export const ContainerTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 1;
  min-width: 0;

  > h6 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
`;

export const NavLink = styled.div<NavLinkProps>`
  > a {
    height: 44px;
    display: block;
    line-height: 46px;
    color: ${({ theme }) => theme.colors.primaryContrast};
    text-transform: uppercase;
    font-weight: 500;
    padding: 0 ${({ theme }) => theme.settings.gutterMd};
    transition: background-color 0.2s;
  }

  ${({ isActive }) =>
    !isActive
      ? css`
          &:hover {
            background-color: ${({ theme }) => theme.colors.primaryShade};
          }
        `
      : css`
          background-color: ${({ theme }) => theme.colors.primaryTint};
        `}

  @media screen and (min-width: 1024px) {
    > a {
      padding: 0 ${({ theme }) => theme.settings.gutterXl};
    }
  }
`;

export const SidebarAvatar = styled.div`
  position: relative;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3);
  user-select: none;

  > figure {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    padding: 5px;
  }

  > figure > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }

  &::before {
    content: '';
    padding-top: 100%;
    display: block;
  }
`;

export const ContentAll = styled.div`
  width: 1200px;
  max-width: 100%;
  display: block;
  margin: 0 auto;
`;

export const BurguerMenu = styled.div`
  width: 48px;
  height: 48px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 4px;

  @media screen and (min-width: 1024px) {
    display: none;
  }
`;

export const Overlay = styled.div<OverlayProps>`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 8;
  transition: opacity 0.2s;
  opacity: 0;
  visibility: hidden;

  ${({ show }) =>
    show &&
    css`
      opacity: 1;
      visibility: visible;
    `}

  @media screen and (min-width: 1024px) {
    display: none;
  }
`;
