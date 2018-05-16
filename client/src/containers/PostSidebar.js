// @flow
import * as React from 'react';
import styled from 'styled-components';

import Status from '../components/Status';
import Select from '../components/Select';
import Button from '../components/Button';
import AvatarBox from '../components/AvatarBox';
import Label from '../components/Label';
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
// const Label = styled.label.attrs({
//   htmlFor: props => props.for,
// })`
//   display: block;
//   margin-bottom: 0.5rem;
//   font-size: 0.8125rem;
//   font-weight: 700;
//   text-transform: uppercase;
//   letter-spacing: 0.05em;
//   color: ${colors.grays[8]};
// `;
const Footer = styled.div`
  padding: 1rem;
`;

const categories = [
  {
    value: '0',
    label: 'Ekonomika',
  },
  {
    value: '1',
    label: 'Šport',
  },
];

const PostSidebar = () => {
  return (
    <Wrapper>
      <Status status="draft" />

      <Body>
        <Item>
          <Label for="category">Category:</Label>
          <Select id="category" options={categories} />
        </Item>
        <Item>
          <Label>Author:</Label>
          <AvatarBox name="Sarah Schmidt" title="Editor" image="" />
        </Item>
      </Body>

      <Footer>
        <Button theme="link" block iconLeft={icons.REMOVE} value="Delete" />
      </Footer>
    </Wrapper>
  );
};

export default PostSidebar;
