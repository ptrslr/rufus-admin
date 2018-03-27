import styled, { css } from 'styled-components';

const heading = css`
	margin: 0;
	font-weight: 700;
	text-rendering: optimizeLegibility;
`

export const Heading1 = styled.h1`
	${heading}
	font-size: 2rem;
`
export const Heading2 = styled.h2`
	${heading}
	font-size: 1.5rem;
`
export const Heading3 = styled.h2`
	${heading}
	font-size: 1.25rem;
`
export const Heading4 = styled.h2`
	${heading}
	font-size: 1rem;
`
