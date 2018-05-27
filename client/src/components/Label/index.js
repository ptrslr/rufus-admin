// @flow
import * as React from 'react';
import styled, { css } from 'styled-components';

import { colors } from '../../constants/theme.js';

type Props = {
  for?: string,
  children: React.Node,
};

export const labelStyles = css`
  font-size: 0.8125rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${colors.grays[8]};
`;

const StyledLabel = styled.label.attrs({
  htmlFor: props => props.for,
})`
  ${labelStyles};

  display: block;
  margin-top: 0.75rem;
  margin-bottom: 0.5rem;

  white-space: nowrap;
`;
const Label = (props: Props) => {
  return <StyledLabel {...props}>{props.children}</StyledLabel>;
};

export default Label;
