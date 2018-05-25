// @flow
import * as React from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import Option from './Option';
import Input from '../Input';

import type { Poll as PollType } from '../../utils/types';

const Wrapper = styled.div`
  padding: 0.5rem 0 0.5rem;
`;
const Question = styled(Input)`
  margin-bottom: 0.25rem;
  font-weight: 700;
`;

type Props = {
  onQuestionChange: Function,
  onOptionChange: Function,
  onOptionDelete: Function,
} & PollType;

const NewPoll = (props: Props) => {
  const {
    question,
    options,
    onQuestionChange,
    onOptionChange,
    onOptionDelete,
    onDragEnd,
  } = props;

  return (
    <Wrapper>
      <Question
        value={question}
        onChange={onQuestionChange}
        placeholder="Question"
      />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div ref={provided.innerRef}>
              {options.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <Option
                      index={index}
                      value={item.value}
                      onOptionChange={onOptionChange}
                      onOptionDelete={onOptionDelete}
                      provided={provided}
                      snapshot={snapshot}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Wrapper>
  );
};

export default NewPoll;
