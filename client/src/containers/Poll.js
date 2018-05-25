// @flow
import * as React from 'react';
import styled from 'styled-components';
import shortid from 'shortid';

import PollComponent from '../components/Poll';
import NewPoll from '../components/NewPoll';
import Button from '../components/Button';
import Loader from '../components/Loader';

import { fetchPoll, deletePoll } from '../api';

import icons from '../constants/icons';
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

type State = {
  isLoading: boolean,
  isCreating: boolean,
  isPoll: boolean,
} & PollType;

type Props = {
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
      option: newOptions(),
    });
  };

  onCancel = () => {
    this.setState({
      isCreating: false,
    });
  };

  onDelete = () => {
    deletePoll(this.props.postId)
      .then(() => {
        if (this._isMounted) {
          this.setState({
            isPoll: false,
            isCreating: false,
          });
        }
      })
      .catch(err => {
        console.log(err);
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

  render() {
    if (this.state.isPoll)
      return (
        <Loader isLoading={this.state.isLoading}>
          <PollComponent
            question={this.state.question}
            options={this.state.options}
          />
          <Button
            theme="secondary"
            block
            iconLeft={icons.PLUS}
            value="Delete the poll"
            onClick={this.onDelete}
          />
        </Loader>
      );

    if (this.state.isCreating)
      return (
        <Loader isLoading={this.state.isLoading}>
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
        </Loader>
      );
    return (
      <Loader isLoading={this.state.isLoading}>
        <Button
          theme="secondary"
          block
          iconLeft={icons.PLUS}
          value="Create a poll"
          onClick={this.onCreate}
        />
      </Loader>
    );
  }
}

export default Poll;
