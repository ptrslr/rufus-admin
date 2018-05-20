// @flow
import * as React from 'react';
import styled from 'styled-components';

import Menu from './Menu';
import { Heading1 } from '../../components/Typography';
import { colors } from '../../constants/theme.js';

type Props = {
  title: string,
  menu?: Array<Object>,
  actions?: Array<React.Node>,
};
const headerHeight = '4.5625rem';

const Wrapper = styled.header`
  flex: 0 0 auto;
  display: flex;
  height: ${headerHeight};
  align-items: center;
  padding: 0 1rem 0 2rem;
  border-bottom: 1px solid ${colors.grays[1]};
`;
const Actions = styled.div`
  display: flex;
  align-items: center;
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
  const { title, menu, actions } = props;

  return (
    <Wrapper>
      <Heading1>{title}</Heading1>

      {menu && <Menu items={menu} />}

      {actions && (
        <Actions>
          {actions.map((item, index) => <Action key={index}>{item}</Action>)}
        </Actions>
      )}
    </Wrapper>
  );
};

export default PageHeader;
