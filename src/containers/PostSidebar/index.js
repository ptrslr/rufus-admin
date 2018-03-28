// @flow
import * as React from 'react';
import styled from 'styled-components';

import { colors } from '../../utils/theme';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: ${colors.white};
  border-left: 1px solid ${colors.grays[1]};
`;
const Header = styled.div`
  flex: 0 0 auto;
`;
const Body = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const PostSidebar = () => {
  return (
    <Wrapper>
      <Header>status</Header>
      <Body>some stuff</Body>
    </Wrapper>
  );
};

export default PostSidebar;
