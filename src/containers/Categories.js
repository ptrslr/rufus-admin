// @flow
import * as React from 'react';

import Page from '../components/Page';
import PageHeader from '../components/PageHeader';
import PageBody from '../components/PageBody';
import CategoryList from '../components/CategoryList';
import Button from '../components/Button';
import icons from '../constants/icons';

const categories = {
  kdmklasmdklasd: 'Ekonomika',
  lkmdkmomasdkmo: 'Music',
  oijiovnasndead: 'Sport',
};
const categoryKeys = ['kdmklasmdklasd', 'oijiovnasndead', 'lkmdkmomasdkmo'];

const reorder = (keys, startIndex, endIndex) => {
  const result = Array.from(keys);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

type State = {
  isCreating: boolean,
  items: Object,
  keys: Array<string>,
};
class Categories extends React.Component<null, State> {
  constructor() {
    super();

    this.state = {
      isCreating: false,
      items: categories,
      keys: categoryKeys,
    };
  }

  onDragEnd = (result: Object) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const keys = reorder(
      this.state.keys,
      result.source.index,
      result.destination.index
    );

    this.setState({
      keys,
    });
  };

  onSave = (id: string, value: string) => {
    let items = Object.assign(this.state.items);
    items[id] = value;

    this.setState({ items });
  };
  onDelete = (index: number) => {
    let keys = Array.from(this.state.keys);
    keys.splice(index, 1);

    let items = Object.assign(this.state.items);
    delete items[index];

    this.setState({
      items,
      keys,
    });
  };

  handleCreate = (e: SyntheticEvent<HTMLButtonElement>) => {};

  render() {
    const actions = [
      <Button
        theme="primary"
        value="Create new"
        iconLeft={icons.PLUS}
        onClick={this.handleCreate}
      />,
    ];

    return (
      <Page>
        <PageHeader title="Categories" actions={actions} />

        <PageBody padding="2rem 0">
          <CategoryList
            onDragEnd={this.onDragEnd}
            onSave={this.onSave}
            onDelete={this.onDelete}
            items={this.state.items}
            keys={this.state.keys}
          />
        </PageBody>
      </Page>
    );
  }
}

export default Categories;
