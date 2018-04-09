// @flow
import * as React from 'react';

import Page from '../components/Page';
import PageHeader from '../components/PageHeader';
import PageBody from '../components/PageBody';
import InlineLoader from '../components/InlineLoader';
import Loader from '../components/Loader';
import CategoryList from '../components/CategoryList';
import Button from '../components/Button';
import icons from '../constants/icons';
import { colors } from '../utils/theme';

import {
  createCategory,
  fetchCategories,
  fetchCategoryKeys,
  updateCategoryKeys,
  deleteCategory,
} from '../api/firebase';

// const categories = {
//   kdmklasmdklasd: 'Ekonomika',
//   lkmdkmomasdkmo: 'Music',
//   oijiovnasndead: 'Sport',
// };
// const categoryKeys = ['kdmklasmdklasd', 'oijiovnasndead', 'lkmdkmomasdkmo'];

const reorder = (keys, startIndex, endIndex) => {
  const result = Array.from(keys);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

type State = {
  isLoading: boolean,
  isSaving: boolean,
  isCreating: boolean,
  items: Object,
  keys: Array<string>,
};
class Categories extends React.Component<null, State> {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      isSaving: false,
      isCreating: false,
      items: {},
      keys: [],
    };
  }

  async componentDidMount() {
    this.init();
  }

  init = async () => {
    const items = await fetchCategories();
    const keys = await fetchCategoryKeys();

    this.setState({
      isLoading: false,
      isSaving: false,
      isCreating: false,
      items,
      keys,
    });
  };

  onDragEnd = async (result: Object) => {
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
      isSaving: true,
      keys,
    });

    const updatePromise = updateCategoryKeys(keys);
    updatePromise.then(() => {
      this.setState({
        isSaving: false,
      });
    });
  };

  onSave = (id: string, value: string) => {
    let items = Object.assign(this.state.items);
    items[id] = value;

    this.setState({ items });
  };
  onDelete = (index: number) => {
    this.setState({
      isSaving: true,
    });

    const id = this.state.keys[index];

    let keys = Array.from(this.state.keys);
    keys.splice(index, 1);

    let items = Object.assign(this.state.items);
    delete items[index];

    const deletePromise = deleteCategory(id, keys);

    deletePromise.then(() => {
      this.setState({
        isSaving: false,
        items,
        keys,
      });
    });
  };

  onNewCancel = () => {
    this.setState({
      isCreating: false,
    });
  };
  onNewSave = (value: string) => {
    this.setState({
      isSaving: true,
    });
    const createPromise = createCategory(value);

    createPromise.then(() => {
      this.init();
    });
  };

  handleCreate = (e: SyntheticEvent<HTMLButtonElement>) => {
    this.setState({
      isCreating: true,
    });
  };

  render() {
    const actions = [
      <InlineLoader size="1.25rem" isLoading={this.state.isSaving} />,
      <Button
        theme="primary"
        value="Create new"
        iconLeft={icons.PLUS}
        onClick={this.handleCreate}
        disabled={this.state.isCreating}
      />,
    ];

    return (
      <Page>
        <PageHeader title="Categories" actions={actions} />

        <PageBody padding="2rem 0">
          <Loader isLoading={this.state.isLoading}>
            <CategoryList
              isSaving={this.state.isSaving}
              isCreating={this.state.isCreating}
              onDragEnd={this.onDragEnd}
              onSave={this.onSave}
              onDelete={this.onDelete}
              onNewCancel={this.onNewCancel}
              onNewSave={this.onNewSave}
              items={this.state.items}
              keys={this.state.keys}
            />
          </Loader>
        </PageBody>
      </Page>
    );
  }
}

export default Categories;
