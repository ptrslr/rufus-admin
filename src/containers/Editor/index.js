// @flow
import * as React from 'react';

import { EditorState } from 'draft-js';
// import 'draft-js/dist/Draft.css';
import styled from 'styled-components';

import TitleEditor from '../../components/TitleEditor';
import SubtitleEditor from '../../components/SubtitleEditor';
import ContentEditor from '../../components/ContentEditor';

import { colors } from '../../utils/theme';

type Props = {};

type State = {
  titleState: EditorState,
  leadState: EditorState,
  contentState: EditorState,
};

const Wrapper = styled.div`
  max-width: 33rem;
  margin: 0 auto;
`;

class Editor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      titleState: EditorState.createEmpty(),
      leadState: EditorState.createEmpty(),
      contentState: EditorState.createEmpty(),
    };
  }

  onTitleChange = (titleState: EditorState) => this.setState({ titleState });
  onLeadChange = (leadState: EditorState) => this.setState({ leadState });
  onContentChange = (contentState: EditorState) =>
    this.setState({ contentState });

  render() {
    return (
      <Wrapper>
        <TitleEditor
          editorState={this.state.titleState}
          onChange={this.onTitleChange}
        />
        <SubtitleEditor
          editorState={this.state.leadState}
          onChange={this.onLeadChange}
        />
        <ContentEditor
          editorState={this.state.contentState}
          onEditorStateChange={this.onContentChange}
        />
      </Wrapper>
    );
  }
}

export default Editor;
