// @flow
import * as React from 'react';
import styled from 'styled-components';

import Icon from '../../components/Icon';
import icons from '../../constants/icons';
import { formControl, input } from '../../utils/styles';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;
const StyledSelect = styled.select`
  ${formControl};
  ${input};

  display: block;
  width: 100%;
  appearance: none;
  background-color: white;
`;
const StyledIcon = styled(Icon)`
  position: absolute;
  top: 50%;
  right: 0.5rem;

  margin-top: -0.5em;
  pointer-events: none;
  opacity: 1;
  transition: opacity 250ms;

  ${StyledSelect}[readonly] + & {
    opacity: 0;
  }
`;
type Props = {
  options: Array<{ value: string, label: string }>,
};
const Select = (props: Props) => {
  const { options, ...other } = props;

  return (
    <Wrapper>
      <StyledSelect {...other}>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))};
      </StyledSelect>

      <StyledIcon name={icons.CHEVRON_DOWN} />
    </Wrapper>
  );
};

export default Select;
