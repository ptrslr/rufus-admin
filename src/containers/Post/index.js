// @flow
import * as React from 'react';
import styled from 'styled-components';

import Editor from '../Editor';
import Button from '../../components/Button';
import { Heading1 } from '../../components/Typography';
import ICONS from '../../constants/icons';
import { colors } from '../../utils/theme';

type Props = {};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const Header = styled.header`
  flex: 0 0 auto;
  display: flex;
  height: 81px;
  align-items: center;
  padding: 1rem 2rem;
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
const Body = styled.div`
  flex: 1 1 auto;
  overflow-y: auto;
`;

const Post = (props: Props) => {
  return (
    <Wrapper>
      <Header>
        <Heading1>Edit Post</Heading1>

        <Actions>
          <Action>
            <Button theme="secondary" value="Back" iconLeft={ICONS.arrowLeft} />
          </Action>
          <Action>
            <Button theme="primary" value="Save" iconLeft={ICONS.check} />
          </Action>
        </Actions>
      </Header>

      <Body>
        <Editor />
      </Body>
    </Wrapper>
  );
};

export default Post;
