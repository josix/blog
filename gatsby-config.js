const remarkMath = require('remark-math')
const remarkHtmlKatex = require('remark-html-katex')

module.exports = {
  siteMetadata: {
    title: `Josix is Only Joking`,
    image: `blog-icon.png`,
    author: {
      name: `Josix`,
      summary: ` 興趣是沒事把玩各式各樣的 FOSS ，喜愛專研技術、參與社群交流，努力實踐原子習慣及建立自己的生活系統，讓生活與工作都更有趣`,
    },
    description: `這裡是我的筆記部落格，你可以找到一些技術分享或讀書筆記，同時這裡也是我的第二大腦，我將會把我的知識記錄在這裡，也許其中有你想要的資訊`,
    siteUrl: `https://josix.tw/`,
    social: {
      twitter: `josixisoj`,
      github: `josix`,
      email: `josixwang@gmail.com`,
    },
  },
  plugins: [{
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/note`,
        ignore: [`**/_*/**`, `**/Permanent/**`],
        name: `note`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/note/assets`,
        name: `notes-assets`,
      },
    },
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Josix's Blog`,
        short_name: `Josix's Blog`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#333333`,
        display: `minimal-ui`,
        icon: `content/assets/blog-icon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
        endpoint: `https://netlify.us10.list-manage.com/subscribe/post?u=66248ae68ca6c226e7755c377&amp;id=82f129ef96`, // string; add your MC list endpoint here; see instructions below
        timeout: 3500, // number; the amount of time, in milliseconds, that you want to allow mailchimp to respond to your request before timing out. defaults to 3500
      },
    },
    `gatsby-plugin-netlify-cms`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/sitemap`,
        // Exclude specific pages or groups of pages using glob parameters
        // See: https://github.com/isaacs/minimatch
        // The example below will exclude the single `path/to/page` and all routes beginning with `category`
        excludes: [],
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }

            allSitePage {
              nodes {
                path
              }
            }
        }`,
        resolveSiteUrl: ({
          site,
          allSitePage
        }) => {
          //Alternativly, you may also pass in an environment variable (or any location) at the beginning of your `gatsby-config.js`.
          return site.siteMetadata.siteUrl
        },
        resolvePages: ({
          site,
          allSitePage: { nodes: allPages },
        }) => {
          return allPages.map(node => {
            return { path: node.path, siteUrl: site.siteMetadata.siteUrl}
          })
        },
        serialize: ({
          path, siteUrl
        }) => {
          return {
            url: `${siteUrl}${path}`,
            changefreq: `daily`,
            priority: 0.7,
          }
        }
      }
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        remarkPlugins: [
          remarkMath,
          remarkHtmlKatex,
        ],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              icon: `
              <svg aria-hidden="true" height="20" version="1.1" viewBox="0 0 16 16" width="20">
                <path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z">
                </path>
              </svg>`,
              isIconAfterHeader: true,
              elements: [`h2`, `h3`],
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
          {
            resolve: `gatsby-remark-wiki-link`,
            options: {
              titleToURLPath: `${__dirname}/resolve-url.js`,
            },
          },
        ],
      },
    },
    `gatsby-plugin-postcss`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: `gatsby-transformer-markdown-references`,
      options: {
        types: ["Mdx"],
      },
    },
    `gatsby-plugin-catch-links`
  ],
}