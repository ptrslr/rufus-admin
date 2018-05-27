// @flow
import * as React from 'react';
import styled, { css } from 'styled-components';

import { colors } from '../constants/theme';

const ProgressStyle = css`
  display: block;
  width: 100%;
  height: 0.375rem;
  border-radius: 0.5rem;
`;
const StyledProgress = styled.progress`
  ${ProgressStyle};

  -webkit-appearance: none;
  -moz-apperance: none;
  appearance: none;

  border: none;
  color: ${colors.primary};

  &::-webkit-progress-bar {
    background-color: ${colors.grays[2]};
    border-radius: 0.5rem;
  }
  &::-moz-progress-bar {
    background-color: ${colors.primary};
    border-radius: 0.5rem;
  }

  &::-webkit-progress-value {
    background-color: ${colors.primary};
    border-radius: 0.5rem;
  }
`;
const FallbackProgress = styled.div`
  ${ProgressStyle}
  background-color: ${colors.grays[2]};
`;
const FallbackValue = styled.div`
  background-color: ${colors.primary};
  border-radius: 0.5rem;
  text-indent: -9999px;
`;

type Props = {
  value: number,
  max: number,
  label?: string,
};
const Progress = (props: Props) => {
  return (
    <StyledProgress value={props.value} max={props.max}>
      <FallbackProgress>
        <FallbackValue>
          {props.value}&nbsp;
          {props.label}
        </FallbackValue>
      </FallbackProgress>
    </StyledProgress>
  );
};

export default Progress;
