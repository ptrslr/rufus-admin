// @flow
import * as React from 'react';
import { EditorState } from 'draft-js';

import Button from './Button.js';

type Props = {
  editorState: EditorState,
  onClick: Function,
};

const INLINE_TYPES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
];

const InlineStyleControls = (props: Props) => {
  const { editorState, onClick } = props;

  return (
    <div>
      {INLINE_TYPES.map(item => (
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

export default InlineStyleControls;
