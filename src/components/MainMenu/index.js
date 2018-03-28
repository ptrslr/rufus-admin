// @flow
import * as React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import Icon from '../Icon';
import ICONS from '../../constants/icons.js';
import { colors, space } from '../../utils/theme';

const StyledMenu = styled.ul`
  padding: ${space[2]} 0;
  margin: 0;
  list-style: none;
`;
const Item = styled.li``;
const ItemLink = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem 0.5rem 1.75rem;

  font-size: 1.125rem;
  color: ${colors.black};
  text-decoration: none;
  transition: color 150ms, background-color 150ms;
  outline: none;

  &:hover,
  &:focus,
  &.active {
    background-color: ${colors.grays[2]};
  }
`;
const ItemIcon = styled(Icon)`
  margin-right: ${space[2]};
  font-size: 1.5rem;
  color: ${colors.grays[6]};
  transition: color 150ms;

  ${ItemLink}:hover &,
  ${ItemLink}:focus &,
  ${ItemLink}.active & {
    color: ${colors.black};
  }
`;

const Menu = () => (
  <StyledMenu>
    <Item>
      <ItemLink to="/posts">
        <ItemIcon name={ICONS.posts} />
        Posts
      </ItemLink>
    </Item>
    <Item>
      <ItemLink to="/pages">
        <ItemIcon name={ICONS.page} />
        Pages
      </ItemLink>
    </Item>
    <Item>
      <ItemLink to="/team">
        <ItemIcon name={ICONS.people} />
        Team
      </ItemLink>
    </Item>
    <Item>
      <ItemLink to="/settings">
        <ItemIcon name={ICONS.cog} />
        Settings
      </ItemLink>
    </Item>
  </StyledMenu>
);

export default Menu;
