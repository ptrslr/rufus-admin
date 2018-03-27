// @flow
import * as React from 'react'
import {Editor, EditorState} from 'draft-js'
import styled from 'styled-components'

import { colors } from '../../utils/theme'

type Props = {}

type State = {
	editorState: EditorState
}

const StyledEditor = styled.div`
	border: 1px solid ${colors.grays[5]};
	background: #fff;
`

class ArticleEditor extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { editorState: EditorState.createEmpty() };
	}

	onChange = (editorState: EditorState) => this.setState({ editorState });

	render() {
		return (
			<StyledEditor>
				<Editor editorState={this.state.editorState} onChange={this.onChange} />
			</StyledEditor>
		);
	}
}

export default ArticleEditor;
