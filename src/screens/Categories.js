// @flow
import * as React from 'react';

import CategoriesContainer from '../containers/Categories';

type Props = {
  history: Object,
};

const Categories = (props: Props) => {
  const { history } = props;

  return <CategoriesContainer history={history} />;
};

export default Categories;
