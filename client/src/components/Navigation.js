// @flow
import * as React from 'react';
import styled from 'styled-components';

import Account from './Account';
import Menu from './MainMenu';
import Footer from './Footer';

import role from '../constants/role.js';
import { colors } from '../constants/theme.js';

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

type Props = {
  name: string,
  image: string,
  role: ?$Values<typeof role>,
  onLogout: Function,
};

const Navigation = (props: Props) => {
  return (
    <Wrapper>
      <Header>
        <Account name={props.name} role={props.role} image={props.image} />
      </Header>
      <Body>
        <Menu />
        <Footer onLogout={props.onLogout} />
      </Body>
    </Wrapper>
  );
};
export default Navigation;
