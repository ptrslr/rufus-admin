// @flow
import * as React from 'react';

import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import styled from 'styled-components';

import { colors } from '../../utils/theme';

type Props = {
  editorState: EditorState,
  onChange: Function,
  handleReturn: Function,
  editorRef?: Function,
};

const EditorWrapper = styled.div`
  margin-bottom: 3rem;

  .public-DraftEditorPlaceholder-root,
  .DraftEditor-editorContainer {
    font-size: 1.5rem;
    line-height: 1.2;
  }
  .DraftEditor-editorContainer {
    color: ${colors.grays[7]};
  }
`;

const SubtitleEditor = (props: Props) => {
  const { editorState, onChange, editorRef } = props;
  // let editor = null;

  // const focus = () => {
  //   editor && editor.focus();
  // };

  const handleReturn = e => {
    props.handleReturn();
    return 'handled';
  };

  return (
    <EditorWrapper>
      <Editor
        editorState={editorState}
        onChange={onChange}
        placeholder="Subtitle"
        handleReturn={handleReturn}
        ref={editorRef}
      />
    </EditorWrapper>
  );
};

export default SubtitleEditor;
