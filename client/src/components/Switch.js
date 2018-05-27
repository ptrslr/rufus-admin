// @flow
import * as React from 'react';
import styled from 'styled-components';
import ReactSwitch from 'react-switch';
import { rgba } from 'polished';

import Icon from './Icon';
import icons from '../constants/icons';

import { colors } from '../constants/theme';

const StyledIcon = styled(Icon)`
  color: ${colors.white};
  padding: 0.25rem;
`;
const uncheckedIcon = <StyledIcon name={icons.CLOSE} />;
const checkedIcon = <StyledIcon name={icons.CHECK} />;

type Props = {
  id: string,
  checked: boolean,
  onChange: Function,
};
const Switch = (props: Props) => {
  return (
    <ReactSwitch
      onChange={props.onChange}
      checked={props.checked}
      activeBoxShadow={`0 0 0 2px ${rgba(colors.grays[5], 0.75)}`}
      offColor={colors.grays[3]}
      onColor={colors.primary}
      uncheckedIcon={uncheckedIcon}
      checkedIcon={checkedIcon}
      width={48}
      height={24}
      id={props.id}
    />
  );
};

export default Switch;
