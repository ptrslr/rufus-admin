// @flow
import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AutoSizer, Table, Column } from 'react-virtualized';
import 'react-virtualized/styles.css';
import { ellipsis } from 'polished';
import moment from 'moment';

import Button from '../Button';
import { labelStyles } from '../Label';
import Icon from '../Icon';

import icons from '../../constants/icons';
import { colors } from '../../constants/theme';
import type { Post, Posts, Categories } from '../../utils/types';
import { isScheduled, isPublished, isHidden, isDraft } from '../../utils';

const StyledTable = styled(Table)`
  .ReactVirtualized__Table__Grid {
    outline: none;
  }

  .ReactVirtualized__Table__headerColumn {
    ${labelStyles};
  }

  .ReactVirtualized__Table__row {
    &:not(:first-child) {
      border-top: 1px solid ${colors.grays[1]};
    }
  }
`;
const Title = styled.strong`
  ${ellipsis()};
  display: block;

  > a {
    color: inherit;
    text-decoration: none;

    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }
`;
type Props = {
  posts: Posts,
  keys: Array<string>,
  categories: Categories,
};
const PostListing = (props: Props) => {
  const { posts, keys, categories } = props;

  const rowCount = posts ? keys.length : 0;

  const now = Date.now();

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
              const id = keys[data.rowIndex];
              const status = data.cellData;
              const publishTime = posts[id].publishTime;

              if (isScheduled(status, publishTime, now)) {
                return (
                  <div>
                    <Icon name={icons.CLOCK} opticalAlign={true} />&thinsp;
                    scheduled
                  </div>
                );
              } else if (isPublished(status, publishTime, now)) {
                return (
                  <div>
                    <Icon name={icons.VISIBILITY} opticalAlign={true} />&thinsp;
                    published
                  </div>
                );
              } else if (isHidden(status)) {
                return (
                  <div>
                    <Icon name={icons.VISIBILITY_OFF} opticalAlign={true} />&thinsp;
                    hidden
                  </div>
                );
              } else {
                return (
                  <div>
                    <Icon name={icons.EDIT} opticalAlign={true} />&thinsp; draft
                  </div>
                );
              }
            }}
          />
          <Column
            flexGrow={3}
            label="Publish time"
            dataKey="publishTime"
            width={100}
            cellRenderer={data => {
              const publishTime = data.cellData;
              return (
                <div>
                  {publishTime ? moment(publishTime).format('lll') : ''}
                </div>
              );
            }}
          />
          <Column
            flexGrow={1}
            label="Featured"
            dataKey="featured"
            width={100}
            style={{ textAlign: 'center' }}
            headerStyle={{ textAlign: 'center' }}
            cellRenderer={data => {
              return data.cellData ? (
                <Icon name={icons.STAR} />
              ) : (
                // <Icon name={icons.STAR_OUTLINE} />
                ''
              );
            }}
          />
          {/*           <Column */}
          {/*             flexGrow={0} */}
          {/*             flexShrink={0} */}
          {/*             width={100} */}
          {/*             label="Actions" */}
          {/*             dataKey="title" */}
          {/*             style={{ */}
          {/*               textAlign: 'right', */}
          {/*               marginRight: 0, */}
          {/*             }} */}
          {/*             headerStyle={{ */}
          {/*               textAlign: 'right', */}
          {/*               marginRight: 0, */}
          {/*             }} */}
          {/*             cellRenderer={data => { */}
          {/*               const id = keys[data.rowIndex]; */}
          {/*  */}
          {/*               return ( */}
          {/*                 <Button */}
          {/*                   theme="secondary" */}
          {/*                   iconLeft={icons.EDIT} */}
          {/*                   value="Edit" */}
          {/*                   to={`/posts/${id}`} */}
          {/*                 /> */}
          {/*               ); */}
          {/*             }} */}
          {/*           /> */}
        </StyledTable>
      )}
    </AutoSizer>
  );
};

export default PostListing;
