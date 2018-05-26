// @flow
import * as React from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import CategoryListingItem from '../../containers/CategoryListingItem';

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
  isEditable: boolean,
  items: Object,
  keys: Array<string>,
  onDragEnd: Function,
  onSave: Function,
  onDelete: Function,
  onNewCancel: Function,
  onNewSave: Function,
};
const CategoryListing = (props: Props) => {
  const {
    isSaving,
    isCreating,
    isEditable,
    items,
    keys,
    onDragEnd,
    onSave,
    onDelete,
    onNewCancel,
    onNewSave,
  } = props;

  if (keys == null || items == null) {
    return <Error>So empty&hellip;</Error>;
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <List innerRef={provided.innerRef}>
            {keys.map((key, index) => {
              return (
                <Draggable
                  key={key}
                  draggableId={key}
                  index={index}
                  isDragDisabled={isCreating || !isEditable}
                >
                  {(provided, snapshot) => (
                    <CategoryListingItem
                      isNew={false}
                      isDisabled={isCreating}
                      isEditable={isEditable}
                      id={key}
                      index={index}
                      provided={provided}
                      snapshot={snapshot}
                      value={items[key].name}
                      onSave={onSave}
                      onDelete={onDelete}
                      onNewCancel={null}
                      onNewSave={null}
                    />
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}

            {isCreating && (
              <Draggable
                draggableId="new"
                index={items ? items.length : 0}
                isDragDisabled={isCreating}
              >
                {(provided, snapshot) => (
                  <CategoryListingItem
                    isNew={true}
                    isDisabled={isSaving}
                    isEditable={true}
                    provided={provided}
                    snapshot={snapshot}
                    value=""
                    onSave={onSave}
                    onDelete={onDelete}
                    onNewCancel={onNewCancel}
                    onNewSave={onNewSave}
                  />
                )}
              </Draggable>
            )}
          </List>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default CategoryListing;
