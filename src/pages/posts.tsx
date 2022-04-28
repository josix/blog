import React from "react"
import * as path from 'path';
import { PageProps, Link, graphql } from "gatsby"

import Layout from "../components/layout"
import { rhythm } from "../utils/typography"

type menuLink = {
  name: string
  link: string
}

type Data = {
  site: {
    siteMetadata: {
      title: string
      menuLinks: Array<menuLink>
    }
  }
  allMdx: {
    edges: {
      node: {
        excerpt: string
        frontmatter: {
          title: string
          date: string
          description: string
        }
        fields: {
          slug: string
        }
      }
    }[]
  }
}

const PostsIndex = ({ data, location }: PageProps<Data>) => {
  const siteTitle = data.site.siteMetadata.title
  const menuLinks = data.site.siteMetadata.menuLinks
  const posts = data.allMdx.edges

  return (
    <Layout location={location} title={siteTitle} menuLinks={menuLinks}>
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <article key={node.fields.slug}>
            <header>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={path.resolve(`posts/${node.fields.slug}`)}>
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </section>
          </article>
        )
      })}
    </Layout>
  )
}

export default PostsIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        menuLinks {
          name
          link
        }
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
