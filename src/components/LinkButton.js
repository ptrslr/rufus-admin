import * as React from 'react'
import { withComponent } from 'styled-components'
import { Link } from 'react-router-dom'

// type Props = {
// 	type?: string,
// 	children?: React.Node,
// 	primary?: boolean
// }

const LinkButton = (Button) => {
	return(
		Button.withComponent(Link)
	)
}

export default LinkButton
