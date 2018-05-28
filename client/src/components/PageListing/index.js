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
import StatusLabel from '../StatusLabel';

import icons from '../../constants/icons';
import status from '../../constants/status';
import { colors } from '../../constants/theme';
import type { Post, Posts, Categories } from '../../utils/types';
import { isScheduled, isPublished, isHidden, isDraft } from '../../utils';

const StyledTable = styled(Table)`
  .ReactVirtualized__Table__Grid {
    outline: none;
  }

  .ReactVirtualized__Table__headerColumn,
  .ReactVirtualized__Table__rowColumn {
    margin-right: 1rem;

    &:first-child {
      padding-left: 2rem;
    }
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
  pages: Pages,
};
const PageListing = (props: Props) => {
  const { pages } = props;
  const keys = Object.keys(pages);
  const rowCount = pages ? keys.length : 0;

  return (
    <AutoSizer>
      {({ height, width }) => (
        <StyledTable
          headerHeight={30}
          height={height}
          rowCount={rowCount}
          rowGetter={({ index }) => pages[keys[index]]}
          rowHeight={64}
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
                  <Link to={`/pages/${id}`}>{data.cellData}</Link>
                </Title>
              );
            }}
          />
        </StyledTable>
      )}
    </AutoSizer>
  );
};

export default PageListing;
