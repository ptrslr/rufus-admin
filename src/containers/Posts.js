// @flow
import * as React from 'react';
import styled from 'styled-components';
import { AutoSizer, Table, Column } from 'react-virtualized';
import 'react-virtualized/styles.css';

import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import Loader from '../components/Loader';

import icons from '../constants/icons';
import firebase from '../api/firebase';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const Body = styled.div`
  height: 100%;
  padding: 2rem 1rem 0 2rem;
`;
const BodyInner = styled.div`
  height: 100%;
`;

type Props = {};
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

  componentDidMount() {
    this.firebaseRef = firebase.database().ref('/posts/');

    this.firebaseRef.on('value', snap => {
      const posts = snap.val();

      this.setState({
        isLoading: false,
        posts,
      });
    });
  }

  render() {
    const actions = [
      <Button
        to="posts/new-post"
        theme="primary"
        value="Create new"
        iconLeft={icons.PLUS}
      />,
    ];

    const posts = this.state.posts;

    const keys = posts ? Object.keys(posts) : [];
    const rowCount = posts ? keys.length : 0;

    return (
      <Wrapper>
        <PageHeader title="Posts" actions={actions} />
        <Body>
          <BodyInner>
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
                            to={`posts/${id}`}
                          />
                        );
                      }}
                    />
                  </Table>
                )}
              </AutoSizer>
            </Loader>
          </BodyInner>
        </Body>
      </Wrapper>
    );
  }
}

export default Posts;
