import React from "react"

const ChevronDown = props => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...props}>
    <g fill="none" fillRule="evenodd">
      <path
        fill="currentColor"
        fillRule="nonzero"
        d="M7.41 8.84L12 13.42l4.59-4.58L18 10.25l-6 6-6-6z"
      />
      <path d="M0 .25h24v24H0z" />
    </g>
  </svg>
)

export default ChevronDown
