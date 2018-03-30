// @flow
import * as React from 'react';
import { Editor, EditorState, RichUtils, getDefaultKeyBinding } from 'draft-js';
import 'draft-js/dist/Draft.css';

import styled from 'styled-components';

// import { colors } from '../../utils/theme';

type Props = {
  editorState: EditorState,
  onChange: Function,
};

const EditorWrapper = styled.div`
  line-height: 1.5;

  &.is-hiddenPlaceholder .public-DraftEditorPlaceholder-root {
    display: none;
  }

  div {
    margin-bottom: 1.5rem;
  }
`;

const RichEditor = (props: Props) => {
  const { editorState, onChange } = props;
  let editor = null;

  // const focus = () => editor.focus();

  const onBlur = e => {
    console.log(e.target);
  };

  const handleKeyCommand = command => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      onChange(newState);
      return 'handled';
    }

    return 'not-handled';
  };

  const mapKeyToEditorCommand = e => {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(e, editorState, 4 /* maxDepth */);
      if (newEditorState !== editorState) {
        onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  };

  let className = '';

  const contentState = editorState.getCurrentContent();
  className +=
    !contentState.hasText() &&
    contentState
      .getBlockMap()
      .first()
      .getType() !== 'unstyled'
      ? 'is-hiddenPlaceholder'
      : '';

  return (
    <EditorWrapper
      className={className}
      onClick={() => editor && editor.focus()}
    >
      <Editor
        editorState={editorState}
        handleKeyCommand={handleKeyCommand}
        onChange={onChange}
        keyBindingFn={mapKeyToEditorCommand}
        ref={node => (editor = node)}
        placeholder="Start writing here..."
        onBlur={onBlur}
        onTab={mapKeyToEditorCommand}
      />
    </EditorWrapper>
  );
};

export default RichEditor;
