
/** @jsx jsx */
import { jsx } from '@emotion/core'
import { MDXProvider } from '@mdx-js/react'
import React from 'react'
import { autolink } from "./styles"

export const wrapPageElement = ({ element }) => (
  <MDXProvider
    components={{
      h2: props => <h2 css={autolink} {...props} />,
      h3: props => <h3 css={autolink} {...props} />,
    }}
  >
    {element}
  </MDXProvider>
)