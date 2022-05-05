/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import { rhythm } from "../utils/typography"
import "../../styles/components/bio.css"

const styles = {
  socialMediaIcon: {
    margin: 5,
    marginRight: rhythm(1 / 5),
  }
}

const Bio = ({webDescription}) => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: {regex: "/profile-pic.jpg/"}) {
        childImageSharp {
          gatsbyImageData(width: 50, height: 50, layout: FIXED)
        }
      }
      site {
        siteMetadata {
          description
          author {
            name
            summary
          }
          social {
            twitter
            github
            email
          }
        }
      }
    }
  `)

  const { author, social, description } = data.site.siteMetadata
  const image = getImage(data.avatar)
  return (
    <div
      style={{
        display: `flex`,
        marginBottom: rhythm(1),
        flexDirection: 'column',
      }}
    >
      <div className="bio__header">
        <GatsbyImage
          image={image}
          alt={author.name}
          className="bio__avatar"
          imgStyle={{
            marginRight: rhythm(1 / 2),
            minWidth: 50,
            borderRadius: `50%`,
          }}
        />
        <a className="bio__icon" href={`https://twitter.com/${social.twitter}`}>
            <i className="fab fa-twitter"></i>
        </a>
        <a className="bio__icon" href={`https://github.com/${social.github}`}>
          <i className="fab fa-github"></i>
        </a>
        <a className="bio__icon" href={`mailto:${social.email}`}>
          <i className="fas fa-envelope"></i>
        </a>
      </div>
      <p>
        Hi, I'm <strong>{author.name}</strong>，{author.summary}
      </p>
      {webDescription && <p>{description}</p>}
    </div>
  )
}

export default Bio
