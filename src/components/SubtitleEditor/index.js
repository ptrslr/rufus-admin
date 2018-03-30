// @flow
import * as React from 'react';

import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import styled from 'styled-components';

import { colors } from '../../utils/theme';

type Props = {
  editorState: EditorState,
  onChange: Function,
};

const EditorWrapper = styled.div`
  margin-bottom: 1.5rem;

  .public-DraftEditorPlaceholder-root,
  .DraftEditor-editorContainer {
    font-size: 1.3125rem;
    line-height: 1.5;
  }
  .DraftEditor-editorContainer {
    color: ${colors.grays[7]};
  }
`;

const SubtitleEditor = (props: Props) => {
  const { editorState, onChange } = props;

  return (
    <EditorWrapper>
      <Editor
        editorState={editorState}
        onChange={onChange}
        placeholder="Subtitle"
      />
    </EditorWrapper>
  );
};

export default SubtitleEditor;
