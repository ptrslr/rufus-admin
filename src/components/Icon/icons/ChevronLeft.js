import React from "react"

const ChevronLeft = props => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...props}>
    <g fill="none" fillRule="evenodd">
      <path
        fill="currentColor"
        fillRule="nonzero"
        d="M15.41 17.09l-4.58-4.59 4.58-4.59L14 6.5l-6 6 6 6z"
      />
      <path d="M0 .5h24v24H0z" />
    </g>
  </svg>
)

export default ChevronLeft
