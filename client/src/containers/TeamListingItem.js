// @flow
import * as React from 'react';
import styled from 'styled-components';

import ListingItem from '../components/ListingItem';
import Avatar from '../components/Avatar';
import Input from '../components/Input';
import Select from '../components/Select';
import Button from '../components/Button';
import Icon from '../components/Icon';
import icons from '../constants/icons';

import { colors } from '../utils/theme';

const UserIcon = styled.div`
  flex: 0 0 auto;
  width: 3.25rem;
  padding-right: 1.25rem;
  font-size: 1.75rem;
  color: ${colors.grays[2]};
  text-align: center;
`;
const UserAvatar = styled.div`
  flex: 0 0 auto;
  padding-right: 1rem;
`;
const UserEmail = styled.div`
  flex: 1 1 50%;
  padding-right: 1rem;
`;
const UserRole = styled.div`
  flex: 1 1 50%;
`;

type Props = {
  isNew: boolean,
  isDisabled: boolean,
  id?: string,
  avatar: string,
  email: string,
  value: string,
  onSave: Function,
  onDelete: Function,
  onNewCancel: ?Function,
  onNewSave: ?Function,
};
type State = {
  isEditing: boolean,
  value: string,
  selectValue: string,
  inputValue: string,
};

class TeamListingItem extends React.Component<Props, State> {
  selectRef: ?Object;
  inputRef: ?Object;

  constructor(props: Props) {
    super(props);

    this.state = {
      isEditing: props.isNew ? true : false,
      value: props.value,
      selectValue: props.value,
      inputValue: '',
    };

    this.selectRef = React.createRef();
    this.inputRef = React.createRef();
  }

  componentDidMount = () => {
    if (this.props.isNew && this.selectRef) {
      this.selectRef.current.focus();
    }
  };

  handleInputChange = (e: SyntheticEvent<HTMLInputElement>) => {
    this.setState({
      inputValue: e.target.value,
    });
  };

  handleSelectChange = (e: SyntheticEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    this.setState({
      selectValue: e.target.value,
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
        this.selectRef && this.selectRef.current.focus();
      }
    );
  };

  handleCancel = (e: SyntheticEvent<HTMLButtonElement>) => {
    if (this.props.isNew) {
      this.props.onNewCancel && this.props.onNewCancel();
    } else {
      const selectValue = this.state.value;

      this.setState({
        isEditing: false,
        selectValue,
      });
    }
  };
  handleSave = (e: SyntheticEvent<HTMLButtonElement>) => {
    if (this.props.isNew) {
      this.props.onNewSave && this.props.onNewSave(this.state.selectValue);
    } else {
      const value = this.state.selectValue;

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
    const { isNew, isDisabled } = this.props;

    const options = [
      {
        value: 'admin',
        label: 'admin',
      },
      {
        value: 'editor',
        label: 'editor',
      },
      {
        value: 'author',
        label: 'author',
      },
    ];

    const components = [
      this.props.isNew ? (
        <UserIcon key="0">
          <Icon name={icons.PLUS} />
        </UserIcon>
      ) : (
        <UserAvatar key="0">
          <Avatar alt={this.props.email} size="sm" />
        </UserAvatar>
      ),
      <UserEmail key="1">
        <Input
          innerRef={this.inputRef}
          value={this.props.email}
          readOnly={!this.props.isNew}
          onChange={this.handleInputChange}
          placeholder="Email"
          disabled={isDisabled}
        />
      </UserEmail>,
      <UserRole key="2">
        <Select
          innerRef={this.selectRef}
          value={this.state.selectValue}
          readOnly={!this.state.isEditing}
          onChange={this.handleSelectChange}
          disabled={isDisabled}
          options={options}
        />
      </UserRole>,
    ];

    return (
      <ListingItem
        isNew={this.props.isNew}
        isDisabled={this.props.isDisabled}
        isEditing={this.state.isEditing}
        components={components}
        onSave={this.handleSave}
        onDelete={this.handleDelete}
        onEdit={this.handleEdit}
        onCancel={this.handleCancel}
      />
    );
  }
}

export default TeamListingItem;
