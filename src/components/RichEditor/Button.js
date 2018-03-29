// @flow
import * as React from 'react';
import styled from 'styled-components';

import { colors } from '../../utils/theme';
import ICONS from '../../constants/icons';
import Icon from '../Icon';

type Props = {
  onClick: Function,
  icon: $Keys<typeof ICONS>,
  style: string,
};

const StyledButton = styled.button`
  background-color: white;
  border: none;
  border-left: 1px solid ${colors.grays[2]};
  border-right: 1px solid ${colors.grays[2]};
  outline: none;

  transition: background-color 150ms;

  &:hover {
    background-color: ${colors.grays[1]};
  }
`;

const Button = (props: Props) => {
  const { onClick, icon, style } = props;

  const onButtonClick = e => {
    e.preventDefault();
    onClick(style);
  };

  return (
    <StyledButton onClick={onButtonClick}>
      <Icon name={icon} />
    </StyledButton>
  );
};

export default Button;
