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
  padding-left: 1rem;
`;
const Action = styled.span`
  & + & {
    margin-left: 0.5rem;
  }
`;

type Props = {
  provided: Object,
  snapshot: Object,
  value: string,
};
type State = {
  isEditing: boolean,
  value: string,
  inputValue: string,
};

class Item extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      value: props.value,
      inputValue: props.value,
    };

    this.inputRef = React.createRef();
  }

  handleChange = e => {
    this.setState({
      inputValue: e.target.value,
    });
  };

  handleEdit = e => {
    this.setState(
      {
        isEditing: true,
      },
      this.inputRef.current.focus()
    );
  };

  handleCancel = e => {
    const inputValue = this.state.value;

    this.setState({
      isEditing: false,
      inputValue,
    });
  };
  handleSave = e => {
    const value = this.state.inputValue;

    this.setState({
      isEditing: false,
      value,
    });
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
          <Actions>
            <Action>
              {this.state.isEditing ? (
                <Button
                  iconLeft={icons.CLOSE}
                  value="Cancel"
                  onClick={this.handleCancel}
                />
              ) : (
                <Button iconLeft={icons.REMOVE} value="Delete" />
              )}
            </Action>
            <Action>
              {this.state.isEditing ? (
                <Button
                  theme="primary"
                  iconLeft={icons.CHECK}
                  value="Save"
                  onClick={this.handleSave}
                />
              ) : (
                <Button
                  iconLeft={icons.EDIT}
                  value="Edit"
                  onClick={this.handleEdit}
                />
              )}
            </Action>
          </Actions>
        </Wrapper>
        {provided.placeholder}
      </div>
    );
  }
}

export default Item;
