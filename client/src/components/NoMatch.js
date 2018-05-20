// @flow
import * as React from 'react';
import styled from 'styled-components';

import Button from './Button';
import icons from '../constants/icons';
import { colors } from '../constants/theme.js';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 2rem;
`;
const Title = styled.h1`
  margin: 0 0 2rem;

  color: ${colors.grays[2]};
  font-size: 8rem;
  font-weight: 900;
  line-height: 0.8;
`;
const Subtitle = styled.div`
  margin: 0 0 2.5rem;
  font-size: 2rem;
  font-weight: 700;
`;

type Props = {
  history: Object,
};

const NoMatch = (props: Props) => {
  return (
    <Wrapper>
      <Title>404</Title>
      <Subtitle>Sorry, looks like there's nothing here.</Subtitle>
      {/* <Subtitle>Sorry, looks like something went wrong.</Subtitle> */}
      <Button
        size="lg"
        theme="primary"
        iconLeft={icons.ARROW_LEFT}
        value="Go back"
        onClick={() => props.history.goBack()}
      />
    </Wrapper>
  );
};
export default NoMatch;
