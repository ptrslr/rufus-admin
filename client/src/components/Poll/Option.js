// @flow
import * as React from 'react';
import styled from 'styled-components';

import Progress from '../Progress';
import { colors } from '../../constants/theme.js';

const Wrapper = styled.div`
  padding: 0.5rem 0 0.5rem;
  &:not(:first-child) {
    border-top: 1px solid ${colors.grays[1]};
  }
`;
const Header = styled.div`
  display: flex;
  margin-bottom: .25rem;
`;
const Title = styled.label`
  flex: 1 1 auto;
  display: block;
  padding-right: 1rem;
`;
const Votes = styled.div``;

type Props = {
  value: string,
  voteCount: number,
  totalVoteCount: number,
};
const Option = (props: Props) => (
  <Wrapper>
    <Header>
      <Title>{props.value}</Title>
      <Votes>{props.voteCount}</Votes>
    </Header>
    <Progress
      value={props.voteCount}
      max={props.totalVoteCount}
      label="votes"
    />
  </Wrapper>
);

export default Option;
