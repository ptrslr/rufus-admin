// @flow
import * as React from 'react';

import TeamListing from '../components/TeamListing/';
import Page from '../components/Page';
import PageHeader from '../components/PageHeader';
import PageBody from '../components/PageBody';
import InlineLoader from '../components/InlineLoader';
import Loader from '../components/Loader';
import Button from '../components/Button';
import ConfirmModal from '../components/ConfirmModal';

import {
  fetchActiveTeam,
  fetchDisabledTeam,
  disableTeamMember,
  enableTeamMember,
  updateTeamMember,
} from '../api';
import icons from '../constants/icons';

type Props = {
  disabled: boolean,
};
type State = {
  isLoading: boolean,
  isSaving: boolean,
  isCreating: boolean,
  isDisableModalOpen: boolean,
  isEnableModalOpen: boolean,
  isDeleteModalOpen: boolean,
  items: Object,
  currentIndex?: ?number,
};
class Team extends React.Component<Props, State> {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      isSaving: false,
      isCreating: false,
      isDisableModalOpen: false,
      items: {},
    };
  }

  componentDidMount = async () => {
    const items = this.props.disabled
      ? await fetchDisabledTeam()
      : await fetchActiveTeam();

    this.setState({
      isLoading: false,
      items,
    });
  };

  componentDidUpdate = async (prevProps: Props) => {
    if (prevProps !== this.props) {
      this.setState({
        isLoading: true,
      });

      const items = this.props.disabled
        ? await fetchDisabledTeam()
        : await fetchActiveTeam();

      this.setState({
        isLoading: false,
        items,
      });
    }
  };

  onSave = async (index: number, value: string) => {
    this.setState({ isSaving: true });

    const uid = this.state.items[index].uid;
    await updateTeamMember(uid, { role: value });

    this.setState({ isSaving: false });
  };

  onDisable = (index: number) => {
    this.setState({
      isDisableModalOpen: true,
      currentIndex: index,
    });
  };
  onDisableConfirm = async () => {
    const currentIndex = this.state.currentIndex;
    if (currentIndex != null) {
      this.setState({
        isLoading: true,
        isDisableModalOpen: false,
      });

      const uid = this.state.items[currentIndex].uid;

      await disableTeamMember(uid);
      const items = this.state.items;
      items.splice(currentIndex, 1);

      this.setState({
        isLoading: false,
        currentIndex: null,
        items,
      });
    }
  };

  onEnable = (index: number) => {
    this.setState({
      isEnableModalOpen: true,
      currentIndex: index,
    });
  };
  onEnableConfirm = async () => {
    const currentIndex = this.state.currentIndex;

    if (currentIndex != null) {
      this.setState({
        isLoading: true,
        isEnableModalOpen: false,
      });

      const uid = this.state.items[currentIndex].uid;

      await enableTeamMember(uid);
      const items = this.state.items;
      items.splice(currentIndex, 1);

      this.setState({
        isLoading: false,
        currentIndex: null,
        items,
      });
    }
  };

  handleCreate = (e: SyntheticEvent<HTMLButtonElement>) => {
    this.setState({
      isCreating: true,
    });
  };

  openModal = () => {
    this.setState({ isDisableModalOpen: true });
  };

  closeDisableModal = () => {
    this.setState({ isDisableModalOpen: false });
  };
  closeEnableModal = () => {
    this.setState({ isEnableModalOpen: false });
  };
  closeDeleteModal = () => {
    this.setState({ isDeleteModalOpen: false });
  };

  render() {
    const menu = [
      {
        label: 'Active',
        to: '/team/active',
      },
      {
        label: 'Disabled',
        to: '/team/disabled',
      },
    ];

    const actions = [
      <InlineLoader size="1.25rem" isLoading={this.state.isSaving} />,
      <Button
        theme="primary"
        value="Add member"
        to="/team/new-member"
        iconLeft={icons.PLUS}
      />,
    ];

    const currentIndex = this.state.currentIndex;

    let currentName;
    if (currentIndex != null && this.state.items) {
      currentName = this.state.items[currentIndex].displayName;
    }

    return (
      <Page>
        <PageHeader title="Team" menu={menu} actions={actions} />

        <PageBody padding="2rem 0">
          <Loader isLoading={this.state.isLoading}>
            <TeamListing
              isSaving={this.state.isSaving}
              isCreating={this.state.isCreating}
              onSave={this.onSave}
              onDisable={!this.props.disabled ? this.onDisable : undefined}
              onEnable={this.props.disabled ? this.onEnable : undefined}
              items={this.state.items}
            />
          </Loader>
        </PageBody>

        <ConfirmModal
          isOpen={this.state.isDisableModalOpen}
          closeModal={this.closeDisableModal}
          title="Are you sure?"
          subtitle={
            <div>
              Are you sure you want to disable{' '}
              <strong>{currentName ? currentName : ''}</strong>
            </div>
          }
          onConfirm={this.onDisableConfirm}
          onCancel={this.closeDisableModal}
          confirmValue="Disable"
        />

        <ConfirmModal
          isOpen={this.state.isEnableModalOpen}
          closeModal={this.closeEnableModal}
          title="Are you sure?"
          subtitle={
            <div>
              Are you sure you want to enable{' '}
              <strong>{currentName ? currentName : ''}</strong>
            </div>
          }
          onConfirm={this.onEnableConfirm}
          onCancel={this.closeEnableModal}
          confirmValue="Enable"
        />
      </Page>
    );
  }
}

export default Team;
