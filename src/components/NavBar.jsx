/** @jsx jsx */
import React from "react"
import {css, jsx} from "@emotion/core"


const styles = {
  
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