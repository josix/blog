import { css } from '@emotion/core'

export const AutoLink = css`
  svg {
    visibility: hidden;
  }
  &:hover {
    a {
      svg {
        visibility: visible;
      }
    }
  }
`