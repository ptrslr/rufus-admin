import React from "react"

const Image = props => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...props}>
    <g fill="none" fillRule="evenodd">
      <path d="M0 0h24v24H0z" />
      <g fill="currentColor" fillRule="nonzero">
        <path d="M19 5v14H5V5h14zm0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
        <path d="M14.14 11.86l-3 3.87L9 13.14 6 17h12z" />
      </g>
    </g>
  </svg>
)

export default Image
