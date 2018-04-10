// @flow
import * as React from 'react';
import styled from 'styled-components';

import Input from '../Input';
import Button from '../Button';
import Icon from '../Icon';
import icons from '../../constants/icons';

import { colors } from '../../utils/theme';

const Inner = styled.div`
  display: flex;
  padding: 1rem 1rem 1rem 2rem;
  border-bottom: 1px solid ${colors.grays[1]};

  background-color: #fff;
  transition: background-color 150ms;

  ${props =>
    !props.isDisabled
      ? `
    &:hover,
    &:focus {
      background-color: ${colors.grays[0]};
    }
  `
      : ''}
  &.is-dragging {
    background-color: ${colors.grays[1]};
  }
`;
const IconWrapper = styled.div`
  flex: 0 0 auto;
  display: flex;
  align-items: center;

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
  padding-left: 1rem;
`;
const Actions = styled.div`
  flex: 0 0 auto;
  display: flex;
  padding-left: 1rem;
`;
const Action = styled.div`
  & + & {
    margin-left: 0.5rem;
  }
`;

type Props = {
  isNew?: boolean,
  isDisabled?: boolean,
  id?: string,
  index?: number,
  provided: Object,
  snapshot: Object,
  value: string,
  onSave: Function,
  onNewCancel?: Function,
  onNewSave?: Function,
};
type State = {
  isEditing: boolean,
  value: string,
  inputValue: string,
};

class Item extends React.Component<Props, State> {
  inputRef: ?Object;

  constructor(props: Props) {
    super(props);

    this.state = {
      isEditing: props.isNew ? true : false,
      value: props.value,
      inputValue: props.value,
    };

    this.inputRef = React.createRef();
  }

  componentDidMount = () => {
    if (this.props.isNew && this.inputRef) {
      this.inputRef.current.focus();
    }
  };

  handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    this.setState({
      inputValue: e.target.value,
    });
  };

  handleDelete = (e: SyntheticEvent<HTMLButtonElement>) => {
    this.props.onDelete(this.props.index);
  };

  handleEdit = (e: SyntheticEvent<HTMLButtonElement>) => {
    this.setState(
      {
        isEditing: true,
      },
      () => {
        this.inputRef && this.inputRef.current.focus();
      }
    );
  };

  handleCancel = (e: SyntheticEvent<HTMLButtonElement>) => {
    if (this.props.isNew) {
      this.props.onNewCancel();
    } else {
      const inputValue = this.state.value;

      this.setState({
        isEditing: false,
        inputValue,
      });
    }
  };
  handleSave = (e: SyntheticEvent<HTMLButtonElement>) => {
    if (this.props.isNew) {
      this.props.onNewSave(this.state.inputValue);
    } else {
      const value = this.state.inputValue;

      this.setState(
        {
          isEditing: false,
          value,
        },
        this.props.onSave(this.props.id, value)
      );
    }
  };

  render() {
    const { isNew, isDisabled, provided, snapshot } = this.props;

    return (
      <div className={isDisabled ? 'is-disabled' : ''}>
        <Inner
          innerRef={provided.innerRef}
          className={snapshot.isDragging ? 'is-dragging' : ''}
          isDisabled={isDisabled}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <IconWrapper>
            {isNew ? <Icon name={icons.PLUS} /> : <Icon name={icons.REORDER} />}
          </IconWrapper>
          <Body>
            <Input
              innerRef={this.inputRef}
              value={this.state.inputValue}
              readOnly={!this.state.isEditing}
              onChange={this.handleChange}
              placeholder="Category"
              disabled={isDisabled}
            />
          </Body>
          {this.state.isEditing ? (
            <Actions>
              <Action>
                <Button
                  theme="secondary"
                  iconLeft={icons.CLOSE}
                  value="Cancel"
                  onClick={this.handleCancel}
                  disabled={isDisabled}
                />
              </Action>
              <Action>
                <Button
                  theme="primary"
                  iconLeft={icons.CHECK}
                  value="Save"
                  onClick={this.handleSave}
                  disabled={isDisabled}
                />
              </Action>
            </Actions>
          ) : (
            <Actions>
              <Action>
                <Button
                  theme="secondary"
                  iconLeft={icons.REMOVE}
                  value="Delete"
                  onClick={this.handleDelete}
                  disabled={isDisabled}
                />
              </Action>
              <Action>
                <Button
                  theme="secondary"
                  iconLeft={icons.EDIT}
                  value="Edit"
                  onClick={this.handleEdit}
                  disabled={isDisabled}
                />
              </Action>
            </Actions>
          )}
        </Inner>
        {provided.placeholder}
      </div>
    );
  }
}

export default Item;
