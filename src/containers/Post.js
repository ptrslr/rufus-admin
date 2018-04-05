// @flow
import * as React from 'react';
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  ContentState,
} from 'draft-js';
import styled from 'styled-components';

import firebase, { createPost } from '../api/firebase';

import Editor from './Editor';
import PostSidebar from './PostSidebar';

import PageHeader from '../components/PageHeader';
import Loader from '../components/Loader';
import Button from '../components/Button';
import icons from '../constants/icons';
// import { colors } from '../utils/theme';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
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

type Props = {
  id?: string,
};
type State = {
  isLoading: boolean,
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
      isLoading: true,
      post: null,
      titleState: EditorState.createEmpty(),
      subtitleState: EditorState.createEmpty(),
      contentState: EditorState.createEmpty(),
    };
  }

  componentDidMount() {
    const id = this.props.id;

    if (id) {
      // fetch existing post
      this.firebaseRef = firebase.database().ref(`/posts/${id}`);

      this.firebaseRef.once('value', snap => {
        const post = snap.val();

        if (post) {
          const titleState = EditorState.createWithContent(
            ContentState.createFromText(post.title)
          );
          const subtitleState = EditorState.createWithContent(
            ContentState.createFromText(post.subtitle)
          );
          const contentState = EditorState.createWithContent(
            convertFromRaw(post.content)
          );

          this.setState({
            titleState,
            subtitleState,
            contentState,
          });
        }
      });
    }

    this.setState({
      isLoading: false,
    });
  }

  // componentWillUnmount() {
  //   // Un-register the listener on '/someData'.
  //   this.firebaseRef && this.firebaseRef.off('value', this.firebaseCallback);
  // }

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

    createPost(title, subtitle, content);
  };

  render() {
    const actions = [
      <Button
        theme="secondary"
        value="Back"
        iconLeft={icons.ARROW_LEFT}
        onClick={() => this.props.history.goBack()}
      />,
      <Button
        theme="primary"
        value="Save"
        iconLeft={icons.CHECK}
        onClick={this.savePost}
        disabled={this.state.isLoading}
      />,
    ];
    return (
      <Wrapper>
        <PageHeader title="Edit Post" actions={actions} />

        <Layout>
          <Loader isLoading={this.state.isLoading}>
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
          </Loader>
        </Layout>
      </Wrapper>
    );
  }
}

export default Post;
