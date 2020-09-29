
/** @jsx jsx */
import { jsx } from '@emotion/core'
import { MDXProvider } from '@mdx-js/react'
import React from 'react'
import { AutoLink } from "./styles"

export const wrapPageElement = ({ element }) => (
  <MDXProvider
    components={{
      h2: props => <h2 css={AutoLink} {...props} />,
      h3: props => <h3 css={AutoLink} {...props} />,
    }}
  >
    {element}
  </MDXProvider>
)