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
  keys: Array,
  onDragEnd: Function,
};
const CategoryList = (props: Props) => {
  const { items, keys, onDragEnd } = props;
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <List innerRef={provided.innerRef}>
            {keys.map((key, index) => {
              return (
                <Draggable key={key} draggableId={key} index={index}>
                  {(provided, snapshot) => (
                    <Item
                      provided={provided}
                      snapshot={snapshot}
                      value={items[key]}
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
