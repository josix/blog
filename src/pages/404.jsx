/** @jsx jsx */
import React from "react"
import { navigate, graphql } from "gatsby"
import { css, jsx } from '@emotion/core'

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  if (location.pathname.match(/^\/note\//)) {
    return (
      <Layout location={location} title={siteTitle}>
        <SEO title="404: Not Found" />
        <h1>Empty Note</h1>
        <p>There's no content in this note currently.</p>
        <button css={{
          border: "solid 1px #737373",
          borderRadius: 5,
          outline: "none",
          cursor: "pointer",
          fontWeight: 300,
          backgroundColor: "transparent"
        }} onClick={() => navigate(-1)}>Go back</button>
      </Layout>
    )
  }
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="404: Not Found" />
      <h1>Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
