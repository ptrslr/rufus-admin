import React from "react"

const ArrowTop = props => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...props}>
    <g fill="none" fillRule="evenodd">
      <path d="M24 0v24H0V0z" />
      <path
        fill="currentColor"
        fillRule="nonzero"
        d="M13 20V7.83l5.59 5.59L20 12l-8-8-8 8 1.41 1.41L11 7.83V20z"
      />
    </g>
  </svg>
)

export default ArrowTop
