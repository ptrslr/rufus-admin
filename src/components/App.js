// @flow
import * as React from 'react'

import ArticleEditor from './ArticleEditor'
import Sidebar from './Sidebar'
import Article from './Article'

import { BrowserRouter } from 'react-router-dom'
import styled from 'styled-components'
import { space } from '../utils/theme'

const Container = styled.div`
	padding: 0 ${space[2]};
	margin: 0 auto;
`
const Layout = styled.div`
	display: flex;
`
const LayoutSidebar = styled.div`
	flex: 0 0 300px;
`
const LayoutMain = styled.main`
	flex: 1 1 auto;
	padding-left: ${space[3]}
`

type Props = {}

class App extends React.Component<Props> {
  render() {
    return (
			<BrowserRouter>
				<Container>
					<Layout>
						<LayoutSidebar>
							<Sidebar />
						</LayoutSidebar>
						<LayoutMain>
							<Article />
						</LayoutMain>
					</Layout>
				</Container>
			</BrowserRouter>
    );
  }
}

export default App;
