import React, { useCallback, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { MdMenu } from 'react-icons/md';
import clsx from 'clsx';

import Logo from '../../assets/images/logo.png';
import Thanos from '../../assets/images/thanos.jpg';
import { TypoHeadline6, TypoSubtitle1 } from '../Typography';
import {
  Container,
  ContainerLogo,
  ContainerTitle,
  Nav,
  NavLink,
  SidebarAvatar,
  ContentAll,
  BurguerMenu,
  Overlay,
} from './styles';

interface LayoutProps {
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ title, children }) => {
  const [asideOpen, setAsideOpen] = useState(false);

  const handleToggleAside = useCallback(() => {
    setAsideOpen(state => !state);
  }, []);

  const {
    location: { pathname },
  } = useHistory();

  return (
    <Container>
      <header>
        <ContainerLogo>
          <img src={Logo} alt="Logo Avengers" />
        </ContainerLogo>
        {title && (
          <ContainerTitle>
            <TypoHeadline6>{title}</TypoHeadline6>
          </ContainerTitle>
        )}
        <BurguerMenu onClick={() => handleToggleAside()}>
          <MdMenu size={24} />
        </BurguerMenu>
      </header>
      <Overlay show={asideOpen} onClick={() => handleToggleAside()} />
      <aside className={clsx({ opened: asideOpen })}>
        <div>
          <SidebarAvatar>
            <figure>
              <img src={Thanos} alt="Thanos" />
            </figure>
          </SidebarAvatar>
        </div>
        <Nav>
          <NavLink isActive={pathname === '/'}>
            <Link to="/">
              <TypoSubtitle1>Dashboard</TypoSubtitle1>
            </Link>
          </NavLink>
          <NavLink isActive={pathname.startsWith('/campaigns')}>
            <Link to="/campaigns">
              <TypoSubtitle1>Campaigns</TypoSubtitle1>
            </Link>
          </NavLink>
        </Nav>
      </aside>
      <section>
        <ContentAll>{children}</ContentAll>
      </section>
    </Container>
  );
};

export default Layout;
