// @flow
import * as React from 'react';
import { EditorState, RichUtils, getDefaultKeyBinding } from 'draft-js';
import 'draft-js/dist/Draft.css';
import Editor from 'draft-js-plugins-editor';

import styled from 'styled-components';

import { colors } from '../../constants/theme';

type Props = {
  editorState: EditorState,
  onChange: Function,
  editorRef: Function,
  readOnly: boolean,
  plugins: Array<Object>,
};

const RichEditor = (props: Props) => {
  const { editorState, onChange, editorRef, readOnly, plugins } = props;

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
        readOnly={readOnly}
        plugins={plugins}
      />
    </EditorWrapper>
  );
};

export default RichEditor;

const EditorWrapper = styled.div`
  font-size: 1.125rem;
  line-height: 1.5;
  font-family: 'Georgia';

  &.is-hiddenPlaceholder .public-DraftEditorPlaceholder-root {
    display: none;
  }

  h2,
  .h2,
  h3,
  .h3,
  h4,
  .h4 {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;

    line-height: 1.25;
  }

  h2,
  .h2 {
    font-size: 2rem;
  }
  h3,
  .h3 {
    font-size: 1.5rem;
    color: ${colors.grays[7]};
  }
  h4,
  .h4 {
    font-size: 1.25rem;
  }

  blockquote,
  figure {
    margin: 0;
  }

  blockquote {
    padding: .5rem 2rem;
    border-left: 0.25rem solid ${colors.grays[2]};
    font-style: italic;
  }

  img {
    max-width: 100%;
  }

  .VideoIframeWrapper {
    width: 100%;
    height: 0;
    position: relative;
    padding-bottom: 56.25%;
  }

  .VideoIframe {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .invalidVideoSrc {
    text-align: center;
    background-color: #eaeaea;
    padding: 1em;
  }

  div,
  figure,
  blockquote {
    &:not(:last-child) {
      margin-bottom: 1.5em;
    }
  }
`;
