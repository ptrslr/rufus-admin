// @flow
import * as React from 'react';

import Page from '../components/Page';
import PageHeader from '../components/PageHeader';
import PageBody from '../components/PageBody';
import InlineLoader from '../components/InlineLoader';
import Loader from '../components/Loader';
import CategoryListing from '../components/CategoryListing';
import Button from '../components/Button';
import ConfirmModal from '../components/ConfirmModal';

import icons from '../constants/icons';
import role from '../constants/role';

import {
  createCategory,
  fetchCategories,
  fetchCategoryKeys,
  updateCategoryKeys,
  deleteCategory,
  updateCategory,
} from '../api';

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

type Props = {};
type State = {
  isLoading: boolean,
  isSaving: boolean,
  isCreating: boolean,
  isModalOpen: boolean,
  userRole: $Values<typeof role>,
  items: Object,
  keys: Array<string>,
  deleteIndex?: ?number,
  deleteName?: ?string,
};
class Categories extends React.Component<Props, State> {
  _isMounted: ?boolean;

  constructor() {
    super();

    this.state = {
      isLoading: true,
      isSaving: false,
      isCreating: false,
      isModalOpen: false,
      items: {},
      keys: [],
    };
  }

  componentDidMount = async () => {
    this._isMounted = true;
    this.init();
  };

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  init = async () => {
    const items = await fetchCategories();
    const keys = await fetchCategoryKeys();

    if (this._isMounted) {
      this.setState({
        isLoading: false,
        isSaving: false,
        isCreating: false,
        isModalOpen: false,
        items,
        keys,
      });
    }
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
    this.setState({ isSaving: true });

    updateCategory(id, value).then(() => {
      let items = Object.assign(this.state.items);
      items[id] = value;
      this.setState({ isSaving: false, items });
    });
  };
  onDelete = (index: number) => {
    const deleteName = this.state.items[this.state.keys[index]].name;

    this.setState({
      isModalOpen: true,
      deleteIndex: index,
      deleteName,
    });
  };
  onDeleteConfirm = () => {
    this.setState({
      isSaving: true,
    });
    const index = this.state.deleteIndex;

    if (index != null) {
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
        this.closeModal();
      });
    } else {
      this.setState({
        isSaving: false,
      });
    }
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

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const actions = [
      <InlineLoader size="1.25rem" isLoading={this.state.isSaving} />,
      (this.props.userRole === role.ADMIN ||
        this.props.userRole === role.EDITOR) && (
        <Button
          theme="primary"
          value="Create new"
          iconLeft={icons.PLUS}
          onClick={this.handleCreate}
          disabled={this.state.isCreating}
        />
      ),
    ];

    const deleteName = this.state.deleteName;

    return (
      <Page>
        <PageHeader title="Categories" actions={actions} />

        <PageBody padding="2rem 0">
          <Loader isLoading={this.state.isLoading}>
            <CategoryListing
              isSaving={this.state.isSaving}
              isCreating={this.state.isCreating}
              isEditable={
                this.props.userRole === role.ADMIN ||
                this.props.userRole === role.EDITOR
              }
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

        <ConfirmModal
          isOpen={this.state.isModalOpen}
          closeModal={this.closeModal}
          title="Are you sure?"
          subtitle={
            <div>
              You're about to delete category named{' '}
              <strong>{deleteName ? deleteName : ''}</strong>
            </div>
          }
          onConfirm={this.onDeleteConfirm}
          onCancel={this.closeModal}
          confirmValue="Delete"
        />
      </Page>
    );
  }
}

export default Categories;
