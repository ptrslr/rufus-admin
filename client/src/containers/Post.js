// @flow
import * as React from 'react';
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  ContentState,
} from 'draft-js';
import styled from 'styled-components';

import {
  auth,
  createPost,
  updatePost,
  fetchPost,
  fetchPostContent,
  fetchCategories,
  fetchTeamMember,
} from '../api';

import Editor from './Editor';
import PostSidebar from './PostSidebar';
import NoMatch from './NoMatch';

import Page from '../components/Page';
import PageHeader from '../components/PageHeader';
import InlineLoader from '../components/InlineLoader';
import Loader from '../components/Loader';
import Button from '../components/Button';
import type { SelectOptions } from '../components/Select';

import icons from '../constants/icons';
import status from '../constants/status';
import role from '../constants/role';

import type { Post as PostType } from '../utils/types';
// import { colors } from '../utils/theme';

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
  user?: ?Object,
  userRole?: ?$Keys<typeof role>,
  history: Object,
};
type State = {
  isLoading: boolean,
  isSaving: boolean,
  noMatch?: boolean,
  titleState: EditorState,
  subtitleState: EditorState,
  contentState: EditorState,
  status: $Keys<typeof status>,
  categoryOptions: ?SelectOptions,
  category: ?string,
  author: ?Object,
  authorRole: ?$Keys<typeof role>,
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
      isSaving: false,
      post: null,
      titleState: EditorState.createEmpty(),
      subtitleState: EditorState.createEmpty(),
      contentState: EditorState.createEmpty(),
      status: status.DRAFT,
      categoryOptions: null,
      category: '',
      author: null,
      authorRole: null,
    };
  }

  async componentDidMount() {
    const postId = this.props.id;

    this.initCategories();

    if (postId) {
      // editing existing post
      this.initPost(postId);
    } else {
      // editing new post
      this.setState({
        isLoading: false,
        author: this.props.user,
        authorRole: this.props.userRole,
      });
    }
  }

  componentDidUpdate = (prevProps: Props) => {
    if (this.props.userRole !== prevProps.userRole) {
      this.setState({
        authorRole: this.props.userRole,
      });
    }
  };

  initPost = async (postId: string) => {
    fetchPost(postId)
      .then(post => {
        if (post) {
          const titleState = EditorState.createWithContent(
            ContentState.createFromText(post.title)
          );
          const subtitleState = EditorState.createWithContent(
            ContentState.createFromText(post.subtitle)
          );

          this.setState({
            titleState,
            subtitleState,
            category: post.category,
          });

          return Promise.all([
            fetchPostContent(postId),
            fetchTeamMember(post.author),
          ]);
        } else {
          this.setState({
            noMatch: true,
          });

          throw 'Post not found';
        }
      })
      .then(data => {
        const content = data[0];
        const user = data[1];

        if (content) {
          const contentState = EditorState.createWithContent(
            convertFromRaw(content)
          );

          this.setState({
            contentState,
          });
        }

        if (user) {
          this.setState({
            author: user,
            authorRole: user.customClaims.role,
          });
        }

        this.setState({
          isLoading: false,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  initCategories = () => {
    fetchCategories().then(categories => {
      const categoryOptions = [];

      const keys = Object.keys(categories);
      keys.map(key => {
        categoryOptions.push({
          value: key,
          label: categories[key].name,
        });
      });

      if (categoryOptions.length) {
        this.setState({
          categoryOptions: categoryOptions,
        });
      }
    });
  };

  onTitleChange = (titleState: EditorState) => this.setState({ titleState });
  onSubtitleChange = (subtitleState: EditorState) =>
    this.setState({ subtitleState });
  onContentChange = (contentState: EditorState) =>
    this.setState({ contentState });

  onCategoryChange = (e: SyntheticEvent<HTMLSelectElement>) => {
    this.setState({
      category: e.currentTarget.value,
    });
  };

  savePost = async () => {
    this.setState({
      isSaving: true,
    });

    const title = this.state.titleState.getCurrentContent().getPlainText();
    const subtitle = this.state.subtitleState
      .getCurrentContent()
      .getPlainText();
    const content = convertToRaw(this.state.contentState.getCurrentContent());
    const status = this.state.status;
    const category = this.state.category;
    const author = this.state.author.uid;
    // const publishTime = Date.now();

    const post = {
      title,
      subtitle,
      content,
      status,
      category,
      author,
      // publishTime,
    };

    const postId = this.props.id;

    if (postId) {
      await updatePost(postId, post);
    } else {
      await createPost(post);
    }

    this.setState({
      isSaving: false,
    });
  };

  render() {
    const actions = [
      <InlineLoader size="1.25rem" isLoading={this.state.isSaving} />,
      <Button
        theme="link"
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

    if (this.state.noMatch) {
      return <NoMatch history={this.props.history} />;
    }

    let authorName = null;
    let authorRole = null;
    let authorImage = null;

    if (this.state.author) {
      authorName = this.state.author.displayName
        ? this.state.author.displayName
        : this.state.author.email;
      authorImage = this.state.author.photoURL;
    }
    if (this.state.authorRole) {
      authorRole = this.state.authorRole;
    }

    return (
      <Page>
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
              <Loader isLoading={!this.state.categoryOptions && !authorRole}>
                <PostSidebar
                  status={this.state.status}
                  category={this.state.category}
                  categoryOptions={this.state.categoryOptions}
                  onCategoryChange={this.onCategoryChange}
                  authorName={authorName}
                  authorRole={authorRole}
                  authorImage={authorImage}
                  onCategoryChange={this.onCategoryChange}
                />
              </Loader>
            </LayoutSidebar>
          </Loader>
        </Layout>
      </Page>
    );
  }
}

export default Post;
