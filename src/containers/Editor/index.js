// @flow
import * as React from 'react';

import { EditorState } from 'draft-js';
// import 'draft-js/dist/Draft.css';
import styled from 'styled-components';

import Toolbar from '../../components/Toolbar';
import TitleEditor from '../../components/TitleEditor';
import SubtitleEditor from '../../components/SubtitleEditor';
import RichEditor from '../../components/RichEditor';

// import { colors } from '../../utils/theme';

type Props = {};

type State = {
  titleState: EditorState,
  leadState: EditorState,
  contentState: EditorState,
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
  max-width: 35rem;
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
        <Toolbar
          editorState={this.state.contentState}
          onChange={this.onContentChange}
        />

        <Inner>
          <Measure>
            <TitleEditor
              editorState={this.state.titleState}
              onChange={this.onTitleChange}
            />
            <SubtitleEditor
              editorState={this.state.leadState}
              onChange={this.onLeadChange}
            />
            <RichEditor
              editorState={this.state.contentState}
              onChange={this.onContentChange}
              stripPastedStyles={true}
            />
          </Measure>
        </Inner>
      </Wrapper>
    );
  }
}

export default Editor;
