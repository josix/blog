import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Link, graphql } from "gatsby"
import "katex/dist/katex.min.css"

import Layout from "../components/layout"
import SEO from "../components/seo"
import "../../styles/pages/blog-note.css"

const BlogNoteTemplate = ({ data, location }) => {
  const note = data.mdx
  const siteTitle = data.site.siteMetadata.title
  const {
    frontmatter,
    body,
    inboundReferences,
    outboundReferences,
  } = note; 
  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={frontmatter.title}
        description={frontmatter.description || note.excerpt}
      />
      <article>
        <header>
          <h1 className="header__title">{frontmatter.title}</h1>
          <p className="header__date">{frontmatter.date}</p>
        </header>
        <div>
          <MDXRenderer>{body}</MDXRenderer>
        </div>
        <hr />
      </article>

      <footer>
        <div className="backlinks-wrapper">
          {
            inboundReferences && inboundReferences.length > 0 &&
            <div className="links-wrapper">
                <h3>提及 <i>{frontmatter.title}</i> 的筆記</h3>
              {
                inboundReferences.map(({ frontmatter, fields }) => {
                  return (
                    <div className="backlink" key={fields.slug} >
                      <Link className="backlink__title" to={`/note${fields.slug}`}>{frontmatter.title}</Link>
                      {
                        frontmatter.description &&
                        <p class="backlink__description">
                        {frontmatter.description}
                        </p>
                      }
                    </div>
                  );
                })
              }
            </div>
          }
          {
            outboundReferences && outboundReferences.length > 0 &&
            <div className="backlinks-wrapper__links-wrapper">
              <h3><i>{frontmatter.title}</i> 中提及的筆記</h3>
              {
                outboundReferences.map(({ frontmatter, fields }) => {
                  return (
                    <div className="backlink" key={fields.slug}>
                      <Link className="backlink__title" to={`/note${fields.slug}`}>{frontmatter.title}</Link>
                      {
                        frontmatter.description &&
                        <p class="backlink__description">
                          {frontmatter.description}
                        </p>
                      }
                    </div>
                  );
                })
              }
            </div>
          }
        </div>
      </footer>
    </Layout>
  )
}

export default BlogNoteTemplate

export const pageQuery = graphql`
  query BlogNoteBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
      inboundReferences {
        ... on Mdx {
          fields {
            slug
          }
          frontmatter {
            title
            description
          }
        }
      }
      outboundReferences {
        ... on Mdx {
          fields {
            slug
          }
          frontmatter {
            title
            description
          }
        }
      }
    }
  }
`
