// @flow
import * as React from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import styled from 'styled-components';

import firebase from '../../api/firebase';

import Editor from '../Editor';
import PostSidebar from '../PostSidebar';

import Button from '../../components/Button';
import { Heading1 } from '../../components/Typography';
import icons from '../../constants/icons';
import { colors } from '../../utils/theme';

type Props = {};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const Header = styled.header`
  flex: 0 0 auto;
  display: flex;
  height: 4.5625rem;
  align-items: center;
  padding: 1rem 2rem;
  border-bottom: 1px solid ${colors.grays[2]};
`;
const Actions = styled.div`
  padding-left: 1rem;
  margin-left: auto;
`;
const Action = styled.div`
  display: inline-block;

  & + & {
    margin-left: 0.5rem;
  }
`;

const Layout = styled.div`
  display: flex;
  height: 100%;
`;
const LayoutSidebar = styled.div`
  flex: 0 0 15rem;
  width: 15rem;
`;
const LayoutMain = styled.main`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
`;

type State = {
  titleState: EditorState,
  subtitleState: EditorState,
  contentState: EditorState,
};

class Post extends React.Component<Props, State> {
  subtitleEditor: ?Editor;
  richEditor: ?Editor;
  firebaseRef: ?Object;
  firebaseCallback: ?Function;

  constructor(props: Props) {
    super(props);
    this.state = {
      post: null,
      titleState: EditorState.createEmpty(),
      subtitleState: EditorState.createEmpty(),
      contentState: EditorState.createEmpty(),
    };
  }

  componentDidMount() {
    // Updating the `someData` local state attribute when the Firebase Realtime Database data
    // under the '/someData' path changes.
    this.firebaseRef = firebase.database().ref('/posts/0');
    this.firebaseCallback = this.firebaseRef.on('value', snap => {
      const post = snap.val();

      const titleState = EditorState.createWithContent(
        ContentState.createFromText(post.title)
      );
      const subtitleState = EditorState.createWithContent(
        ContentState.createFromText(post.subtitle)
      );
      this.setState({ titleState, subtitleState });
    });
  }

  componentWillUnmount() {
    // Un-register the listener on '/someData'.
    this.firebaseRef.off('value', this.firebaseCallback);
  }

  onTitleChange = (titleState: EditorState) => this.setState({ titleState });
  onSubtitleChange = (subtitleState: EditorState) =>
    this.setState({ subtitleState });
  onContentChange = (contentState: EditorState) =>
    this.setState({ contentState });

  savePost = () => {
    const title = this.state.titleState.getCurrentContent().getPlainText();
    const subtitle = this.state.subtitleState
      .getCurrentContent()
      .getPlainText();
    const content = convertToRaw(this.state.contentState.getCurrentContent());

    console.log({
      title,
      subtitle,
      content,
    });
  };
  render() {
    return (
      <Wrapper>
        <Header>
          <Heading1>Edit Post</Heading1>

          <Actions>
            <Action>
              <Button
                theme="secondary"
                value="Back"
                iconLeft={icons.ARROW_LEFT}
              />
            </Action>
            <Action>
              <Button
                theme="primary"
                value="Save"
                iconLeft={icons.CHECK}
                onClick={this.savePost}
              />
            </Action>
          </Actions>
        </Header>

        <Layout>
          <LayoutMain>
            <Editor
              titleState={this.state.titleState}
              subtitleState={this.state.subtitleState}
              contentState={this.state.contentState}
              onTitleChange={this.onTitleChange}
              onSubtitleChange={this.onSubtitleChange}
              onContentChange={this.onContentChange}
            />
          </LayoutMain>

          <LayoutSidebar>
            <PostSidebar />
          </LayoutSidebar>
        </Layout>
      </Wrapper>
    );
  }
}

export default Post;
