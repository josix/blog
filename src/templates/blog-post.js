/** @jsx jsx */
import React, { useState, useEffect } from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Link, graphql } from "gatsby"
import { css, jsx } from '@emotion/core'
import Octomments from 'octomments'
import OctommentsRenderer from 'octomments-renderer'

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import TOC from "../components/toc"
import { rhythm, scale } from "../utils/typography"
import { link as linkStyle, navLink as navLinkStyle } from "../../styles/link.js"

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
  },
  link: linkStyle,
  navLink: navLinkStyle,
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
  useEffect(() => {
    Octomments({
     github: {
       owner: 'josix',
       repo: 'blog',
     },
     issueNumber: 28,
     renderer: [OctommentsRenderer, '#comments']
   }).init();
 }, []);
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
        <div css={styles.link}>
          <MDXRenderer>{body}</MDXRenderer>
        </div>
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
          <li css={styles.navLink}>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li css={styles.navLink}>
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
        <Bio webDescription={false} />
        <div id="comments" />
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
