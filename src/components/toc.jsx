/** @jsx jsx */
import React, { useState, useEffect } from "react"
import { css, jsx } from "@emotion/core"

const styles = {
  h3: {
    margin: "5px 0px 16px 0px",
  },
  toc: css`
    display: flex;
    flex-direction: column;
    position: static;
    color: var(--text-secondary);
    width: 100%;
    max-height: 30vh;
    list-style-type: none;
    overflow: hidden;
    overflow-y: auto;
    padding: 0.75rem;
    border: 1px solid var(--border-subtle);
    border-radius: 5px;
    margin-bottom: 25px;
    background-color: var(--bg-elevated);

    @media (min-width: 1500px) {
      position: fixed;
      right: 1rem;
      top: 18%;
      width: 200px;
      max-height: 70vh;
      margin-bottom: 0;
      background-color: transparent;
      border: none;
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
    color: var(--text-secondary);
    :hover {
      color: var(--accent);
    }
  `,
  activeLink: css`
    color: var(--accent);
    font-weight: 600;
    :hover {
      color: var(--accent);
    }
  `,
  subitem: {
    fontSize: 12.5,
    listStyleType: "none",
    lineHeight: 1.2,
    marginTop: 12,
    marginBottom: 12,
  },
}

const TOC = ({ items }) => {
  const [activeId, setActiveId] = useState("")

  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll("article :is(h2, h3)[id]")
    )
    if (headings.length === 0) return undefined
    const observer = new IntersectionObserver(
      entries => {
        const intersecting = entries.filter(e => e.isIntersecting)
        if (intersecting.length === 0) return
        const top = intersecting.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b
        )
        setActiveId(top.target.id)
      },
      { rootMargin: "-20% 0% -70% 0%", threshold: 0 }
    )
    headings.forEach(h => observer.observe(h))
    return () => observer.disconnect()
  }, [])

  if (!items) return null

  return (
    <div css={styles.toc}>
      <h5 style={styles.h3}>Contents</h5>
      <ul style={styles.ul}>
        {items.map(item => (
          <li style={styles.item} key={item.url}>
            <div style={styles.linkWrapper}>
              <a
                css={
                  item.url === `#${activeId}` ? styles.activeLink : styles.link
                }
                href={item.url}
                key={item.url}
                aria-current={
                  item.url === `#${activeId}` ? "location" : undefined
                }
              >
                {item.title}
              </a>
            </div>
            {item.items && item.items.length > 0 ? (
              <ul style={{ ...styles.ul, marginLeft: "1.25rem" }}>
                {item.items.map(subitem => (
                  <li style={styles.subitem} key={subitem.url}>
                    <a
                      css={
                        subitem.url === `#${activeId}`
                          ? styles.activeLink
                          : styles.link
                      }
                      href={subitem.url}
                      key={subitem.url}
                      aria-current={
                        subitem.url === `#${activeId}` ? "location" : undefined
                      }
                    >
                      {subitem.title}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TOC
