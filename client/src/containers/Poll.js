// @flow
import * as React from 'react';
import styled from 'styled-components';
import shortid from 'shortid';

import PollComponent from '../components/Poll';
import NewPoll from '../components/NewPoll';
import Button from '../components/Button';
import Loader from '../components/Loader';
import ConfirmModal from '../components/ConfirmModal';
import Icon from '../components/Icon';

import { fetchPoll, deletePoll } from '../api';

import icons from '../constants/icons';
import { colors } from '../constants/theme.js';
import type { Poll as PollType } from '../utils/types';

const newOptions = () => [
  {
    id: shortid.generate(),
    value: '',
    voteCount: 0,
  },
  {
    id: shortid.generate(),
    value: '',
    voteCount: 0,
  },
];

const reorder = (items, startIndex, endIndex) => {
  const result = Array.from(items);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const Action = styled.div`
  margin-bottom: 0.5rem;
`;
const NoPoll = styled.div`
  color: ${colors.grays[6]};
`;

type State = {
  isLoading: boolean,
  isCreating: boolean,
  isPoll: boolean,
  isDeleteModalOpen: boolean,
} & PollType;

type Props = {
  isEditable: boolean,
  postId: ?string,
};

class Poll extends React.Component<Props, State> {
  _isMounted: ?boolean;

  constructor(props: Props) {
    super();

    // this.state = {
    //   question: data.question,
    //   options: data.options,
    // };
    this.state = {
      isLoading: true,
      isCreating: false,
      isPoll: false,
      isDeleteModalOpen: false,
      question: '',
      options: newOptions(),
    };
  }

  componentDidMount = () => {
    this._isMounted = true;
    const postId = this.props.postId;

    if (postId) {
      fetchPoll(postId)
        .then(poll => {
          if (this._isMounted) {
            if (poll) {
              this.setState({
                isPoll: true,
                ...poll,
              });
            }

            this.setState({
              isLoading: false,
            });
          }
        })
        .catch(err => {
          console.log(err);
          this.setState({
            isLoading: false,
          });
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  };

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  /**
   * On save post
   * @return {?PollType} poll if all the poll's inputs are filled, else null
   */
  onSavePost = (): ?PollType => {
    const question = this.state.question;
    const options = this.state.options;

    if (this.state.isCreating && question.length) {
      const validOptions = options.every(item => {
        return item.value.length;
      });

      if (!validOptions) return null;

      const poll: PollType = {
        question: this.state.question,
        options: this.state.options,
      };

      this.setState({
        isPoll: true,
        isCreating: false,
      });

      return poll;
    }
    return null;
  };

  onCreate = () => {
    this.setState({
      isCreating: true,
      question: '',
      options: newOptions(),
    });
  };

  onCancel = () => {
    this.setState({
      isCreating: false,
    });
  };

  onDelete = () => {
    this.setState({ isDeleteModalOpen: true });
  };

  onDeleteConfirm = () => {
    this.setState({
      isLoading: true,
      isDeleteModalOpen: false,
    });

    deletePoll(this.props.postId)
      .then(() => {
        if (this._isMounted) {
          this.setState({
            isLoading: false,
            isPoll: false,
            isCreating: false,
          });
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isDeleteModalOpen: false,
        });
      });
  };

  onQuestionChange = (e: SyntheticEvent<HTMLInputElement>) => {
    this.setState({
      question: e.currentTarget.value,
    });
  };

  onOptionChange = (index: number, value: string) => {
    const options = this.state.options;
    options[index]['value'] = value;

    this.setState({
      options,
    });
  };

  onOptionCreate = () => {
    const options = this.state.options;
    options.push({
      id: shortid.generate(),
      value: '',
      voteCount: 0,
    });

    this.setState({ options });
  };

  onOptionDelete = (index: number) => {
    const options = this.state.options;
    options.splice(index, 1);

    this.setState({ options });
  };

  onDragEnd = (result: Object) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const options = reorder(
      this.state.options,
      result.source.index,
      result.destination.index
    );

    this.setState({
      options,
    });
  };

  closeModal = () => {
    this.setState({ isDeleteModalOpen: false });
  };

  render() {
    return (
      <Loader isLoading={this.state.isLoading}>
        {this.state.isPoll ? (
          <div>
            <PollComponent
              question={this.state.question}
              options={this.state.options}
            />

            {this.props.isEditable && (
              <Button
                theme="secondary"
                block
                iconLeft={icons.PLUS}
                value="Delete the poll"
                onClick={this.onDelete}
              />
            )}
          </div>
        ) : this.state.isCreating ? (
          <div>
            <NewPoll
              question={this.state.question}
              options={this.state.options}
              onQuestionChange={this.onQuestionChange}
              onOptionChange={this.onOptionChange}
              onOptionDelete={this.onOptionDelete}
              onDragEnd={this.onDragEnd}
            />
            <Action>
              <Button
                theme="secondary"
                block
                iconLeft={icons.PLUS}
                value="Add an option"
                onClick={this.onOptionCreate}
              />
            </Action>
            <Button
              theme="secondary"
              block
              iconLeft={icons.CLOSE}
              value="Cancel"
              onClick={this.onCancel}
            />
          </div>
        ) : this.props.isEditable ? (
          <Button
            theme="secondary"
            block
            iconLeft={icons.POLL}
            value="Create a poll"
            onClick={this.onCreate}
          />
        ) : (
          <NoPoll>
            <Icon name={icons.POLL} opticalAlign={true} /> No poll
          </NoPoll>
        )}

        <ConfirmModal
          isOpen={this.state.isDeleteModalOpen}
          closeModal={this.closeModal}
          title="Are you sure?"
          subtitle={
            <p>
              You're about to delete this poll. This action{' '}
              <strong>cannot</strong> be undone.
            </p>
          }
          onConfirm={this.onDeleteConfirm}
          onCancel={this.closeModal}
          confirmValue="Delete"
        />
      </Loader>
    );
  }
}

export default Poll;
