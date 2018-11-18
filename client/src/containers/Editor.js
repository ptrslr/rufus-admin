// @flow
import * as React from 'react';

import { EditorState } from 'draft-js';
import { composeDecorators } from 'draft-js-plugins-editor';
import createImagePlugin from 'draft-js-image-plugin';
import createVideoPlugin from 'draft-js-video-plugin';
import createFocusPlugin from 'draft-js-focus-plugin';
import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin';

// import 'draft-js/dist/Draft.css';
import styled from 'styled-components';

import Toolbar from '../components/Toolbar';
import TitleEditor from '../components/TitleEditor';
import SubtitleEditor from '../components/SubtitleEditor';
import RichEditor from '../components/RichEditor';
import Modal from '../components/Modal';
import Input from '../components/Input';
import Button from '../components/Button';

import icons from '../constants/icons';
import { colors } from '../constants/theme';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const Inner = styled.div`
  flex: 1 1 auto;
  overflow-y: auto;
  width: 100%;
  padding: 3rem 0;
  margin: 0 auto;
`;
const Measure = styled.div`
  max-width: 40rem;
  margin: 0 auto;

  .public-DraftEditorPlaceholder-root {
    color: ${colors.grays[4]};
  }
  .public-DraftEditorPlaceholder-hasFocus {
    color: ${colors.grays[2]};
  }
`;

const Title = styled.h2`
  margin: 0 0 1rem;
`;
const Subtitle = styled.div`
  margin: 0 0 1rem;
`
const VideoForm = styled.form`
  display: flex;
`;
const VideoAction = styled.span`
  margin-left: 1rem;
`;
const VideoActions = styled.div`
  text-align: right;
  margin-top: 0.5rem;
`;

const focusPlugin = createFocusPlugin();
const blockDndPlugin = createBlockDndPlugin();

const decorator = composeDecorators(
  focusPlugin.decorator,
  blockDndPlugin.decorator
);

const imagePlugin = createImagePlugin({ decorator });
const videoPlugin = createVideoPlugin({
  theme: {
    iframeContainer: 'VideoIframeWrapper',
    iframe: 'VideoIframe',
  },
  decorato: decorator,
});
// const videoPlugin = createVideoPlugin({
//   theme: {
//     iframeContainer: 'VideoIframeWrapper',
//     iframe: 'VideoIframe',
//   },
// });

const plugins = [blockDndPlugin, focusPlugin, imagePlugin, videoPlugin];

type Props = {
  isEditable: boolean,
  titleState: EditorState,
  subtitleState: EditorState,
  contentState: EditorState,
  onTitleChange: Function,
  onSubtitleChange: Function,
  onContentChange: Function,
};

type State = {
  isImageModalOpen: boolean,
  isVideoModalOpen: boolean,
  image: ?Object,
  imageURL: ?string,
  videoURL: ?string,
};

class Editor extends React.Component<Props, State> {
  // let subtitleEditor = null;
  // let richEditor = null;

  constructor() {
    super();

    this.state = {
      isImageModalOpen: false,
      isVideoModalOpen: false,
      image: null,
      imageURL: '',
      videoURL: '',
    };

    this.subtitleEditor = React.createRef();
    this.richEditor = React.createRef();
    this.videoInput = React.createRef();
  }

  handleTitleReturn = () => {
    this.subtitleEditor && this.subtitleEditor.focus();
  };
  handleSubtitleReturn = () => {
    this.focusRichEditor();
  };

  focusRichEditor = () => {
    this.richEditor && this.richEditor.focus();
  };

  onImageURLChange = (e: SyntheticEvent<HTMLInputElement>) => {
    this.setState({ imageURL: e.currentTarget.value });
  };
  onVideoURLChange = (e: SyntheticEvent<HTMLInputElement>) => {
    this.setState({ videoURL: e.currentTarget.value });
  };

  addImage = e => {
    e.preventDefault();

    this.props.onContentChange(
      imagePlugin.addImage(this.props.contentState, this.state.imageURL)
    );
  };

  addVideo = e => {
    e.preventDefault();

    if (this.state.videoURL.length) {
      this.closeModal();

      this.props.onContentChange(
        videoPlugin.addVideo(this.props.contentState, {
          src: this.state.videoURL,
        })
      );
    }
  };

  onImage = () => {
    this.setState({ isImageModalOpen: true });
  };

  onVideo = () => {
    this.setState(
      {
        isVideoModalOpen: true,
        videoURL: '',
      },
      () => {}
    );
  };

  afterOpenModal = () => {
    this.videoInput.focus();
  };

  closeModal = () => {
    this.setState({
      isImageModalOpen: false,
      isVideoModalOpen: false,
    });
  };

  render() {
    return (
      <Wrapper>
        {this.props.isEditable && (
          <Toolbar
            editorState={this.props.contentState}
            onChange={this.props.onContentChange}
            onImage={this.onImage}
            onVideo={this.onVideo}
          />
        )}

        <Inner>
          <Measure>
            <TitleEditor
              editorState={this.props.titleState}
              onChange={this.props.onTitleChange}
              handleReturn={this.handleTitleReturn}
              readOnly={!this.props.isEditable}
            />
            <SubtitleEditor
              editorState={this.props.subtitleState}
              onChange={this.props.onSubtitleChange}
              handleReturn={this.handleSubtitleReturn}
              editorRef={node => (this.subtitleEditor = node)}
              readOnly={!this.props.isEditable}
            />
            <RichEditor
              editorState={this.props.contentState}
              onChange={this.props.onContentChange}
              editorRef={node => (this.richEditor = node)}
              readOnly={!this.props.isEditable}
              plugins={plugins}
            />
          </Measure>
        </Inner>

        <Modal
          isOpen={this.state.isVideoModalOpen}
          closeModal={this.closeModal}
          onAfterOpen={this.afterOpenModal}
          contentLabel="Add video"
        >
          <Title>Add video</Title>
          <Subtitle>Enter a Youtube or Vimeo video url</Subtitle>
          <VideoForm onSubmit={this.addVideo}>
            <Input
              innerRef={node => (this.videoInput = node)}
              value={this.state.videoURL}
              onChange={this.onVideoURLChange}
              placeholder="Video URL"
              type="text"
            />
            <VideoAction>
              <Button
                theme="primary"
                iconLeft={icons.PLUS}
                value="Add video"
                onClick={this.addVideo}
              />
            </VideoAction>
          </VideoForm>
        </Modal>

        <Modal
          isOpen={this.state.isImageModalOpen}
          closeModal={this.closeModal}
          contentLabel="Add image"
        >
          <Title>Add image</Title>
          <VideoForm onSubmit={this.addImage}>
            <Input
              value={this.state.imageURL}
              onChange={this.onImageURLChange}
              placeholder="Image URL"
              type="text"
            />
            <VideoAction>
              <Button
                theme="primary"
                iconLeft={icons.PLUS}
                value="Add image"
                onClick={this.addImage}
              />
            </VideoAction>
          </VideoForm>
        </Modal>
      </Wrapper>
    );
  }
}

export default Editor;
