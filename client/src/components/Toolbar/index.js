// @flow
import * as React from 'react';
import { EditorState, RichUtils } from 'draft-js';
import styled from 'styled-components';

import Button from './Button';

import icons from '../../constants/icons';
import { colors } from '../../constants/theme.js';

const StyledToolbar = styled.div`
  width: 100%;
  background: white;
  border-bottom: 1px solid ${colors.grays[1]};
`;
const Inner = styled.div`
  display: flex;
  max-width: 40rem;
  margin: 0 auto -1px;
`;

const INLINE_TYPES = [
  { label: 'Bold', style: 'BOLD', icon: 'BOLD' },
  { label: 'Italic', style: 'ITALIC', icon: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE', icon: 'UNDERLINE' },
  { label: 'Strikethrough', style: 'STRIKETHROUGH', icon: 'STRIKETHROUGH' },
];
const BLOCK_TYPES = [
  { label: 'H1', style: 'header-two', icon: 'H1' },
  { label: 'H2', style: 'header-three', icon: 'H2' },
  { label: 'H3', style: 'header-four', icon: 'H3' },
  { label: 'Blockquote', style: 'blockquote', icon: 'BLOCKQUOTE' },
  { label: 'Ul', style: 'unordered-list-item', icon: 'UL' },
  { label: 'Ol', style: 'ordered-list-item', icon: 'OL' },
];

type Props = {
  editorState: EditorState,
  onChange: Function,
  onImage: Function,
  onVideo: Function,
};

const Toolbar = (props: Props) => {
  const { editorState, onChange, onImage, onVideo } = props;

  const toggleInlineStyle = (inlineStyle: string): void => {
    onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };
  const toggleBlockType = (blockType: string): void => {
    onChange(RichUtils.toggleBlockType(editorState, blockType));
  };

  const currentStyle = editorState.getCurrentInlineStyle();

  const selection = editorState.getSelection();
  const blockType: string = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <StyledToolbar>
      <Inner>
        {INLINE_TYPES.map(item => (
          <Button
            key={item.label}
            active={currentStyle.has(item.style)}
            label={item.label}
            icon={icons[item.icon]}
            onClick={toggleInlineStyle}
            style={item.style}
          />
        ))}

        {BLOCK_TYPES.map(item => (
          <Button
            key={item.label}
            active={item.style === blockType}
            label={item.label}
            icon={icons[item.icon]}
            onClick={toggleBlockType}
            style={item.style}
          />
        ))}

        <Button
          key="toolbar-image"
          label="Add image"
          icon={icons.IMAGE}
          onClick={onImage}
        />

        <Button
          key="toolbar-video"
          label="Add video"
          icon={icons.VIDEO}
          onClick={onVideo}
        />
      </Inner>
    </StyledToolbar>
  );
};
export default Toolbar;
