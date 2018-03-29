// @flow
import * as React from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';

import styled from 'styled-components';

import { colors } from '../../utils/theme';
import ICONS from '../../constants/icons';

type Props = {
  editorState: EditorState,
  onChange: Function,
};

const EditorWrapper = styled.div`
  line-height: 1.5;
`;

const RichEditor = (props: Props) => {
  const { editorState, onChange } = props;

  const handleKeyCommand = command => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      onChange(newState);
      return 'handled';
    }

    return 'not-handled';
  };

  const toggleBlockType = blockType => {
    onChange(RichUtils.toggleBlockType(editorState, blockType));
  };

  const toggleInlineStyle = inlineStyle => {
    onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  // if (!editorState.hasText()) {
  // if (editorState.getBlockMap().first().getType() !== 'unstyled') {
  //   className += ' RichEditor-hidePlaceholder';
  // }

  return (
    <EditorWrapper>
      <Editor
        editorState={editorState}
        handleKeyCommand={handleKeyCommand}
        onChange={onChange}
        placeholder="Start writing here..."
      />
    </EditorWrapper>
  );
};

export default RichEditor;
