// @flow
import * as React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { rgba, placeholder } from 'polished'

import { colors } from '../utils/theme'
import { formControl } from '../utils/styles'

type Props = {
	type?: string,
	children?: React.Node,
}

const StyledInput = styled.input`
	${formControl}

	display: block;
	border-color: ${colors.grays[5]}

	font-size: 1rem;
	line-height: 1.5;

	color: ${colors.black};
	background: #fff;

	transition: all 250ms;

	&:focus {
		outline: none;
		box-shadow: 0 0 0 2px ${props => rgba(colors.grays[5], .5)}
	}

	${placeholder({
		'color': colors.grays[4]
	})}
`
const Input = (props: Props) => {
	return (
		<StyledInput  {...props} />
	)
}

export default Input;
