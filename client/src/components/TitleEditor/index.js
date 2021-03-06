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
  readOnly: boolean,
};

const blockRenderMap = Immutable.Map({
  unstyled: {
    element: 'h1',
  },
});

const EditorWrapper = styled.div`
  margin-bottom: 1rem;

  .public-DraftEditorPlaceholder-root,
  h1 {
    margin: 0;
    font-size: 2.5rem;
    line-height: 1.2;
    font-weight: 700;
  }
  .public-DraftStyleDefault-block {
    margin: 0;
  }
`;

const TitleEditor = (props: Props) => {
  const { editorState, onChange, readOnly } = props;
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
        readOnly={readOnly}
        // ref={node => (editor = node)}
      />
    </EditorWrapper>
  );
};

export default TitleEditor;
