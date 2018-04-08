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
  items: Object,
  keys: Array<string>,
  onDragEnd: Function,
  onSave: Function,
  onDelete: Function,
};
const CategoryList = (props: Props) => {
  const { items, keys, onDragEnd, onSave, onDelete } = props;
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
                  isDragDisabled={true}
                >
                  {(provided, snapshot) => (
                    <Item
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
          </List>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default CategoryList;
