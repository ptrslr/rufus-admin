// @flow
import * as React from 'react';
import styled from 'styled-components';
import Button from '../Button';

import icons from '../../constants/icons.js';
import { colors } from '../../constants/theme.js';

const Wrapper = styled.footer`
  /*display: flex;*/
  align-items: center;
  margin-top: auto;
  padding: 1rem;
  color: ${colors.grays[7]};
  font-size: 0.8125rem;
  text-align: center;
`;
const Copy = styled.div`
  margin-top: 0.5rem;
`;

type Props = {
  onLogout: Function,
};
const Footer = (props: Props) => (
  <Wrapper>
    <Button
      block={true}
      theme="link"
      iconLeft={icons.POWER}
      value="Log out"
      onClick={props.onLogout}
    />
    <Copy>Rufus &ndash; made in Brno</Copy>
  </Wrapper>
);

export default Footer;
