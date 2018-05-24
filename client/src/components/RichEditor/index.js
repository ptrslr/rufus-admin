// @flow
import * as React from 'react';
import { Editor, EditorState, RichUtils, getDefaultKeyBinding } from 'draft-js';
import 'draft-js/dist/Draft.css';

import styled from 'styled-components';

// import { colors } from '../../utils/theme';

type Props = {
  editorState: EditorState,
  onChange: Function,
  editorRef: Function,
};

const RichEditor = (props: Props) => {
  const { editorState, onChange, editorRef } = props;

  const handleKeyCommand = (command: string): 'handled' | 'not-handled' => {
    const newState: ?EditorState = RichUtils.handleKeyCommand(
      editorState,
      command
    );

    if (newState) {
      onChange(newState);
      return 'handled';
    }

    return 'not-handled';
  };

  const mapKeyToEditorCommand = (e: SyntheticKeyboardEvent<>): string => {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState: EditorState = RichUtils.onTab(
        e,
        editorState,
        4 /* maxDepth */
      );
      if (newEditorState !== editorState) {
        onChange(newEditorState);
      }
      return 'tab';
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
    <EditorWrapper className={className}>
      <Editor
        editorState={editorState}
        handleKeyCommand={handleKeyCommand}
        onChange={onChange}
        keyBindingFn={mapKeyToEditorCommand}
        ref={editorRef}
        placeholder="Start writing here..."
        onTab={mapKeyToEditorCommand}
      />
    </EditorWrapper>
  );
};

export default RichEditor;

const EditorWrapper = styled.div`
  font-size: 1.125rem;
  line-height: 1.5;
  /*font-family: 'Noto Serif';*/

  &.is-hiddenPlaceholder .public-DraftEditorPlaceholder-root {
    display: none;
  }

  h2,
  .h2,
  h3,
  .h3,
  h4,
  .h4 {
    /*font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;*/

    line-height: 1.25;
  }

  h2,
  .h2 {
    font-size: 2rem;
  }
  h3,
  .h3 {
    font-size: 1.5rem;
  }
  h4,
  .h4 {
    font-size: 1.25rem;
  }

  div:not(:last-child) {
    margin-bottom: 1.5em;
  }
`;
