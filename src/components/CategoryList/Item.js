// @flow
import * as React from 'react';
import styled from 'styled-components';

import Input from '../Input';
import Button from '../Button';
import Icon from '../Icon';
import icons from '../../constants/icons';

import { colors } from '../../utils/theme';

const Wrapper = styled.div`
  display: flex;
  padding: 1rem 1rem 1rem 2rem;

  background-color: #fff;
  transition: background-color 150ms;

  &:hover,
  &:focus {
    background-color: ${colors.grays[0]};
  }

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
  transition: color 150ms;

  ${Wrapper}:hover &,
  ${Wrapper}:focus & {
    color: ${colors.grays[5]};
  }
  .is-dragging & {
    color: ${colors.black};
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
  id: string,
  index: number,
  provided: Object,
  snapshot: Object,
  value: string,
  onSave: Function,
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
      isEditing: false,
      value: props.value,
      inputValue: props.value,
    };

    this.inputRef = React.createRef();
  }

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
    const inputValue = this.state.value;

    this.setState({
      isEditing: false,
      inputValue,
    });
  };
  handleSave = (e: SyntheticEvent<HTMLButtonElement>) => {
    const value = this.state.inputValue;

    this.setState(
      {
        isEditing: false,
        value,
      },
      this.props.onSave(this.props.id, value)
    );
  };

  render() {
    const { provided, snapshot } = this.props;

    return (
      <div>
        <Wrapper
          innerRef={provided.innerRef}
          className={snapshot.isDragging ? 'is-dragging' : ''}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <IconWrapper>
            <Icon name={icons.MOVE_VERTICAL} />
          </IconWrapper>
          <Body>
            <Input
              innerRef={this.inputRef}
              value={this.state.inputValue}
              readOnly={!this.state.isEditing}
              onChange={this.handleChange}
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
                />
              </Action>
              <Action>
                <Button
                  theme="primary"
                  iconLeft={icons.CHECK}
                  value="Save"
                  onClick={this.handleSave}
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
                />
              </Action>
              <Action>
                <Button
                  theme="secondary"
                  iconLeft={icons.EDIT}
                  value="Edit"
                  onClick={this.handleEdit}
                />
              </Action>
            </Actions>
          )}
        </Wrapper>
        {provided.placeholder}
      </div>
    );
  }
}

export default Item;
