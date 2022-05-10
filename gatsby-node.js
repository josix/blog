const path = require(`path`)
const {
  createFilePath
} = require(`gatsby-source-filesystem`)

exports.createPages = async ({
  graphql,
  actions
}) => {
  const {
    createPage
  } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.jsx`)
  const result = await graphql(
    `
      {
        allMdx(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
          filter: {fileAbsolutePath: {regex: "/\\/blog\\//"}}
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allMdx.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: `post${post.node.fields.slug}`,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })

  const blogNote = path.resolve(`./src/templates/blog-note.jsx`)
  const blogNoteResult = await graphql(
    `
      {
        allMdx(
          sort: { fields: [frontmatter___date], order: DESC }
          filter: {fileAbsolutePath: {regex: "/\\/note\\//"}}
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  const notes = blogNoteResult.data.allMdx.edges

  notes.forEach((note, index) => {
    createPage({
      path: `note${note.node.fields.slug}`,
      component: blogNote,
      context: {
        slug: note.node.fields.slug,
      },
    })
  })
}

exports.onCreateNode = ({
  node,
  actions,
  getNode
}) => {
  const {
    createNodeField
  } = actions

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({
      node,
      getNode
    })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}