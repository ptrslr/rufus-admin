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
  isEditasble: boolean,
  items: Object,
  onSave: Function,
  onDisable?: Function,
  onEnable?: Function,
  onDelete?: Function,
};
const TeamListing = (props: Props) => {
  const {
    isCreating,
    isEditable,
    items,
    onSave,
    onDisable,
    onEnable,
    onDelete,
  } = props;

  if (items == null || items.length === 0) {
    return <Error>So empty&hellip;</Error>;
  }

  return (
    <List>
      {items.map((item, index) => (
        <TeamListingItem
          key={index}
          isDisabled={isCreating}
          isEditable={isEditable}
          uid={item.uid}
          index={index}
          avatar={item.photoURL}
          displayName={item.displayName}
          email={item.email}
          role={item.customClaims.role}
          onSave={onSave}
          onDisable={onDisable}
          onEnable={onEnable}
          onDelete={onDelete}
        />
      ))}
    </List>
  );
};

export default TeamListing;
