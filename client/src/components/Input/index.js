// @flow
import * as React from 'react';
import styled from 'styled-components';

import { formControl, input } from '../../utils/styles';

type Props = {
  type?: string,
  children?: React.Node,
};

const StyledInput = styled.input`
  ${formControl} ${input};
`;
const Input = (props: Props) => {
  return <StyledInput {...props} />;
};

export default Input;
