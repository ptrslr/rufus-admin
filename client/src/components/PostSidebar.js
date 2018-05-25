// @flow
import * as React from 'react';
import styled from 'styled-components';

import Status from './Status';
import Select from './Select';
import type { SelectOptions } from './Select';
import Button from './Button';
import AvatarBox from './AvatarBox';
import Label from './Label';
import Poll from './../containers/Poll';

import status from '../constants/status';
import role from '../constants/role';
import icons from '../constants/icons';
import { colors } from '../constants/theme.js';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: ${colors.white};
  border-left: 1px solid ${colors.grays[1]};
  overflow-y: auto;
`;
const Body = styled.div`
  flex: 1 1 auto;
  padding: 1rem;
`;
const Item = styled.div`
  padding: 0.5rem 0;
`;

const Footer = styled.div`
  padding: 1rem;
`;

type Props = {
  status: $Keys<typeof status>,
  category: ?string,
  categoryOptions: ?SelectOptions,
  author: ?string,
  authorName: ?string,
  authorRole: ?$Keys<typeof role>,
  authorImage: ?string,
  onCategoryChange: Function,
  onDelete: Function,
  onPublish: Function,
  onHide: Function,
  pollRef: ?Object,
  postId: ?string,
};
const PostSidebar = (props: Props) => {
  return (
    <Wrapper>
      <Status
        status={props.status}
        publishTime={props.publishTime}
        onPublish={props.onPublish}
        onHide={props.onHide}
      />

      <Body>
        <Item>
          <Label for="category">Category:</Label>
          <Select
            id="category"
            options={props.categoryOptions}
            value={props.category}
            onChange={props.onCategoryChange}
          />
        </Item>
        <Item>
          <Label>Author:</Label>
          <AvatarBox
            name={props.authorName}
            title={props.authorRole}
            image={props.authorImage}
          />
        </Item>
        <Item>
          <Label>Poll:</Label>
          <Poll
            ref={props.pollRef}
            postId={props.postId}
            author={props.author}
          />
        </Item>
      </Body>

      <Footer>
        <Button
          theme="link"
          block
          iconLeft={icons.REMOVE}
          value="Delete"
          onClick={props.onDelete}
        />
      </Footer>
    </Wrapper>
  );
};

export default PostSidebar;
