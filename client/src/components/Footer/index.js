// @flow
import * as React from 'react';
import styled from 'styled-components';

import { colors } from '../../constants/theme.js';

const Wrapper = styled.footer`
  display: flex;
  align-items: center;
  margin-top: auto;
  padding: 1rem;
  color: ${colors.grays[7]};
  font-size: 13px;
`;

const Footer = () => <Wrapper>Rufus &mdash; made in brno</Wrapper>;

export default Footer;
