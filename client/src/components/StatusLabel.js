// @flow
import * as React from 'react';
import styled from 'styled-components';

import Icon from './Icon';
import icons from '../constants/icons';
import status from '../constants/status';

import { colors } from '../constants/theme';

const Wrapper = styled.div`
  display: inline-block;
  padding: 0.375rem 0.5rem;
  border-radius: 3px;
  border: 1px solid rgba(0, 0, 0, .1);
  color: #004d84;
  background: #fbf1a9;

  ${props => `
    color: ${props.color};
    background-color: ${props.backgroundColor};
  `};
`;

type Pros = {
  status: $Values<typeof status> | 'scheduled',
};
const StatusLabel = (props: Props) => {
  switch (props.status) {
    case 'scheduled':
      return (
        <Wrapper backgroundColor={colors.washedYellow} color={colors.black}>
          <Icon name={icons.CLOCK} opticalAlign={true} />&thinsp; scheduled
        </Wrapper>
      );
    case status.PUBLISHED:
      return (
        <Wrapper backgroundColor={colors.washedGreen} color="#008638">
          <Icon name={icons.VISIBILITY} opticalAlign={true} />&thinsp; published
        </Wrapper>
      );
    case status.HIDDEN:
      return (
        <Wrapper backgroundColor={colors.washedRed} color="#86000b">
          <Icon name={icons.VISIBILITY_OFF} opticalAlign={true} />&thinsp;
          hidden
        </Wrapper>
      );
    default:
      return (
        <Wrapper backgroundColor={colors.washedBlue} color="#004d84">
          <Icon name={icons.EDIT} opticalAlign={true} />&thinsp; draft
        </Wrapper>
      );
  }
};

export default StatusLabel;
