/** @jsx jsx */
import React from "react"
import {css, jsx} from "@emotion/core"


const styles = {
  h3: {
    margin: "5px 0px 16px 0px",
  },
  toc: css`
    display: flex;
    flex-direction: column;
    position: fixed;
    color: #808080;
    right: 12%;
    top: 18%;
    max-height: 100vh;
    width: 255px;
    list-style-type: none;
    overflow: hidden;
    overflow-y: scroll;
    padding: 0.75rem;
    border-radius: 5px;

    @media (max-width: 770px) {
      position: static;
      width: 100%;
      box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 2px;
      padding: 0.75rem;
      margin-bottom: 25px;
      max-height: 30vh;
    }
  `,
  ul: {
    listStyleType: "none",
    marginBottom: 0,
    marginLeft: 0,
  },
  item: {
    lineHeight: 1.2,
    marginTop: 3,
    fontSize: 14.5,
  },
  link: css`
    color: #808080;
    :hover {
      color: #945a47;
    }
  `,
  subitem: {
    fontSize: 12.5,
    listStyleType: "none",
    lineHeight: 1.2,
    marginTop: 12,
    marginBottom: 12,
  }
}

const TOC = ({
  items
}) => {
  if (!items) return null;

  return (
    <div
      css={styles.toc}
    >
      <h5 style={styles.h3}>Contents</h5>
      <ul style={styles.ul}>
        {
          items.map(item => (
            <li style={styles.item} key={item.url}>
              <div style={styles.linkWrapper} >
                <a css={styles.link} href={item.url} key={item.url}>
                  {item.title}
                </a>
              </div>
              {item.items && item.items.length > 0 ? (
                <ul style={{ ...styles.ul, marginLeft: "1.25rem" }}>
                  {
                    item.items.map(
                      subitem => (
                        <li style={styles.subitem} key={subitem.url}>
                          <a css={styles.link} href={subitem.url} key={subitem.url}>
                            {subitem.title}
                          </a>
                        </li>
                      )
                    )
                  }
                </ul>)
              : null}
            </li>)
          )
        }
      </ul>
    </div>
  );
}

export default TOC;