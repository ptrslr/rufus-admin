// @flow
import * as React from 'react';

import Page from '../components/Page';
import PageHeader from '../components/PageHeader';
import PageBody from '../components/PageBody';
import CategoryList from '../components/CategoryList';

const categories = {
  kdmklasmdklasd: 'Ekonomika',
  lkmdkmomasdkmo: 'Music',
  oijiovnasndead: 'Sport',
};
const categoryIndices = ['kdmklasmdklasd', 'oijiovnasndead', 'lkmdkmomasdkmo'];

const reorder = (keys, startIndex, endIndex) => {
  const result = Array.from(keys);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

class Categories extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: categories,
      keys: categoryIndices,
    };
  }

  onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const keys = reorder(
      this.state.keys,
      result.source.index,
      result.destination.index
    );

    this.setState({
      keys,
    });
  };

  render() {
    return (
      <Page>
        <PageHeader title="Categories" />

        <PageBody padding="2rem 0">
          <CategoryList
            onDragEnd={this.onDragEnd}
            items={this.state.items}
            keys={this.state.keys}
          />
        </PageBody>
      </Page>
    );
  }
}

export default Categories;
