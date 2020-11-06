import React, { ElementType } from 'react';
import { IconBaseProps } from 'react-icons';

import { TypoSubtitle2, TypoHeadline4 } from '../Typography';
import { Container, Content, IconAvatar } from './styles';

interface CardProps {
  type: 'primary' | 'success' | 'info' | 'danger';
  primaryText: string;
  secondaryText: string;
  icon: ElementType<IconBaseProps>;
}

const Card: React.FC<CardProps> = ({
  type,
  primaryText,
  secondaryText,
  icon: Icon,
}) => {
  return (
    <Container variant={type}>
      <Content>
        <TypoSubtitle2>{primaryText}</TypoSubtitle2>
        <TypoHeadline4>{secondaryText}</TypoHeadline4>
      </Content>
      <IconAvatar variant={type}>
        <Icon size={24} />
      </IconAvatar>
    </Container>
  );
};

export default Card;
