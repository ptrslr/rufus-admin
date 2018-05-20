// @flow
import * as React from 'react';
import styled from 'styled-components';
import { hideVisually } from 'polished';

import { colors } from '../../constants/theme.js';

const Wrapper = styled.div`
  display: inline-block;
`;
const Input = styled.input`
  ${hideVisually()};
`;
const RadioButton = styled.div`
  position: relative;
  width: 1rem;
  height: 1rem;

  border: 1px solid ${colors.grays[5]};
  border-radius: 100%;
  margin-top: 0.0625rem;
`;
const Indicator = styled.div`
  position: absolute;
  top: 3px;
  right: 3px;
  bottom: 3px;
  left: 3px;

  border-radius: 100%;
  background: ${colors.primary};
  opacity: 0;

  transition: opacity 150ms;

  ${Input}:checked + ${RadioButton} & {
    opacity: 1;
  }
`;

type Props = {
  name: string,
  value?: string,
  id?: string,
  onChange?: Function,
};

const Radio = (props: Props) => {
  return (
    <Wrapper>
      <Input type="radio" {...props} />
      <RadioButton>
        <Indicator />
      </RadioButton>
    </Wrapper>
  );
};

export default Radio;
