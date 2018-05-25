// @flow
import * as React from 'react';
import styled from 'styled-components';

import Icon from '../Icon';
import Input from '../Input';
import Button from '../Button';

import icons from '../../constants/icons';
import { colors } from '../../constants/theme';

const Wrapper = styled.div`
  display: flex;
  padding: 0.25rem 0;
`;
const IconWrapper = styled.div`
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  padding-right: 0.5rem;

  font-size: 1rem;
  color: ${colors.grays[2]};
  opacity: 1;
  transition: color 150ms, opacity 150ms;

  &:hover,
  ${Wrapper}:focus & {
    color: ${colors.grays[5]};
  }
  .is-dragging & {
    color: ${colors.black};
  }
  .is-disabled & {
    opacity: 0;
  }
`;
const RemoveButton = styled(Button)`
  padding-left: 0.25rem;
  padding-right: 0.25rem;

  color: ${colors.grays[5]};

  &:hover,
  &:focus {
    color: ${colors.black};
    background: none;
  }
`;

type Props = {
  index: number,
  value: string,
  onOptionChange: Function,
  onOptionDelete: Function,
  provided?: Object,
  snapshot?: Object,
};

const Option = (props: Props) => {
  const {
    index,
    value,
    onOptionChange,
    onOptionDelete,
    provided,
    snapshot,
  } = props;

  const handleOptionChange = (e: SyntheticEvent<HTMLInputElement>) => {
    onOptionChange(index, e.currentTarget.value);
  };

  const handleOptionDelete = () => {
    onOptionDelete(index);
  };

  const draggableProps = provided ? provided.draggableProps : null;
  const dragHandleProps = provided ? provided.dragHandleProps : null;

  return (
    <div>
      <Wrapper
        innerRef={provided ? provided.innerRef : null}
        className={snapshot && snapshot.isDragging ? 'is-dragging' : ''}
        {...draggableProps}
        {...dragHandleProps}
      >
        <IconWrapper>
          <Icon name={icons.REORDER} />
        </IconWrapper>
        <Input
          value={value}
          onChange={handleOptionChange}
          placeholder={`Option ${index + 1}`}
        />
        {index > 1 && (
          <RemoveButton
            theme="link"
            iconLeft={icons.CLOSE}
            onClick={handleOptionDelete}
          />
        )}
      </Wrapper>
      {provided && provided.placeholder}
    </div>
  );
};

export default Option;
