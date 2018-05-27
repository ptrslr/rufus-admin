// @flow
import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AutoSizer, Table, Column } from 'react-virtualized';
import 'react-virtualized/styles.css';

import Button from '../Button';
import { labelStyles } from '../Label';

import icons from '../../constants/icons';
import { colors } from '../../constants/theme';
import type { Post, Posts, Categories } from '../../utils/types';

const StyledTable = styled(Table)`

  .ReactVirtualized__Table__Grid {
    outline: none;
  }

  .ReactVirtualized__Table__headerColumn {
    ${labelStyles};
  }
`;
const Title = styled.strong`
  > a {
    color: inherit;
    text-decoration: none;

    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }
`
type Props = {
  posts: Posts,
  keys: Array<string>,
  categories: Categories,
};
const PostListing = (props: Props) => {
  const { posts, keys, categories } = props;

  const rowCount = posts ? keys.length : 0;

  return (
    <AutoSizer>
      {({ height, width }) => (
        <StyledTable
          headerHeight={30}
          height={height}
          rowCount={rowCount}
          rowGetter={({ index }) => posts[keys[index]]}
          rowHeight={50}
          width={width}
        >
          <Column
            flexGrow={16}
            label="Title"
            dataKey="title"
            width={100}
            style={{ marginLeft: 0 }}
            headerStyle={{ marginLeft: 0 }}
            cellRenderer={data => {
              const id = keys[data.rowIndex];
              return (
                <Title>
                  <Link to={`/posts/${id}`}>{data.cellData}</Link>
                </Title>
              );
            }}
          />
          <Column
            flexGrow={2}
            label="Category"
            dataKey="category"
            width={100}
            cellRenderer={data => {
              const category = categories[data.cellData];
              return <div>{category ? category.name : ''}</div>;
            }}
          />
          <Column
            flexGrow={2}
            label="Status"
            dataKey="status"
            width={100}
            cellRenderer={data => {
              return <div>{data.cellData}</div>;
            }}
          />
          <Column
            flexGrow={1}
            label="Featured"
            dataKey="featured"
            width={100}
            cellRenderer={data => {
              return <div>{data.cellData ? 'yes' : 'no'}</div>;
            }}
          />
          <Column
            flexGrow={0}
            flexShrink={0}
            width={100}
            label="Actions"
            dataKey="title"
            style={{
              textAlign: 'right',
              marginRight: 0,
            }}
            headerStyle={{
              textAlign: 'right',
              marginRight: 0,
            }}
            cellRenderer={data => {
              const id = keys[data.rowIndex];

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
        </StyledTable>
      )}
    </AutoSizer>
  );
};

export default PostListing;
