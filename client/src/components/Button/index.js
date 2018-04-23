// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { darken, rgba } from 'polished';

import { colors, space } from '../../utils/theme';
import { formControl, formControlLg } from '../../utils/styles';
import { icons } from '../../constants/icons';
import Icon from '../Icon';

const getBackgroundColor = (theme?: 'primary' | 'secondary' | 'link') => {
  return theme === 'primary' ? colors.primary : colors.grays[0];
};
const StyledButton = styled.button`
  ${formControl};

  display: inline-block;
  padding-left: 1em;
  padding-right: 1em;
  border: 1px solid
    ${props =>
      props.theme === 'primary' ? rgba('#000', 0.05) : colors.grays[5]};

  color: ${props => (props.theme === 'primary' ? '#fff' : colors.black)};
  background: ${props => getBackgroundColor(props.theme)};

  text-align: center;
  white-space: nowrap;
  user-select: none;
  cursor: pointer;
  transition: all 250ms;
  text-decoration: none;

  &:hover,
  &:focus {
    background: ${props => darken(0.075, getBackgroundColor(props.theme))};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${props => rgba(getBackgroundColor(props.theme), 0.5)};
  }

  &:active {
    background: ${props => darken(0.15, getBackgroundColor(props.theme))};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.2;
  }

  ${props =>
    props.size === 'lg' &&
    `
    ${formControlLg}
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  `};

  ${props =>
    props.block &&
    `
      display: block;
      width: 100%;
  `};

  ${props =>
    props.theme === 'link' &&
    `
    border-color: transparent;
    background: transparent;

    &:hover,
    &:focus {
      background: ${colors.grays[1]};
    }
  `};
`;
const StyledLink = StyledButton.withComponent(Link);

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
  theme?: 'primary' | 'secondary' | 'link',
  size?: 'sm' | 'lg',
  block?: boolean,
  iconLeft?: $Keys<typeof icons>,
  iconRight?: $Keys<typeof icons>,
  onClick?: Function,
  disabled?: boolean,
  to?: string,
};

const Button = (props: Props) => {
  const {
    value,
    iconLeft,
    iconRight,
    type = 'button',
    onClick,
    disabled = false,
    to,
    ...other
  } = props;

  if (to) {
    return (
      <StyledLink to={to} {...other}>
        {iconLeft ? (
          <IconLeft value={value} name={iconLeft} opticalAlign />
        ) : (
          ''
        )}
        {value}
        {iconRight ? (
          <IconRight value={value} name={iconRight} opticalAlign />
        ) : (
          ''
        )}
      </StyledLink>
    );
  }

  return (
    <StyledButton onClick={onClick} type={type} disabled={disabled} {...other}>
      {iconLeft ? <IconLeft value={value} name={iconLeft} opticalAlign /> : ''}
      {value}
      {iconRight ? (
        <IconRight value={value} name={iconRight} opticalAlign />
      ) : (
        ''
      )}
    </StyledButton>
  );
};

export default Button;
