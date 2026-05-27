/** @jsx jsx */
import { jsx } from "@emotion/core"
import { MDXProvider } from "@mdx-js/react"
import React from "react"
import { autolink, link } from "./styles"
import CodeBlock from "./src/components/code-block"

export const wrapPageElement = ({ element }) => (
  <MDXProvider
    components={{
      h2: props => <h2 css={autolink} {...props} />,
      h3: props => <h3 css={autolink} {...props} />,
      a: props => <a css={link} {...props} />,
      pre: CodeBlock,
    }}
  >
    {element}
  </MDXProvider>
)
