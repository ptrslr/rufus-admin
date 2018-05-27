// @flow
import * as React from 'react';
import styled from 'styled-components';

import Status from './Status';
import Select from './Select';
import type { SelectOptions } from './Select';
import Button from './Button';
import AvatarBox from './AvatarBox';
import Label from './Label';
import Switch from './Switch';
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
const FeaturedItem = styled(Item)`
  display: flex;
  padding-top: 1rem;
  padding-bottom: 0.125rem;
  align-items: center;
`;
const FeaturedLabel = styled(Label)`
  flex: 1 1 auto;
  margin: 0;
`;

const Footer = styled.div`
  padding: 1rem;
`;

type Props = {
  isEditable: boolean,
  status: $Keys<typeof status>,
  featured: boolean,
  category: ?string,
  categoryOptions: ?SelectOptions,
  author: ?string,
  authorName: ?string,
  authorRole: ?$Keys<typeof role>,
  authorImage: ?string,
  onFeatureChange: Function,
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
        isEditable={props.isEditable}
        status={props.status}
        publishTime={props.publishTime}
        onPublish={props.onPublish}
        onHide={props.onHide}
      />

      <Body>
        <FeaturedItem>
          <FeaturedLabel htmlFor="featured">Featured:</FeaturedLabel>
          <Switch
            id="featured"
            checked={props.featured}
            onChange={props.onFeaturedChange}
          />
        </FeaturedItem>
        <Item>
          <Label for="category">Category:</Label>
          <Select
            id="category"
            options={props.categoryOptions}
            value={props.category}
            onChange={props.onCategoryChange}
            readOnly={!props.isEditable}
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
            isEditable={props.isEditable}
            postId={props.postId}
          />
        </Item>
      </Body>

      {props.isEditable && (
        <Footer>
          <Button
            theme="link"
            block
            iconLeft={icons.REMOVE}
            value="Delete"
            onClick={props.onDelete}
          />
        </Footer>
      )}
    </Wrapper>
  );
};

export default PostSidebar;
