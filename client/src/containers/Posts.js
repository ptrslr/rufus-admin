// @flow
import * as React from 'react';
import { AutoSizer, Table, Column } from 'react-virtualized';
import 'react-virtualized/styles.css';

import Page from '../components/Page';
import PageHeader from '../components/PageHeader';
import PageBody from '../components/PageBody';
import Button from '../components/Button';
import Loader from '../components/Loader';

import status from '../constants/status';
import icons from '../constants/icons';

import { fetchPosts } from '../api';

type Props = {
  status?: $Keys<typeof status>,
  scheduled?: boolean,
};
type State = {
  isLoading: boolean,
  posts?: Object,
};

class Posts extends React.Component<Props, State> {
  firebaseRef: ?Object;
  firebaseCallback: ?Function;

  constructor(props: Props) {
    super(props);

    this.state = {
      isLoading: true,
      posts: {},
    };
  }

  componentDidMount = async () => {
    const posts = await fetchPosts();

    this.setState({
      isLoading: false,
      posts,
    });
  };

  render() {
    const menu = [
      {
        label: 'All',
        to: '/posts/all',
      },
      {
        label: 'Drafts',
        to: '/posts/drafts',
      },
      {
        label: 'Published',
        to: '/posts/published',
      },
      {
        label: 'Scheduled',
        to: '/posts/scheduled',
      },
      {
        label: 'Hidden',
        to: '/posts/hidden',
      },
    ];
    const actions = [
      <Button
        to="/posts/new-post"
        theme="primary"
        value="Create new"
        iconLeft={icons.PLUS}
      />,
    ];

    const posts = this.state.posts ? this.state.posts : {};

    let keys = posts ? Object.keys(posts) : [];

    const now = Date.now();

    if (this.props.status) {
      switch (this.props.status) {
        case status.PUBLISHED:
          if (this.props.scheduled) {
            // scheduled
            keys = keys.filter(
              key =>
                posts[key].status === status.PUBLISHED &&
                posts[key].publishTime > now
            );
          } else {
            // published
            keys = keys.filter(
              key =>
                posts[key].status === status.PUBLISHED &&
                posts[key].publishTime <= now
            );
          }

          break;
        case status.HIDDEN:
          keys = keys.filter(key => posts[key].status === status.HIDDEN);
          break;
        default:
          keys = keys.filter(key => posts[key].status === status.DRAFT);
          break;
      }
    }

    const rowCount = posts ? keys.length : 0;

    return (
      <Page>
        <PageHeader title="Posts" menu={menu} actions={actions} />
        <PageBody>
          <Loader isLoading={this.state.isLoading}>
            <AutoSizer>
              {({ height, width }) => (
                <Table
                  headerHeight={30}
                  height={height}
                  rowCount={rowCount}
                  rowGetter={({ index }) => posts[keys[index]]}
                  rowHeight={50}
                  width={width}
                >
                  <Column
                    flexGrow={2}
                    label="Title"
                    dataKey="title"
                    width={100}
                  />
                  <Column
                    flexGrow={0}
                    flexShrink={0}
                    width={100}
                    label="Actions"
                    dataKey="title"
                    cellRenderer={cellData => {
                      const id = keys[cellData.rowIndex];

                      return (
                        <Button
                          theme="secondary"
                          iconLeft={icons.EDIT}
                          value="Edit"
                          to={`/posts/${id}`}
                        />
                      );
                    }}
                  />
                </Table>
              )}
            </AutoSizer>
          </Loader>
        </PageBody>
      </Page>
    );
  }
}

export default Posts;
