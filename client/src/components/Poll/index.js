// @flow
import * as React from 'react';
import styled from 'styled-components';

import Option from './Option';

import type { Poll as PollType } from '../../utils/types';

const Wrapper = styled.div`
  padding: 0.25rem 0 0.5rem;
`;
const Question = styled.div`
  padding-bottom: 0.25rem;
  font-weight: 700;
`;
const Options = styled.div``;

const Poll = (props: PollType) => {
  const { question = null, options = null } = props;

  let totalVoteCount = 0;

  options.forEach(item => {
    totalVoteCount += item.voteCount;
  });

  if (!totalVoteCount) totalVoteCount = 1;

  return (
    <Wrapper>
      <Question>{question}</Question>
      <Options>
        {options.map((item, index) => (
          <Option
            key={item.id}
            value={item.value}
            voteCount={item.voteCount}
            totalVoteCount={totalVoteCount}
          />
        ))}
      </Options>
    </Wrapper>
  );
};

export default Poll;
