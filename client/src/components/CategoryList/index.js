// @flow
import * as React from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import Item from './Item';

const List = styled.div`
  padding: 0;
  margin: 0;
  list-style: none;
`;

type Props = {
  isSaving: boolean,
  isCreating: boolean,
  items: Object,
  keys: Array<string>,
  onDragEnd: Function,
  onSave: Function,
  onDelete: Function,
  onNewCancel: Function,
  onNewSave: Function,
};
const CategoryList = (props: Props) => {
  const {
    isSaving,
    isCreating,
    items,
    keys,
    onDragEnd,
    onSave,
    onDelete,
    onNewCancel,
    onNewSave,
  } = props;

  if (keys == null || items == null) {
    return <div>Couldn't get categories</div>;
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
                  isDragDisabled={isCreating}
                >
                  {(provided, snapshot) => (
                    <Item
                      isDisabled={isCreating}
                      id={key}
                      index={index}
                      provided={provided}
                      snapshot={snapshot}
                      value={items[key]}
                      onSave={onSave}
                      onDelete={onDelete}
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
                  <Item
                    isDisabled={isSaving}
                    isNew={true}
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

export default CategoryList;
