// @flow
import * as React from 'react';
import { EditorState, RichUtils } from 'draft-js';
import styled from 'styled-components';

import InlineStyleControls from './InlineStyleControls';
import BlockStyleControls from './BlockStyleControls';
import { colors } from '../../utils/theme';

type Props = {
  editorState: EditorState,
  onChange: Function,
};

const StyledToolbar = styled.div`
  background: white;
  border-bottom: 1px solid ${colors.grays[2]};
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
      <InlineStyleControls
        editorState={editorState}
        onClick={toggleInlineStyle}
      />
      <BlockStyleControls editorState={editorState} onClick={toggleBlockType} />
    </StyledToolbar>
  );
};
export default Toolbar;
