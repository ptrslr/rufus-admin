// @flow
import * as React from 'react';

import Page from '../components/Page';
import PageHeader from '../components/PageHeader';
import PageBody from '../components/PageBody';
import Button from '../components/Button';
import Loader from '../components/Loader';
import PageListing from '../components/PageListing';

import icons from '../constants/icons';
import { colors } from '../constants/theme';

import { fetchPages } from '../api';

type Props = {};
type State = {
  isLoading: boolean,
  pages?: Object,
};

class Pages extends React.Component<Props, State> {
  _isMounted: ?boolean;

  constructor(props: Props) {
    super(props);

    this.state = {
      isLoading: true,
      pages: {},
    };
  }

  componentDidMount = async () => {
    this._isMounted = true;
    const pages = await fetchPages();

    if (this._isMounted) {
      this.setState({
        isLoading: false,
        pages,
      });
    }
  };

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  render() {
    const actions = [
      <Button
        to="/pages/new-page"
        theme="primary"
        value="Create new"
        iconLeft={icons.PLUS}
      />,
    ];

    return (
      <Page>
        <PageHeader title="Pages" actions={actions} />
        <PageBody padding="2rem 0 0">
          <Loader isLoading={this.state.isLoading}>
            <PageListing pages={this.state.pages} />
          </Loader>
        </PageBody>
      </Page>
    );
  }
}

export default Pages;
