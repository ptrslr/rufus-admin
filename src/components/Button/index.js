// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { darken, rgba } from 'polished';

import { colors, space } from '../../utils/theme';
import { formControl } from '../../utils/styles';
import { ICONS } from '../../constants/icons';
import Icon from '../Icon';

const StyledButton = styled.button`
  ${formControl};

  display: inline-block;
  padding-left: 1em;
  padding-right: 1em;
  /*border: 1px solid ${props => darken(0.05, props.backgroundColor)};*/
  border: 1px solid ${props =>
    props.theme === 'primary' ? rgba('black', 0.075) : colors.grays[4]};

  color: ${props => (props.theme === 'primary' ? '#fff' : colors.black)};
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

  &:active {
    background: ${props => darken(0.15, props.backgroundColor)};
  }
`;

const IconLeft = styled(Icon)`
  ${props =>
    props.value
      ? `
    margin-right: ${space[0]};
    margin-left: -0.1875em;
  `
      : ''};
`;
const IconRight = styled(Icon)`
  ${props =>
    props.value
      ? `
    margin-right: -0.1875em;
    margin-left: ${space[0]};
  `
      : ''};
`;

type Props = {
  type?: string,
  value?: string,
  theme?: 'primary' | 'secondary',
  iconLeft?: $Keys<typeof ICONS>,
  iconRight?: $Keys<typeof ICONS>,
  onClick?: Function,
};

const Button = (props: Props) => {
  const { value, theme, iconLeft, iconRight, onClick, ...other } = props;

  const Button = props.to ? StyledButton.withComponent(Link) : StyledButton;

  const backgroundColor =
    (theme === 'primary' && colors.primary) || colors.grays[0];

  return (
    <Button
      backgroundColor={backgroundColor}
      theme={theme}
      onClick={onClick}
      {...other}
    >
      {iconLeft ? <IconLeft value={value} name={iconLeft} opticalAlign /> : ''}
      {value}
      {iconRight ? (
        <IconRight value={value} name={iconRight} opticalAlign />
      ) : (
        ''
      )}
    </Button>
  );
};

export default Button;
