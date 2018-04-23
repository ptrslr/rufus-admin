// @flow
import * as React from 'react';

import TeamListing from '../components/TeamListing/';
import Page from '../components/Page';
import PageHeader from '../components/PageHeader';
import PageBody from '../components/PageBody';
import InlineLoader from '../components/InlineLoader';
import Loader from '../components/Loader';
import Button from '../components/Button';

import icons from '../constants/icons';
import { colors } from '../utils/theme';

const team = {
  '0': {
    email: 'test@test.test',
    role: 'admin',
  },
  '1': {
    email: 'foo@bar.test',
    role: 'author',
  },
};

type Props = {
  history: Object,
};
type State = {
  isLoading: boolean,
  isSaving: boolean,
  isCreating: boolean,
  isModalOpen: boolean,
  items: Object,
  deleteIndex?: number,
};
class Team extends React.Component<Props, State> {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      isSaving: false,
      isCreating: false,
      isModalOpen: false,
      items: team,
    };
  }

  componentDidMount = () => {
    this.setState({
      isLoading: false,
    });
  };

  onSave = (id: string, value: string) => {
    this.setState({ isSaving: true });
  };
  onDelete = (index: number) => {
    this.setState({
      isModalOpen: true,
      deleteIndex: index,
    });
  };
  onDeleteConfirm = () => {
    this.setState({
      isSaving: false,
    });
  };

  onNewCancel = () => {
    this.setState({
      isCreating: false,
    });
  };
  onNewSave = (value: string) => {
    this.setState({
      isSaving: false,
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
      <Button
        theme="primary"
        value="Add member"
        onClick={this.handleCreate}
        iconLeft={icons.PLUS}
      />,
    ];

    return (
      <Page>
        <PageHeader title="Team" actions={actions} />

        <PageBody padding="2rem 0">
          <Loader isLoading={this.state.isLoading}>
            <TeamListing
              isSaving={this.state.isSaving}
              isCreating={this.state.isCreating}
              onSave={this.onSave}
              onDelete={this.onDelete}
              onNewCancel={this.onNewCancel}
              onNewSave={this.onNewSave}
              items={this.state.items}
            />
          </Loader>
        </PageBody>
      </Page>
    );
  }
}

export default Team;
