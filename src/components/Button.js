// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled, { extend, isStyledComponent } from 'styled-components';
import { darken, rgba } from 'polished';

import { colors, space } from '../utils/theme';
import { formControl } from '../utils/styles';
import { ICONS } from '../constants/icons';
import Icon from './Icon/Icon.js';

const StyledButton = styled.button`
  ${formControl};

  display: inline-block;

  color: #fff;
  background: ${props => props.backgroundColor};

  text-align: center;
  white-space: nowrap;
  user-select: none;
  cursor: pointer;
  transition: all 250ms;

  &:hover,
  &:focus {
    background: ${props => darken(0.075, props.backgroundColor)};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${props => rgba(props.backgroundColor, 0.5)};
  }
`;

type Props = {
  type?: string,
  value?: string,
  theme?: 'primary' | 'secondary',
  iconLeft?: $Keys<typeof ICONS>,
  iconRight?: $Keys<typeof ICONS>,
};

const Button = (props: Props) => {
  const { value, theme, iconLeft, iconRight, ...other } = props;

  const Button = props.to ? StyledButton.withComponent(Link) : StyledButton;

  const backgroundColor =
    (theme === 'primary' && colors.primary) || colors.grays[4];

  const IconLeft = styled(Icon)`
    ${props => (value ? `margin-right: ${space[1]};` : '')};
  `;
  const IconRight = styled(Icon)`
    ${props => (value ? `margin-left: ${space[1]};` : '')};
  `;

  return (
    <Button backgroundColor={backgroundColor} {...other}>
      {iconLeft ? <IconLeft name={iconLeft} opticalAlign /> : ''}
      {value}
      {iconRight ? <IconRight name={iconRight} opticalAlign /> : ''}
    </Button>
  );
};

export default Button;
