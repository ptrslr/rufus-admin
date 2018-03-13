// @flow
import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colors } from '../../utils/theme';

type Props = {}

const Wrapper = styled.nav`
	background: ${colors.grays[1]};
`
const Menu = styled.ul`
	list-style: none;
`
const Item = styled.li`
`
const ItemLink = styled(Link)`
	color: ${colors.black};
	text-decoration: none;

	&:hover,
	&:focus {
		color: ${colors.primary};
		text-decoration: underline;
	}
`

const Sidebar = (props: Props) => {
	return (
		<Wrapper>
			<Menu>
				<Item>
					<ItemLink to="/articles">Articles</ItemLink>
				</Item>
				<Item>
					<ItemLink to="/users">Users</ItemLink>
				</Item>
			</Menu>
		</Wrapper>
	)
}
export default Sidebar
