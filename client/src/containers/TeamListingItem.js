// @flow
import * as React from 'react';
import styled from 'styled-components';

import ListingItem from '../components/ListingItem';
import Avatar from '../components/Avatar';
import Input from '../components/Input';
import Select from '../components/Select';

import role from '../constants/role';

// const UserIcon = styled.div`
//   flex: 0 0 auto;
//   width: 3.25rem;
//   padding-right: 1.25rem;
//   font-size: 1.75rem;
//   color: ${colors.grays[2]};
//   text-align: center;
// `;
const UserAvatar = styled.div`
  flex: 0 0 auto;
  padding-right: 1rem;
`;
const UserEmail = styled.div`
  flex: 1 1 33.333%;
  padding-right: 1rem;
`;
const UserName = styled.div`
  flex: 1 1 33.333%;
  padding-right: 1rem;
`;
const UserRole = styled.div`
  flex: 1 1 33.333%;
`;

type Props = {
  isDisabled: boolean,
  isEditable: boolean,
  uid: string,
  index: number,
  avatar: string,
  displayName: string,
  email: string,
  role: string,
  onSave: Function,
  onDisable?: Function,
  onEnable?: Function,
  onDelete?: Function,
};
type State = {
  isEditing: boolean,
  value: string,
  selectValue: $Keys<typeof role>,
};

class TeamListingItem extends React.Component<Props, State> {
  selectRef: ?HTMLSelectElement;

  constructor(props: Props) {
    super(props);

    this.state = {
      isEditing: false,
      value: props.role,
      selectValue: props.role,
    };

    this.selectRef = React.createRef();
  }

  handleSelectChange = (e: SyntheticEvent<HTMLSelectElement>) => {
    this.setState({
      selectValue: e.currentTarget.value,
    });
  };

  handleDisable = (e: SyntheticEvent<HTMLButtonElement>) => {
    if (this.props.onDisable) this.props.onDisable(this.props.index);
  };
  handleEnable = (e: SyntheticEvent<HTMLButtonElement>) => {
    if (this.props.onEnable) this.props.onEnable(this.props.index);
  };
  handleDelete = (e: SyntheticEvent<HTMLButtonElement>) => {
    if (this.props.onDelete) this.props.onDelete(this.props.index);
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
    const selectValue = this.state.value;

    this.setState({
      isEditing: false,
      selectValue,
    });
  };
  handleSave = (e: SyntheticEvent<HTMLButtonElement>) => {
    const value = this.state.selectValue;

    this.setState({
      isEditing: false,
      value,
    });
    this.props.onSave(this.props.index, value);
  };

  render() {
    const { isDisabled } = this.props;

    const options = [
      // {
      //   value: 'admin',
      //   label: 'admin',
      // },
      {
        value: role.EDITOR,
        label: role.EDITOR,
      },
      {
        value: role.AUTHOR,
        label: role.AUTHOR,
      },
    ];

    const components = [
      <UserAvatar key="avatar">
        <Avatar alt={this.props.email} size="sm" />
      </UserAvatar>,
      <UserName key="displayName">
        <Input
          value={this.props.displayName}
          readOnly={true}
          disabled={isDisabled}
          type="text"
        />
      </UserName>,
      <UserEmail key="email">
        <Input
          value={this.props.email}
          readOnly={true}
          disabled={isDisabled}
          type="email"
        />
      </UserEmail>,
      <UserRole key="role">
        {this.props.role === role.ADMIN ? (
          <Input value={this.props.role} readOnly={true} type="text" />
        ) : (
          <Select
            innerRef={this.selectRef}
            value={this.state.selectValue}
            readOnly={!this.state.isEditing && !this.state.isEditable}
            onChange={this.handleSelectChange}
            disabled={isDisabled}
            options={options}
          />
        )}
      </UserRole>,
    ];

    return (
      <ListingItem
        isDisabled={this.props.isDisabled}
        isEditing={this.state.isEditing}
        isEditable={this.props.isEditable}
        components={components}
        onSave={this.handleSave}
        onDisable={
          this.props.onDisable && this.props.role !== role.ADMIN
            ? this.handleDisable
            : undefined
        }
        onEnable={this.props.onEnable ? this.handleEnable : undefined}
        onDelete={this.props.onDelete ? this.handleDelete : undefined}
        onEdit={
          this.props.onDisable && this.props.role !== role.ADMIN
            ? this.handleEdit
            : undefined
        }
        onCancel={this.handleCancel}
      />
    );
  }
}

export default TeamListingItem;
