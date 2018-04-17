// @flow
import * as React from 'react';
import styled from 'styled-components';
import { ellipsis } from 'polished';

import Avatar from '../Avatar';
import { colors } from '../../utils/theme';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;
const Body = styled.div`
  flex: 1 1 auto;
  overflow: hidden;
  padding-left: 0.625rem;
`;
const Name = styled.strong`
  ${ellipsis()};

  display: block;
  /*font-size: 1.125rem;*/
  line-height: 1.2;
`;
const Title = styled.div`
  ${ellipsis()};

  color: ${colors.grays[8]};
  font-size: 0.75rem;
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

type Props = {
  name: ?string,
  image?: ?string,
  title?: ?string,
};
const AvatarBox = (props: Props) => {
  const { name, title = null, image = null } = props;

  return (
    <Wrapper>
      <Avatar size="md" src={image} alt={name} />
      <Body>
        <Name>{name}</Name>
        {title ? <Title>{title}</Title> : ''}
      </Body>
    </Wrapper>
  );
};

export default AvatarBox;
