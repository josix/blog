import React, { useState } from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Link, graphql } from "gatsby"
import { Disqus } from 'gatsby-plugin-disqus'

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import TOC from "../components/toc"
import { rhythm, scale } from "../utils/typography"

const styles = {
  buttonContainer: {
    display: "flex",
    flexDirection: 'column',
    alignItems: 'center',
    margin: 6,
  },
  shareButton: {
    border: "solid 1px #737373",
    borderRadius: 5,
    outline: "none",
    cursor: "pointer",
    fontWeight: 300,
    padding: "5px 45px",
    backgroundColor: "transparent"
  },
  popupText: {
    color: "#2d2d2de8",
    backgroundColor: "transparent"
  }
}
const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.mdx
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext
  const {
    frontmatter,
    tableOfContents,
    body
  } = post;

  const [shareSucceed, setShareSucceed] = useState(false);
  const [disqusConfig, setDisqusConfig] = useState({
    url: `${process.env.GATSBY_SITE_URL+location.pathname}`,
    identifier: post.id,
    title: post.title,
  });

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={frontmatter.title}
        description={frontmatter.description || post.excerpt}
      />
      <article>
        <header>
          <h1
            style={{
              marginTop: rhythm(1),
              marginBottom: 0,
            }}
          >
            {frontmatter.title}
          </h1>
          <p
            style={{
              ...scale(-1 / 5),
              display: `block`,
              marginBottom: rhythm(1),
            }}
          >
            {frontmatter.date}
          </p>
        </header>
        {tableOfContents.items && <TOC items={tableOfContents.items} />}
        <MDXRenderer>{body}</MDXRenderer>
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
      </article>

      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
      <div style={styles.buttonContainer} >
        <button
          style={styles.shareButton}
          onClick={async () => {
            const navigator = window.navigator;
            const shareData = {
              title: frontmatter.title,
              text: `${frontmatter.title}`,
              url: location.href,
            }
            if (navigator.share) {
              try {
                await navigator.share(shareData)
              } catch(err) {
                console.error('Error: ' + err)
              }
            } else {
              navigator.clipboard.writeText(location.href)
              .then(() => {
                setShareSucceed(true)
                setTimeout(() => setShareSucceed(false), 800)
              })
              .catch(err => console.error('Error: ' + err))
            }
          }}
        >
          分享這篇文章 <i className="fa fa-share-alt" aria-hidden="true"></i>
        </button>
        {shareSucceed && <span style={styles.popupText}>已複製網址至剪貼簿! 🙌</span>}
      </div>
      <footer>
        <Bio webDescription={false}/>
        <Disqus config={disqusConfig} />
      </footer>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
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
      tableOfContents(maxDepth: 3)
    }
  }
`
