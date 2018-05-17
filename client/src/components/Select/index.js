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

  ${StyledSelect} [readonly="true"] + & {
    opacity: 0;
  }
`;

export type SelectOptions = Array<{ value: string, label: string }>;

type Props = {
  options: ?SelectOptions,
};

const Select = (props: Props) => {
  const { options = [], ...other } = props;

  return (
    <Wrapper>
      <StyledSelect {...other}>
        <option key="0" value="">
          &mdash; no category &mdash;
        </option>
        {options &&
          options.map(option => (
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
