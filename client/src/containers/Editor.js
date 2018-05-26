// @flow
import * as React from 'react';

import { EditorState } from 'draft-js';
// import 'draft-js/dist/Draft.css';
import styled from 'styled-components';

import Toolbar from '../components/Toolbar';
import TitleEditor from '../components/TitleEditor';
import SubtitleEditor from '../components/SubtitleEditor';
import RichEditor from '../components/RichEditor';

// import { colors } from '../../utils/theme';

type Props = {
  isEditable: boolean,
  titleState: EditorState,
  subtitleState: EditorState,
  contentState: EditorState,
  onTitleChange: Function,
  onSubtitleChange: Function,
  onContentChange: Function,
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const Inner = styled.div`
  flex: 1 1 auto;
  overflow-y: auto;
  width: 100%;
  padding: 3rem 0;
  margin: 0 auto;
`;
const Measure = styled.div`
  max-width: 40rem;
  margin: 0 auto;
`;

const Editor = (props: Props) => {
  let subtitleEditor = null;
  let richEditor = null;

  const handleTitleReturn = () => {
    subtitleEditor && subtitleEditor.focus();
  };
  const handleSubtitleReturn = () => {
    focusRichEditor();
  };

  const focusRichEditor = () => {
    richEditor && richEditor.focus();
  };

  return (
    <Wrapper>
      {props.isEditable && (
        <Toolbar
          editorState={props.contentState}
          onChange={props.onContentChange}
        />
      )}

      <Inner>
        <Measure>
          <TitleEditor
            editorState={props.titleState}
            onChange={props.onTitleChange}
            handleReturn={handleTitleReturn}
            readOnly={!props.isEditable}
          />
          <SubtitleEditor
            editorState={props.subtitleState}
            onChange={props.onSubtitleChange}
            handleReturn={handleSubtitleReturn}
            editorRef={node => (subtitleEditor = node)}
            readOnly={!props.isEditable}
          />
          <RichEditor
            editorState={props.contentState}
            onChange={props.onContentChange}
            editorRef={node => (richEditor = node)}
            readOnly={!props.isEditable}
          />
        </Measure>
      </Inner>
    </Wrapper>
  );
};

export default Editor;
