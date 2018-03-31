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
  subtitleEditor: ?Editor;
  richEditor: ?Editor;

  constructor(props: Props) {
    super(props);
    this.state = {
      titleState: EditorState.createEmpty(),
      leadState: EditorState.createEmpty(),
      contentState: EditorState.createEmpty(),
    };

    this.subtitleEditor = React.createRef();
    this.richEditor = React.createRef();
  }

  onTitleChange = (titleState: EditorState) => this.setState({ titleState });
  onSubtitleChange = (leadState: EditorState) => this.setState({ leadState });
  onContentChange = (contentState: EditorState) =>
    this.setState({ contentState });

  handleTitleReturn = () => {
    this.subtitleEditor && this.subtitleEditor.focus();
  };
  handleSubtitleReturn = () => {
    this.richEditor && this.richEditor.focus();
  };

  handleToolbarClick = () => {
    console.log('yo');
    this.richEditor && this.richEditor.focus();
  };

  render() {
    return (
      <Wrapper>
        <Toolbar
          editorState={this.state.contentState}
          onChange={this.onContentChange}
          onClick={this.handleToolbarClick}
        />

        <Inner>
          <Measure>
            <TitleEditor
              editorState={this.state.titleState}
              onChange={this.onTitleChange}
              handleReturn={this.handleTitleReturn}
            />
            <SubtitleEditor
              editorState={this.state.leadState}
              onChange={this.onSubtitleChange}
              handleReturn={this.handleSubtitleReturn}
              editorRef={node => (this.subtitleEditor = node)}
            />
            <RichEditor
              editorState={this.state.contentState}
              onChange={this.onContentChange}
              editorRef={node => (this.richEditor = node)}
            />
          </Measure>
        </Inner>
      </Wrapper>
    );
  }
}

export default Editor;
