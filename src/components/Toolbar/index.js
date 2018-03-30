// @flow
import * as React from 'react';
import { EditorState, RichUtils } from 'draft-js';
import styled from 'styled-components';

import InlineStyleControls from './InlineStyleControls';
import BlockTypeControls from './BlockTypeControls';
import { colors } from '../../utils/theme';

type Props = {
  editorState: EditorState,
  onChange: Function,
};

const StyledToolbar = styled.div`
  width: 100%;
  background: white;
  border-bottom: 1px solid ${colors.grays[2]};
`;
const Inner = styled.div`
  display: flex;
  max-width: 35rem;
  margin: 0 auto;
`;

const ControlsWrapper = styled.div`
  margin-bottom: -1px;

  & + & {
    margin-left: -1px;
  }
`;

const Toolbar = (props: Props) => {
  const { editorState, onChange } = props;

  const toggleBlockType = blockType => {
    onChange(RichUtils.toggleBlockType(editorState, blockType));
  };

  const toggleInlineStyle = inlineStyle => {
    onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  return (
    <StyledToolbar>
      <Inner>
        <ControlsWrapper>
          <InlineStyleControls
            editorState={editorState}
            onClick={toggleInlineStyle}
          />
        </ControlsWrapper>
        <ControlsWrapper>
          <BlockTypeControls
            editorState={editorState}
            onClick={toggleBlockType}
          />
        </ControlsWrapper>
      </Inner>
    </StyledToolbar>
  );
};
export default Toolbar;
