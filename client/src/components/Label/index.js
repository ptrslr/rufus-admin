// @flow
import * as React from 'react';
import styled from 'styled-components';

import { colors } from '../../constants/theme.js';

type Props = {
  for?: string,
  children: React.Node,
};

const StyledLabel = styled.label.attrs({
  htmlFor: props => props.for,
})`
  display: block;
  margin-top: .75rem;
  margin-bottom: 0.5rem;
  font-size: 0.8125rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${colors.grays[8]};
  white-space: nowrap;
`;
const Label = (props: Props) => {
  return <StyledLabel {...props}>{props.children}</StyledLabel>;
};

export default Label;
