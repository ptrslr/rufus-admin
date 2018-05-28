// @flow
import * as React from 'react';
import styled from 'styled-components';

import Button from './Button';

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

const Footer = styled.div`
  margin-top: auto;
  padding: 1rem;
`;

type Props = {
  isEditable: boolean,
  onDelete: Function,
};
const PageSidebar = (props: Props) => {
  return (
    <Wrapper>
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

export default PageSidebar;
