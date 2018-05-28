// @flow
import * as React from 'react';

import Page from '../components/Page';
import PageHeader from '../components/PageHeader';
import PageBody from '../components/PageBody';
import Button from '../components/Button';
import Loader from '../components/Loader';
import PostListing from '../components/PostListing';

import status from '../constants/status';
import icons from '../constants/icons';
import { colors } from '../constants/theme';

import type { Posts as PostsType, Categories } from '../utils/types';
import { isScheduled, isPublished, isHidden, isDraft } from '../utils';

import { fetchPosts, fetchCategories } from '../api';

type Props = {
  status?: $Values<typeof status>,
  scheduled?: boolean,
};
type State = {
  isLoading: boolean,
  posts?: Object,
  categories: ?Categories,
};

class Posts extends React.Component<Props, State> {
  _isMounted: ?boolean;

  constructor(props: Props) {
    super(props);

    this.state = {
      isLoading: true,
      posts: {},
      categories: null,
    };
  }

  componentDidMount = async () => {
    this._isMounted = true;
    const posts = await fetchPosts();
    const categories = await fetchCategories();

    if (this._isMounted) {
      this.setState({
        isLoading: false,
        posts,
        categories,
      });
    }
  };

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  render() {
    const actions = [
      <Button
        to="/posts/new-post"
        theme="primary"
        value="Create new"
        iconLeft={icons.PLUS}
      />,
    ];

    const now = Date.now();

    const posts = this.state.posts ? this.state.posts : {};
    const categories = this.state.categories;

    const postKeys = posts ? Object.keys(posts) : [];
    let keys = postKeys;

    const scheduledKeys = postKeys.filter(key =>
      isScheduled(posts[key].status, posts[key].publishTime, now)
    );
    const publishedKeys = postKeys.filter(key =>
      isPublished(posts[key].status, posts[key].publishTime, now)
    );
    const hiddenKeys = postKeys.filter(key => isHidden(posts[key].status));
    const draftKeys = postKeys.filter(key => isDraft(posts[key].status));

    if (this.props.status) {
      switch (this.props.status) {
        case status.PUBLISHED:
          if (this.props.scheduled) {
            keys = scheduledKeys;
          } else {
            keys = publishedKeys;
          }
          break;
        case status.HIDDEN:
          keys = hiddenKeys;
          break;
        default:
          keys = draftKeys;
          break;
      }
    }

    const menu = [
      {
        label: 'All',
        to: '/posts/all',
        count: postKeys.length,
      },
      {
        label: 'Drafts',
        to: '/posts/drafts',
        count: draftKeys.length,
      },
      {
        label: 'Published',
        to: '/posts/published',
        count: publishedKeys.length,
      },
      {
        label: 'Scheduled',
        to: '/posts/scheduled',
        count: scheduledKeys.length,
      },
      {
        label: 'Hidden',
        to: '/posts/hidden',
        count: hiddenKeys.length,
      },
    ];

    return (
      <Page>
        <PageHeader title="Posts" menu={menu} actions={actions} />
        <PageBody padding="2rem 0 0">
          <Loader isLoading={this.state.isLoading}>
            <PostListing
              posts={this.state.posts}
              keys={keys}
              categories={this.state.categories}
            />
          </Loader>
        </PageBody>
      </Page>
    );
  }
}

export default Posts;
