// @flow
import * as React from 'react';
import * as Immutable from 'immutable';

import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import styled from 'styled-components';

// import { colors } from '../../utils/theme';

type Props = {
  editorState: EditorState,
  onChange: Function,
  handleReturn: Function,
};

const blockRenderMap = Immutable.Map({
  unstyled: {
    element: 'h1',
  },
});

const EditorWrapper = styled.div`
  margin-bottom: 1.5rem;

  .public-DraftEditorPlaceholder-root,
  h1 {
    margin: 0;
    font-size: 2.25rem;
    line-height: 1.2;
    font-weight: 700;
  }
  .public-DraftStyleDefault-block {
    margin: 0;
  }
`;

const TitleEditor = (props: Props) => {
  const { editorState, onChange } = props;
  // let editor = null;

  const handleReturn = e => {
    props.handleReturn();
    return 'handled';
  };

  return (
    <EditorWrapper>
      <Editor
        editorState={editorState}
        onChange={onChange}
        placeholder="Title"
        blockRenderMap={blockRenderMap}
        handleReturn={handleReturn}
        // ref={node => (editor = node)}
      />
    </EditorWrapper>
  );
};

export default TitleEditor;
