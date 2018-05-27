// @flow
import * as React from 'react';

import ListingItem from '../components/ListingItem';
import Input from '../components/Input';

type Props = {
  isNew: boolean,
  isDisabled: boolean,
  isEditable: boolean,
  id?: string,
  index?: number,
  provided: Object,
  snapshot: Object,
  value: string,
  onSave: Function,
  onDelete: Function,
  onNewCancel: ?Function,
  onNewSave: ?Function,
};
type State = {
  isEditing: boolean,
  value: string,
  inputValue: string,
};

class CategoryListingItem extends React.Component<Props, State> {
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
      inputValue: e.currentTarget.value,
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
      this.props.onNewCancel && this.props.onNewCancel();
    } else {
      const inputValue = this.state.value;

      this.setState({
        isEditing: false,
        inputValue,
      });
    }
  };
  handleSave = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const activeEl = document.activeElement;
    if (activeEl) activeEl.blur();

    if (this.props.isNew) {
      this.props.onNewSave && this.props.onNewSave(this.state.inputValue);
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
    const components = [
      <Input
        key="category"
        innerRef={this.inputRef}
        value={this.state.inputValue}
        readOnly={!this.state.isEditing || !this.props.isEditable}
        onChange={this.handleChange}
        placeholder="Category"
        disabled={this.props.isDisabled}
      />,
    ];

    return (
      <ListingItem
        isNew={this.props.isNew}
        isDisabled={this.props.isDisabled}
        isEditing={this.state.isEditing}
        isEditable={this.props.isEditable}
        provided={this.props.provided}
        snapshot={this.props.snapshot}
        components={components}
        onSave={this.handleSave}
        onDelete={this.handleDelete}
        onEdit={this.handleEdit}
        onCancel={this.handleCancel}
      />
    );
  }
}

export default CategoryListingItem;
