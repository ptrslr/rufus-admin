// @flow
import * as React from 'react';
import styled from 'styled-components';

import TeamListingItem from '../../containers/TeamListingItem';

const List = styled.div`
  padding: 0;
  margin: 0;
  list-style: none;
`;
const Error = styled.div`
  padding: 3rem;
  text-align: center;
`;

type Props = {
  isSaving: boolean,
  isCreating: boolean,
  items: Object,
  onSave: Function,
  onDelete: Function,
  onNewCancel: Function,
  onNewSave: Function,
};
const TeamListing = (props: Props) => {
  const {
    isSaving,
    isCreating,
    items,
    onSave,
    onDelete,
    onNewCancel,
    onNewSave,
  } = props;

  if (items == null) {
    return <Error>So empty&hellip;</Error>;
  }
  const keys = Object.keys(items);

  return (
    <List>
      {keys.map((key, index) => (
        <TeamListingItem
          key={index}
          isNew={false}
          isDisabled={isCreating}
          id={key}
          avatar="https://picsum.photos/200"
          email={items[key].email}
          value={items[key].role}
          onSave={onSave}
          onDelete={onDelete}
          onNewCancel={null}
          onNewSave={null}
        />
      ))}

      {isCreating && (
        <TeamListingItem
          isNew={true}
          isDisabled={isSaving}
          avatar=""
          email=""
          value=""
          onSave={onSave}
          onDelete={onDelete}
          onNewCancel={onNewCancel}
          onNewSave={onNewSave}
        />
      )}
    </List>
  );
};

export default TeamListing;
