// @flow
import * as React from 'react';
import styled from 'styled-components';

import Button from '../Button';
import Icon from '../Icon';
import icons from '../../constants/icons';

import { colors } from '../../utils/theme';

const Wrapper = styled.form``;
const Inner = styled.div`
  display: flex;
  padding: 1rem 1rem 1rem 2rem;
  border-bottom: 1px solid ${colors.grays[1]};

  background-color: #fff;
  transition: background-color 150ms;

  &.is-dragging {
    background-color: ${colors.grays[1]};
  }
`;
const IconWrapper = styled.div`
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  padding-right: 1rem;

  font-size: 1.75rem;
  color: ${colors.grays[2]};
  opacity: 1;
  transition: color 150ms, opacity 150ms;

  ${Inner}:hover &,
  ${Inner}:focus & {
    color: ${colors.grays[5]};
  }
  .is-dragging & {
    color: ${colors.black};
  }
  .is-disabled & {
    opacity: 0;
  }
`;
const Body = styled.div`
  flex: 1 1 auto;
  display: flex;
  align-items: center;
`;
const Actions = styled.div`
  flex: 0 0 15rem;
  display: flex;
  justify-content: flex-end;
  padding-left: 1rem;
`;
const Action = styled.div`
  & + & {
    margin-left: 0.5rem;
  }
`;

type Props = {
  isNew?: boolean,
  isDisabled: boolean,
  isEditing?: boolean,
  provided?: Object,
  snapshot?: Object,
  components: Array<React.Node>,
  onSave: Function,
  onDelete?: Function,
  onDisable?: Function,
  onEnable?: Function,
  onEdit?: Function,
  onCancel?: Function,
};

const Item = (props: Props) => {
  const { isNew, isDisabled, provided, snapshot } = props;

  const draggableProps = provided ? provided.draggableProps : null;
  const dragHandleProps = provided ? provided.dragHandleProps : null;

  return (
    <Wrapper
      className={isDisabled ? 'is-disabled' : ''}
      onSubmit={props.onSave}
    >
      <Inner
        innerRef={provided ? provided.innerRef : null}
        className={snapshot && snapshot.isDragging ? 'is-dragging' : ''}
        isDisabled={isDisabled}
        {...draggableProps}
        {...dragHandleProps}
      >
        {provided && (
          <IconWrapper>
            {isNew ? <Icon name={icons.PLUS} /> : <Icon name={icons.REORDER} />}
          </IconWrapper>
        )}
        <Body>{props.components.map((item, index) => item)}</Body>
        {props.isEditing ? (
          <Actions>
            <Action>
              <Button
                theme="secondary"
                iconLeft={icons.CLOSE}
                value="Cancel"
                onClick={props.onCancel}
                disabled={isDisabled}
              />
            </Action>
            <Action>
              <Button
                theme="primary"
                iconLeft={icons.CHECK}
                value="Save"
                onClick={props.onSave}
                disabled={isDisabled}
                type="submit"
              />
            </Action>
          </Actions>
        ) : (
          <Actions>
            {props.onDelete && (
              <Action>
                <Button
                  theme="link"
                  iconLeft={icons.REMOVE}
                  value="Delete"
                  onClick={props.onDelete}
                  disabled={isDisabled}
                />
              </Action>
            )}
            {props.onDisable && (
              <Action>
                <Button
                  theme="link"
                  iconLeft={icons.DISABLE}
                  value="Disable"
                  onClick={props.onDisable}
                  disabled={isDisabled}
                />
              </Action>
            )}
            {props.onEnable && (
              <Action>
                <Button
                  theme="secondary"
                  iconLeft={icons.CHECK}
                  value="Enable"
                  onClick={props.onEnable}
                  disabled={isDisabled}
                />
              </Action>
            )}
            {props.onEdit && (
              <Action>
                <Button
                  theme="secondary"
                  iconLeft={icons.EDIT}
                  value="Edit"
                  onClick={props.onEdit}
                  disabled={isDisabled}
                />
              </Action>
            )}
          </Actions>
        )}
      </Inner>
      {provided && provided.placeholder}
    </Wrapper>
  );
};

export default Item;
