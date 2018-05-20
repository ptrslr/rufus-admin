// @flow
import * as React from 'react';
import styled from 'styled-components';
import { Switch, NavLink } from 'react-router-dom';

import { colors } from '../../constants/theme.js';

const StyledMenu = styled.ul`
  display: flex;
  height: 100%;
  padding: 0;
  margin: 0 0 0 2rem;

  list-style: none;
`;
const StyledItem = styled.li``;
const StyledLink = styled(NavLink)`
  position: relative;

  display: block;
  height: 100%;
  padding: 1.9rem 1rem 0;
  color: ${colors.grays[7]};
  text-decoration: none;

  &:before {
    content: '';
    position: absolute;
    top: 100%;
    left: 0;

    display: block;
    width: 100%;
    border-bottom: 2px solid transparent;
    margin-top: -1px;

    transition: border-color 250ms;
  }

  &:hover,
  &:focus {
    outline: none;
    /*background: ${colors.grays[0]};*/

    &:before {
      border-color: ${colors.grays[3]};
    }
  }

  &.active {
    color: ${colors.black};

    &:before {
      border-color: ${colors.black};
    }
  }
`;
const Count = styled.span`
  margin-left: .25rem;
`;

type ItemType = {
  label: string,
  to: string,
  count?: number,
};
type Props = {
  items: Array<ItemType>,
};
const Menu = (props: Props) => {
  const { items } = props;
  return (
    <Switch>
      <StyledMenu>
        {items.map((item, index) => (
          <StyledItem key={index}>
            <StyledLink exact to={item.to}>
              {item.label}
              {item.count != null && <Count>({item.count})</Count>}
            </StyledLink>
          </StyledItem>
        ))}
      </StyledMenu>
    </Switch>
  );
};

export default Menu;
