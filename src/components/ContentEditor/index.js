// @flow
import * as React from 'react';
import { Editor as WysiwygEditor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { EditorState } from 'draft-js';
import styled from 'styled-components';

import { colors } from '../../utils/theme';
import toolbarConf from './toolbarConf';

type Props = {
  editorState: EditorState,
  onEditorStateChange: Function,
};

const EditorWrapper = styled.div`
  line-height: 1.5;
`;
const Editor = styled(WysiwygEditor).attrs({
  toolbarStyle: {
    // background: 'red',
  },
})``;

const ContentEditor = (props: Props) => {
  const { editorState, onEditorStateChange } = props;
  return (
    <EditorWrapper>
      <Editor
        editorState={editorState}
        // toolbarClassName="toolbarClassName"
        // wrapperClassName="wrapperClassName"
        // editorClassName="editorClassName"
        onEditorStateChange={onEditorStateChange}
        toolbar={toolbarConf}
        placeholder="Start writing here..."
      />
    </EditorWrapper>
  );
};

export default ContentEditor;
