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
    right: 50px;
    top: 18%;
    max-height: 70vh;
    width: 255px;
    list-style-type: none;
    overflow: hidden;
    overflow-y: scroll;
    padding: 0.75rem;
    box-shadow: rgb(20 21 23 / 32%) 0px 8px 24px;
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
  item: {
    lineHeight: 1.2,
    marginTop: 3,
  },
  link: css`
    color: #191413;
    :hover {
      color: #a37774
    }
  `,
  subitem: {
    fontSize: 14.5,
    marginLeft: 25,
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
      <h3 style={styles.h3}>Table of Contents</h3>
      {items.map(
        item => (
          <li style={styles.item} key={item.url}>
            <a css={styles.link} href={item.url} key={item.url}>
              {item.title}
            </a>
            {window.outerWidth >= 770 && item.items && item.items.length > 0 ? item.items.map(
              subitem => (
                <li css={styles.subitem} key={subitem.url}>
                  <a css={styles.link} href={subitem.url} key={subitem.url}>
                    {subitem.title}
                  </a>
                </li>
              )
            ) : null}
          </li>
        )
      )}
    </div>
  );
}

export default TOC;