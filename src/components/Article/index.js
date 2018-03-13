// @flow
import * as React from 'react'
import ArticleEditor from '../ArticleEditor';
import Button from '../Button';

type Props = {}

const Article = (props: Props) => {
	return (
		<div className="Article">
			<header className="Header">
				<h1>Edit article</h1>
				<Button primary>Test</Button>
			</header>
			<div className="">
				<ArticleEditor />
			</div>
		</div>
	)
}

export default Article;
