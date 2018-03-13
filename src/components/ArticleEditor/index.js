// @flow
import * as React from 'react';
import {Editor, EditorState} from 'draft-js';

type Props = {}

type State = {
	editorState: EditorState
}

class ArticleEditor extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { editorState: EditorState.createEmpty() };
	}

	onChange = (editorState: EditorState) => this.setState({ editorState });

	render() {
		return (
			<Editor editorState={this.state.editorState} onChange={this.onChange} />
		);
	}
}

export default ArticleEditor;
