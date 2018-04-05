// @flow
import * as React from 'react';
import styled from 'styled-components';

import { Heading1 } from '../components/Typography';
import { colors } from '../utils/theme';

type Props = {
  title: string,
  actions?: Array<React.Node>,
};
const Wrapper = styled.header`
  flex: 0 0 auto;
  display: flex;
  height: 4.5625rem;
  align-items: center;
  padding: 1rem 1rem 1rem 2rem;
  border-bottom: 1px solid ${colors.grays[2]};
`;
const Actions = styled.div`
  padding-left: 1rem;
  margin-left: auto;
`;
const Action = styled.div`
  display: inline-block;

  & + & {
    margin-left: 0.5rem;
  }
`;

const PageHeader = (props: Props) => {
  const { title, actions } = props;

  return (
    <Wrapper>
      <Heading1>{title}</Heading1>
      {actions && (
        <Actions>
          {actions.map((item, index) => <Action key={index}>{item}</Action>)}
        </Actions>
      )}
    </Wrapper>
  );
};

export default PageHeader;
