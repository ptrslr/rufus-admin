// @flow
import * as React from 'react';
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  ContentState,
} from 'draft-js';
import styled from 'styled-components';

import {
  createPage,
  updatePage,
  fetchPage,
  fetchPageContent,
  deletePage,
} from '../api';

import Editor from './Editor';

import PageSidebar from '../components/PageSidebar';
import NoMatch from '../components/NoMatch';
import PageComponent from '../components/Page';
import PageHeader from '../components/PageHeader';
import InlineLoader from '../components/InlineLoader';
import Loader from '../components/Loader';
import Button from '../components/Button';
import type { SelectOptions } from '../components/Select';
import ConfirmModal from '../components/ConfirmModal';
import PublishModal from '../components/PublishModal';

import icons from '../constants/icons';
import status from '../constants/status';
import role from '../constants/role';

import type { Post as PostType } from '../utils/types';
// import { colors } from '../utils/theme';

const Layout = styled.div`
  flex: 1 1 auto;
  display: flex;
  overflow: hidden;
`;
const LayoutSidebar = styled.div`
  flex: 0 0 16rem;
  width: 16rem;
`;
const LayoutMain = styled.main`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
`;
type Props = {
  user: Object,
  userRole?: ?$Values<typeof role>,
  history: Object,
  match: Object,
};
type State = {
  isLoading: boolean,
  isSaving: boolean,
  isEditable: boolean,
  isDeleteModalOpen: boolean,
  noMatch?: boolean,
  pageId: ?string,
  titleState: EditorState,
  subtitleState: EditorState,
  contentState: EditorState,
};

class Page extends React.Component<Props, State> {
  _isMounted: ?boolean;
  subtitleEditor: ?Editor;
  richEditor: ?Editor;

  constructor(props: Props) {
    super(props);
    this.state = {
      isLoading: true,
      isSaving: false,
      isEditable: false,
      isDeleteModalOpen: false,
      pageId: this.props.match.params.id,
      titleState: EditorState.createEmpty(),
      subtitleState: EditorState.createEmpty(),
      contentState: EditorState.createEmpty(),
    };

    this.pollRef = React.createRef();
  }

  componentDidMount = () => {
    this._isMounted = true;

    const pageId = this.state.pageId;
    if (pageId) {
      // editing existing page
      this.initPage(pageId);
    } else {
      // editing new page

      if (this._isMounted) {
        this.setState({
          isLoading: false,
          isEditable: true,
        });
      }
    }
  };

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  componentDidUpdate = (prevProps: Props) => {
    if (this.props.userRole !== prevProps.userRole) {
      this.setState({
        authorRole: this.props.userRole,
      });
    }
  };

  initPage = async (pageId: string) => {
    fetchPage(pageId)
      .then(page => {
        if (page && this._isMounted) {
          const titleState = EditorState.createWithContent(
            ContentState.createFromText(page.title)
          );
          const subtitleState = EditorState.createWithContent(
            ContentState.createFromText(page.subtitle)
          );

          this.setState({
            titleState,
            subtitleState,
          });

          return fetchPageContent(pageId);
        } else {
          if (this._isMounted) {
            this.setState({
              noMatch: true,
            });
          }

          throw new Error('Post not found');
        }
      })
      .then(content => {
        if (this._isMounted) {
          if (content) {
            const contentState = EditorState.createWithContent(
              convertFromRaw(content)
            );

            this.setState({
              contentState,
            });
          }

          this.setState({
            isLoading: false,
            isEditable: this.props.userRole === role.ADMIN,
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  onTitleChange = (titleState: EditorState) => this.setState({ titleState });
  onSubtitleChange = (subtitleState: EditorState) =>
    this.setState({ subtitleState });
  onContentChange = (contentState: EditorState) =>
    this.setState({ contentState });

  mapStateToPage = (): PostType => {
    const title = this.state.titleState.getCurrentContent().getPlainText();
    const subtitle = this.state.subtitleState
      .getCurrentContent()
      .getPlainText();
    const content = convertToRaw(this.state.contentState.getCurrentContent());

    return {
      title,
      subtitle,
      content,
    };
  };

  savePage = async () => {
    this.setState({
      isSaving: true,
    });

    const pageId = this.state.pageId;
    const page: PageType = this.mapStateToPage();

    if (pageId) {
      await updatePage(pageId, page);
    } else {
      const newPageId = await createPage(page);

      this.setState({
        pageId: newPageId,
      });
    }

    this.setState({
      isSaving: false,
    });
  };

  closeModal = () => {
    this.setState({
      isDeleteModalOpen: false,
    });
  };

  onDelete = () => {
    this.setState({
      isDeleteModalOpen: true,
    });
  };

  onDeleteConfirm = () => {
    this.setState({
      isLoading: true,
    });
    const pageId = this.state.pageId;

    if (pageId) {
      deletePage(pageId)
        .then(() => {
          this.props.history.push('/pages');
        })
        .catch(err => {
          this.setState({
            isLoading: false,
          });
        });
    }
  };

  render() {
    const actions = [
      <InlineLoader size="1.25rem" isLoading={this.state.isSaving} />,
      <Button
        theme="link"
        value="Back"
        iconLeft={icons.ARROW_LEFT}
        onClick={() => this.props.history.goBack()}
      />,
      this.state.isEditable && (
        <Button
          theme="primary"
          value="Save"
          iconLeft={icons.CHECK}
          onClick={this.savePage}
          disabled={
            this.state.isLoading ||
            !this.state.titleState.getCurrentContent().hasText()
          }
        />
      ),
    ];

    if (this.state.noMatch) {
      return <NoMatch history={this.props.history} />;
    }
    return (
      <PageComponent>
        <PageHeader title="Edit Page" actions={actions} />

        <Layout>
          <Loader isLoading={this.state.isLoading}>
            <LayoutMain>
              <Editor
                isEditable={this.state.isEditable}
                titleState={this.state.titleState}
                subtitleState={this.state.subtitleState}
                contentState={this.state.contentState}
                onTitleChange={this.onTitleChange}
                onSubtitleChange={this.onSubtitleChange}
                onContentChange={this.onContentChange}
              />
            </LayoutMain>
            <LayoutSidebar>
              <PageSidebar
                isEditable={this.state.isEditable}
                onDelete={this.onDelete}
              />
            </LayoutSidebar>
          </Loader>
        </Layout>

        <ConfirmModal
          isOpen={this.state.isDeleteModalOpen}
          closeModal={this.closeModal}
          title="Are you sure?"
          subtitle={
            <p>
              You're about to delete this page. This action{' '}
              <strong>cannot</strong> be undone.
            </p>
          }
          onConfirm={this.onDeleteConfirm}
          onCancel={this.closeModal}
          confirmValue="Delete"
        />
      </PageComponent>
    );
  }
}

export default Page;
