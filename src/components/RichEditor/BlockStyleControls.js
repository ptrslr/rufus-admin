// @flow
import * as React from 'react';
import { EditorState } from 'draft-js';

import Button from './Button.js';

type Props = {
  editorState: EditorState,
  onClick: Function,
};

const BLOCK_TYPES = [
  // { label: 'H1', style: 'header-two' },
  // { label: 'H2', style: 'header-three' },
  // { label: 'H3', style: 'header-four' },
  { label: 'Blockquote', style: 'blockquote' },
  { label: 'Ul', style: 'unordered-list-item' },
  { label: 'Ol', style: 'ordered-list-item' },
];

const BlockStyleControls = (props: Props) => {
  const { editorState, onClick } = props;

  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div>
      {BLOCK_TYPES.map(item => (
        <Button
          key={item.label}
          label={item.label}
          icon={item.label}
          onClick={onClick}
          style={item.style}
        />
      ))}
    </div>
  );
};

export default BlockStyleControls;
