// @flow
import * as React from 'react';
import ArticleEditor from '../ArticleEditor';
import Button from '../Button';
import { Heading1 } from '../Typography';
import ICONS from '../../constants/icons.js';

type Props = {};

const Article = (props: Props) => {
  return (
    <div className="Article">
      <header className="Header">
        <Heading1>Edit Article</Heading1>
        <Button theme="primary" value="Test" iconLeft={ICONS.people} />
      </header>
      <div className="">
        <ArticleEditor />
      </div>
    </div>
  );
};

export default Article;
