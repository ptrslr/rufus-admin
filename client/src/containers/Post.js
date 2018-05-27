// @flow
import * as React from 'react';
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  ContentState,
} from 'draft-js';
import styled from 'styled-components';
import moment from 'moment';

import {
  createPost,
  updatePost,
  fetchPost,
  fetchPostContent,
  deletePost,
  fetchCategories,
  fetchTeamMember,
} from '../api';

import Editor from './Editor';

import PostSidebar from '../components/PostSidebar';
import NoMatch from '../components/NoMatch';
import Page from '../components/Page';
import PageHeader from '../components/PageHeader';
import InlineLoader from '../components/InlineLoader';
import Loader from '../components/Loader';
import Button from '../components/Button';
import type { SelectOptions } from '../components/Select';
import ConfirmModal from '../components/ConfirmModal';
import PublishModal from '../components/PublishModal';

import icons from '../constants/icons';
import status from '../constants/status';
import role from '../constants/role';

import type { Post as PostType } from '../utils/types';
// import { colors } from '../utils/theme';

const Layout = styled.div`
  flex: 1 1 auto;
  display: flex;
  overflow: hidden;
`;
const LayoutSidebar = styled.div`
  flex: 0 0 16rem;
  width: 16rem;
`;
const LayoutMain = styled.main`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
`;
type Props = {
  user: Object,
  userRole?: ?$Keys<typeof role>,
  history: Object,
  match: Object,
};
type State = {
  isLoading: boolean,
  isSaving: boolean,
  isEditable: boolean,
  isDeleteModalOpen: boolean,
  isPublishModalOpen: boolean,
  isHideModalOpen: boolean,
  noMatch?: boolean,
  postId: ?string,
  titleState: EditorState,
  subtitleState: EditorState,
  contentState: EditorState,
  status: $Keys<typeof status>,
  featured: boolean,
  categoryOptions: ?SelectOptions,
  category: ?string,
  author: Object,
  authorRole: ?$Keys<typeof role>,
  publishType: string,
  publishTime: ?number,
  datetimeValue: number,
};

class Post extends React.Component<Props, State> {
  _isMounted: ?boolean;
  subtitleEditor: ?Editor;
  richEditor: ?Editor;
  firebaseRef: ?Object;
  firebaseCallback: ?Function;
  pollRef: ?Object;

  constructor(props: Props) {
    super(props);
    this.state = {
      isLoading: true,
      isSaving: false,
      isEditable: false,
      isDeleteModalOpen: false,
      isPublishModalOpen: false,
      isHideModalOpen: false,
      postId: this.props.match.params.id,
      titleState: EditorState.createEmpty(),
      subtitleState: EditorState.createEmpty(),
      contentState: EditorState.createEmpty(),
      status: status.DRAFT,
      featured: false,
      categoryOptions: null,
      category: '',
      author: props.user,
      authorRole: null,
      publishType: 'publish',
      publishTime: null,
      datetimeValue: Date.now(),
    };

    this.pollRef = React.createRef();
  }

  componentDidMount = () => {
    this._isMounted = true;

    const postId = this.state.postId;

    this.initCategories();

    if (postId) {
      // editing existing post
      this.initPost(postId);
    } else {
      // editing new post

      if (this._isMounted) {
        this.setState({
          isLoading: false,
          isEditable: true,
          author: this.props.user,
          authorRole: this.props.userRole,
        });
      }
    }
  };

  componentWillUnmount = () => {
    this._isMounted = false;
  };

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
        if (post && this._isMounted) {
          const titleState = EditorState.createWithContent(
            ContentState.createFromText(post.title)
          );
          const subtitleState = EditorState.createWithContent(
            ContentState.createFromText(post.subtitle)
          );

          this.setState({
            titleState,
            subtitleState,
            status: post.status,
            featured: post.featured,
            category: post.category,
            publishTime: post.publishTime,
            datetimeValue: post.publishTime,
          });

          return Promise.all([
            fetchPostContent(postId),
            fetchTeamMember(post.author),
          ]);
        } else {
          if (this._isMounted) {
            this.setState({
              noMatch: true,
            });
          }

          throw new Error('Post not found');
        }
      })
      .then(data => {
        const content = data[0];
        const user = data[1];

        if (this._isMounted) {
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
              isEditable:
                this.props.userRole === role.ADMIN ||
                this.props.userRole === role.EDITOR ||
                this.props.user.uid === user.uid,
              author: user,
              authorRole: user.customClaims.role,
            });
          }
          this.setState({
            isLoading: false,
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  initCategories = () => {
    fetchCategories().then(categories => {
      const keys = Object.keys(categories);
      const categoryOptions = keys.map(key => {
        return {
          value: key,
          label: categories[key].name,
        };
      });
      categoryOptions.splice(0, 0, {
        value: null,
        label: '- no category -',
      });

      if (categoryOptions.length && this._isMounted) {
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

  mapStateToPost = (): PostType => {
    const title = this.state.titleState.getCurrentContent().getPlainText();
    const subtitle = this.state.subtitleState
      .getCurrentContent()
      .getPlainText();
    const content = convertToRaw(this.state.contentState.getCurrentContent());
    const status = this.state.status;
    const featured = this.state.featured;
    const category = this.state.category ? this.state.category : null;
    const author = this.state.author.uid;
    const publishTime = this.state.publishTime ? this.state.publishTime : null;

    return {
      title,
      subtitle,
      content,
      status,
      featured,
      category,
      author,
      publishTime,
    };
  };

  savePost = async () => {
    this.setState({
      isSaving: true,
    });

    const postId = this.state.postId;
    const post: PostType = this.mapStateToPost();
    const poll = this.pollRef.current.onSavePost();

    if (postId) {
      await updatePost(postId, post, poll);
    } else {
      const newPostId = await createPost(post, poll);

      this.setState({
        postId: newPostId,
      });
    }

    this.setState({
      isSaving: false,
    });
  };

  closeModal = () => {
    this.setState({
      isDeleteModalOpen: false,
      isPublishModalOpen: false,
      isHideModalOpen: false,
    });
  };

  onDelete = () => {
    this.setState({
      isDeleteModalOpen: true,
    });
  };

  onDeleteConfirm = () => {
    this.setState({
      isLoading: true,
    });
    const postId = this.state.postId;

    if (postId) {
      deletePost(postId)
        .then(() => {
          this.props.history.push('/posts');
        })
        .catch(err => {
          this.setState({
            isLoading: false,
          });
        });
    }
  };

  onPublish = () => {
    const postStatus = this.state.status;
    let datetimeValue = this.state.datetimeValue;

    if (postStatus === status.DRAFT || postStatus === status.HIDDEN) {
      datetimeValue = Date.now();
    }

    this.setState({
      isPublishModalOpen: true,
      datetimeValue,
    });
  };

  onPublishConfirm = () => {
    this.setState({
      isLoading: true,
    });

    const postId = this.state.postId;
    const publishTime = Date.now();
    const newStatus = status.PUBLISHED;

    const post: PostType = this.mapStateToPost();
    post.publishTime = publishTime;
    post.status = newStatus;

    if (postId) {
      updatePost(postId, post)
        .then(() => {
          this.setState({
            isLoading: false,
            status: newStatus,
            publishTime,
          });
        })
        .catch(err => {
          this.setState({
            isLoading: false,
          });
        });
    } else {
      createPost(post)
        .then(postId => {
          this.setState({
            isLoading: false,
            status: newStatus,
            publishTime,
            postId,
          });
        })
        .catch(err => {
          this.setState({
            isLoading: false,
          });
        });
    }

    this.setState({
      isPublishModalOpen: false,
    });
  };

  onSchedule = () => {
    this.setState({
      isLoading: true,
    });

    const postId = this.state.postId;
    const publishTime = this.state.datetimeValue;
    const newStatus = status.PUBLISHED;

    const post: PostType = this.mapStateToPost();
    post.publishTime = publishTime;
    post.status = newStatus;

    if (postId) {
      updatePost(postId, post)
        .then(() => {
          this.setState({
            isLoading: false,
            status: newStatus,
            publishTime,
          });
        })
        .catch(err => {
          this.setState({
            isLoading: false,
          });
        });
    }

    this.setState({
      isPublishModalOpen: false,
    });
  };

  onPublishTypeChange = (e: SyntheticEvent<HTMLInputElement>) => {
    this.setState({
      publishType: e.currentTarget.value,
    });
  };

  onHide = () => {
    this.setState({
      isHideModalOpen: true,
    });
  };

  onHideConfirm = () => {
    this.setState({
      isLoading: true,
    });

    const postId = this.state.postId;
    const newStatus = status.HIDDEN;
    const publishTime = null;

    const post: PostType = this.mapStateToPost();
    post.status = newStatus;
    post.publishTime = publishTime;

    if (postId) {
      updatePost(postId, post)
        .then(() => {
          this.setState({
            isLoading: false,
            status: newStatus,
            publishTime,
          });
        })
        .catch(err => {
          this.setState({
            isLoading: false,
          });
        });
    }

    this.setState({
      isHideModalOpen: false,
    });
  };

  onDatetimeChange = (time: Object) => {
    if (moment.isMoment(time)) {
      this.setState({
        datetimeValue: time.valueOf(),
      });
    }
  };

  isDatetimeValid = (current: Object) => {
    const yesterday = moment().subtract(1, 'day');
    return current.isAfter(yesterday);
  };

  onFeaturedChange = (checked: boolean) => {
    this.setState({ featured: checked });
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
      this.state.isEditable && (
        <Button
          theme="primary"
          value="Save"
          iconLeft={icons.CHECK}
          onClick={this.savePost}
          disabled={this.state.isLoading}
        />
      ),
    ];

    if (this.state.noMatch) {
      return <NoMatch history={this.props.history} />;
    }

    let author = null;
    let authorName = null;
    let authorRole = null;
    let authorImage = null;

    if (this.state.author) {
      author = this.state.author.uid;
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
                isEditable={this.state.isEditable}
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
                  isEditable={this.state.isEditable}
                  status={this.state.status}
                  featured={this.state.featured}
                  onFeaturedChange={this.onFeaturedChange}
                  category={this.state.category}
                  categoryOptions={this.state.categoryOptions}
                  onCategoryChange={this.onCategoryChange}
                  author={author}
                  authorName={authorName}
                  authorRole={authorRole}
                  authorImage={authorImage}
                  publishTime={this.state.publishTime}
                  onDelete={this.onDelete}
                  onPublish={this.onPublish}
                  onHide={this.onHide}
                  pollRef={this.pollRef}
                  postId={this.state.postId}
                />
              </Loader>
            </LayoutSidebar>
          </Loader>
        </Layout>

        <ConfirmModal
          isOpen={this.state.isDeleteModalOpen}
          closeModal={this.closeModal}
          title="Are you sure?"
          subtitle={
            <p>
              You're about to delete this post. This action{' '}
              <strong>cannot</strong> be undone.
            </p>
          }
          onConfirm={this.onDeleteConfirm}
          onCancel={this.closeModal}
          confirmValue="Delete"
        />

        <ConfirmModal
          isOpen={this.state.isHideModalOpen}
          closeModal={this.closeModal}
          title="Are you sure?"
          subtitle={
            <p>
              You're about to hide this post. Your users won't be able to read
              this post.<br />
              You can publish it later, if you change your mind.
            </p>
          }
          onConfirm={this.onHideConfirm}
          onCancel={this.closeModal}
          confirmValue="Hide"
        />

        <PublishModal
          isOpen={this.state.isPublishModalOpen}
          publishType={this.state.publishType}
          datetimeValue={this.state.datetimeValue}
          onDatetimeChange={this.onDatetimeChange}
          isDatetimeValid={this.isDatetimeValid}
          closeModal={this.closeModal}
          onPublish={this.onPublishConfirm}
          onSchedule={this.onSchedule}
          onCancel={this.closeModal}
          onRadioChange={this.onPublishTypeChange}
        />
      </Page>
    );
  }
}

export default Post;
