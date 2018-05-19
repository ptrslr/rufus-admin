// @flow
import * as React from 'react';
import styled from 'styled-components';

import Status from '../components/Status';
import Select from '../components/Select';
import type { SelectOptions } from '../components/Select';
import Button from '../components/Button';
import AvatarBox from '../components/AvatarBox';
import Label from '../components/Label';

import status from '../constants/status';
import role from '../constants/role';
import icons from '../constants/icons';
import { colors } from '../utils/theme';

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
  padding: 0.75rem 0;
`;

const Footer = styled.div`
  padding: 1rem;
`;

type Props = {
  status: $Keys<typeof status>,
  category: ?string,
  categoryOptions: ?SelectOptions,
  authorName: ?string,
  authorRole: ?$Keys<typeof role>,
  authorImage: ?string,
  onCategoryChange: Function,
  onDelete: Function,
  onPublish: Function,
  onHide: Function,
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
