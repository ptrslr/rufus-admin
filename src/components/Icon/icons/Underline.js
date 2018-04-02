import React from "react"

const Underline = props => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...props}>
    <g fill="none" fillRule="evenodd">
      <path d="M0 1h24v24H0z" />
      <path
        fill="currentColor"
        fillRule="nonzero"
        d="M12 18c3.31 0 6-2.69 6-6V4h-2.5v8c0 1.93-1.57 3.5-3.5 3.5S8.5 13.93 8.5 12V4H6v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2H5z"
      />
    </g>
  </svg>
)

export default Underline
