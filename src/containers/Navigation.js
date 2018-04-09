// @flow
import * as React from 'react';
import styled from 'styled-components';

import Account from '../components//Account';
import Menu from '../components/MainMenu';
import Footer from '../components/Footer';

import { colors } from '../utils/theme';

type Props = {};

const Wrapper = styled.nav`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: ${colors.grays[0]};
  border-right: 1px solid ${colors.grays[1]};
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

const Navigation = (props: Props) => {
  return (
    <Wrapper>
      <Header>
        <Account />
      </Header>
      <Body>
        <Menu />
        <Footer />
      </Body>
    </Wrapper>
  );
};
export default Navigation;