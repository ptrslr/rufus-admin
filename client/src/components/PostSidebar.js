// @flow
import * as React from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';

import Status from './Status';
import Select from './Select';
import Input from './Input';
import type { SelectOptions } from './Select';
import Button from './Button';
import AvatarBox from './AvatarBox';
import Label from './Label';
import Switch from './Switch';
import Icon from './Icon';
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
const HorizontalItem = styled(Item)`
  display: flex;
  padding-top: 1rem;
  padding-bottom: 0.125rem;
  align-items: center;
`;
const HorizontalLabel = styled(Label)`
  flex: 1 1 auto;
  margin: 0;
`;

const ImageWrapper = styled.div`
  position: relative;
  margin-top: .5rem;
  border-radius: 3px;
  overflow: hidden;
  background-color: ${colors.grays[1]}

  &::before {
    content: '';
    display: block;
    padding-bottom: 56.25%;
  }
`
const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;

  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;

  &::after {
    content: "Oops, seems like that URL is not working!";
    position: absolute;
    top: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 1rem;

  }
`

const ImageRemove = styled.button`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
  border: none;
  opacity: 0;

  background: ${rgba(colors.black, .75)};
  color: ${colors.white};

  cursor: pointer;
  transition: opacity 250ms ease-out;

  &:hover,
  &:focus {
    opacity: 1;
  }
`

const ImageRemoveIcon = styled(Icon)`
  margin-top: -.2em;
  margin-right: .25rem;
`


const Footer = styled.div`
  padding: 1rem;
`;

type Props = {
  isEditable: boolean,
  status: $Values<typeof status>,
  featured: boolean,
  paid: boolean,
  category: ?string,
  categoryOptions: ?SelectOptions,
  author: ?string,
  authorName: ?string,
  authorRole: ?$Values<typeof role>,
  authorImage: ?string,
  image: ?string,
  onImageChange: Function,
  onImageRemove: Function,
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
        <HorizontalItem>
          <HorizontalLabel htmlFor="featured">Featured:</HorizontalLabel>
          <Switch
            id="featured"
            checked={props.featured}
            onChange={props.onFeaturedChange}
            disabled={!props.isEditable}
          />
        </HorizontalItem>
        <HorizontalItem>
          <HorizontalLabel htmlFor="paid">Paid:</HorizontalLabel>
          <Switch
            id="paid"
            checked={props.paid}
            onChange={props.onPaidChange}
            disabled={!props.isEditable}
          />
        </HorizontalItem>
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
          <Label for="image">Post image:</Label>
          <Input
            id="image"
            name="image"
            onChange={props.onImageChange}
            placeholder="Image URL"
            type="text"
            value={props.image}
          />
          { props.image && props.image.length && (
            <ImageWrapper>
              <Image src={props.image} />
              <ImageRemove onClick={props.onImageRemove}>
                <ImageRemoveIcon className="icon" name={icons.REMOVE} />
                Remove
              </ImageRemove>
            </ImageWrapper>
          )}

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
