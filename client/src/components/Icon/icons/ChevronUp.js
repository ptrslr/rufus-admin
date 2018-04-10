import React from "react"

const ChevronUp = props => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...props}>
    <g fill="none" fillRule="evenodd">
      <path
        fill="currentColor"
        fillRule="nonzero"
        d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"
      />
      <path d="M0 0h24v24H0z" />
    </g>
  </svg>
)

export default ChevronUp
