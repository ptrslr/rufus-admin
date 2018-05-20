// @flow
import * as React from 'react';
import styled from 'styled-components';
import { hideVisually } from 'polished';

import { colors } from '../../constants/theme.js';
import icons from '../../constants/icons';
import Icon from '../Icon';

type Props = {
  active: boolean,
  label: string,
  icon: $Keys<typeof icons>,
  style: string,
  onClick: Function,
  type?: string,
};

const StyledButton = styled.button`
  padding: 0.75rem;
  border: none;
  border-left: 1px solid ${colors.grays[1]};
  border-right: 1px solid ${colors.grays[1]};
  border-bottom: 1px solid ${colors.grays[1]};

  white-space: nowrap;
  user-select: none;
  cursor: pointer;
  appearance: none;
  background-color: white;
  outline: none;

  font-size: 1.3125rem;

  transition: background-color 150ms, border-color 150ms;

  &:not(:last-child) {
    margin-right: -1px;
  }

  &:hover,
  &.is-active {
    background-color: ${colors.grays[1]};
  }
  &.is-active {
    border-bottom-color: ${colors.black};
  }

  &:active {
    background-color: ${colors.grays[1]};
  }
`;
const StyledIcon = styled(Icon)`
  display: block;
`;
const StyledLabel = styled.span`
  ${hideVisually};
`;

const Button = (props: Props) => {
  const { active, label, icon, onClick, style, type } = props;

  const onButtonClick = e => {
    e.preventDefault();
    onClick(style);
  };

  return (
    <StyledButton
      className={active ? 'is-active' : ''}
      onMouseDown={onButtonClick}
      active={active}
      type={type ? type : 'button'}
    >
      <StyledIcon name={icon} />
      <StyledLabel>{label}</StyledLabel>
    </StyledButton>
  );
};

export default Button;
