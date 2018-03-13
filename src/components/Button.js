// @flow
import * as React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components';
import { darken, rgba } from 'polished';
import { colors } from '../utils/theme';

type Props = {
	type?: string,
	children?: React.Node,
	primary?: boolean
}

const StyledButton = styled.button`
	display: inline-block;
	padding: .25em .725em;
	border: 1px solid transparent;
	border-radius: 3px;

	font-size: 1rem;
	line-height: 1.5;

	color: #fff;
	background: ${props => props.backgroundColor};

	text-align: center;
	white-space: nowrap;
	user-select: none;
	cursor: pointer;
	transition: all 250ms;

	&:hover,
	&:focus {
		background: ${props => darken(.075, props.backgroundColor)};
	}

	&:focus {
		outline: none;
		box-shadow: 0 0 0 0.2rem ${props =>  rgba(props.backgroundColor, .5)}
	}
`
const Button = (props: Props) => {
	const backgroundColor = (props.primary && colors.primary)
		|| colors.grays[4];
	return (
		<StyledButton  type="button" backgroundColor={backgroundColor} {...props}>
			{ props.children }
		</StyledButton>
	)
}

export default Button;
