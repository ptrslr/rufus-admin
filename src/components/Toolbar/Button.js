// @flow
import * as React from 'react';
import styled from 'styled-components';
import { hideVisually } from 'polished';

import { colors } from '../../utils/theme';
import ICONS from '../../constants/icons';
import Icon from '../Icon';

type Props = {
  active: boolean,
  label: string,
  icon: $Keys<typeof ICONS>,
  style: string,
  onClick: Function,
};

const StyledButton = styled.button`
  padding: 0.75rem;
  border: none;
  border-left: 1px solid ${colors.grays[2]};
  border-right: 1px solid ${colors.grays[2]};
  border-bottom: 1px solid ${colors.grays[2]};

  white-space: nowrap;
  user-select: none;
  cursor: pointer;
  appearance: none;
  background-color: white;
  outline: none;

  font-size: 1.3125rem;

  transition: background-color 150ms, border-color 150ms;

  & + & {
    border-left: none;
  }

  &:hover,
  &.is-active {
    background-color: ${colors.grays[1]};
  }
  &.is-active {
    border-bottom-color: ${colors.black};
  }

  &:active {
    background-color: ${colors.grays[2]};
  }
`;
const StyledIcon = styled(Icon)`
  display: block;
`;
const StyledLabel = styled.span`
  ${hideVisually};
`;

const Button = (props: Props) => {
  const { active, label, icon, onClick, style } = props;

  const onButtonClick = e => {
    e.preventDefault();
    onClick(style);
  };

  return (
    <StyledButton
      className={active ? 'is-active' : ''}
      onClick={onButtonClick}
      active={active}
    >
      <StyledIcon name={icon} />
      <StyledLabel>{label}</StyledLabel>
    </StyledButton>
  );
};

export default Button;
