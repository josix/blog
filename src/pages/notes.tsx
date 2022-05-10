import React from "react"
import { PageProps, Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import '../../styles/pages/notes.css'

type Data = {
  site: {
    siteMetadata: {
      title: string
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

const NoteIndex = ({ data, location }: PageProps<Data>) => {
  const siteTitle = data.site.siteMetadata.title
  const notes = data.allMdx.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={siteTitle} />
      <h1 className="heading">Recent Notes</h1>
      {notes.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <article key={node.fields.slug} className="note__container">
            <header>
              <small className="note__date">{node.frontmatter.date}</small>
              <p className="note__title">{title}</p>
            </header>
            <section className="note__body">
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </section>
            <Link className="note__link" to={`/note${node.fields.slug}`}>
                read more
            </Link>
            <hr className="note__divider"/>
          </article>
        )
      })}
    </Layout>
  )
}

export default NoteIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      sort: {fields: [frontmatter___date], order: DESC}
      filter: {fileAbsolutePath: {regex: "/\\/note\\//"}}
      limit: 10
    ) {
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
