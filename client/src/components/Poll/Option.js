// @flow
import * as React from 'react';
import styled from 'styled-components';

import { colors } from '../../constants/theme.js';

const Wrapper = styled.div`
  padding: 0.5rem 0 0.25rem;
  &:not(:first-child) {
    border-top: 1px solid ${colors.grays[1]};
  }
`;
const Header = styled.div`
  display: flex;
`;
const Title = styled.label`
  flex: 1 1 auto;
  display: block;
  padding-right: 1rem;
`;
const Votes = styled.div``;

const Progress = styled.progress`
  display: block;
  width: 100%;
`;

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
    <Progress value={props.voteCount} max={props.totalVoteCount}>
      {props.voteCount} votes
    </Progress>
  </Wrapper>
);

export default Option;
