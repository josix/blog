import React, { useEffect, useState } from "react"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"
import "../../styles/components/layout.css"
import SkipLink from "./skip-link"
import ProgressBar from "./progress-bar"
import ThemeToggle from "./theme-toggle"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const [path, setPath] = useState("")

  useEffect(() => {
    setPath(window.location.pathname)
  }, [])

  const visibleOnRoute =
    path !== "" &&
    path !== "/" &&
    !path.startsWith("/admin") &&
    !path.startsWith("/sitemap")

  let header

  if (location.pathname === rootPath) {
    header = (
      <h1
        style={{
          ...scale(1.5),
          marginBottom: rhythm(1.5),
          marginTop: 0,
          textAlign: "center",
          fontFamily: "Comforter, sans-serif",
          fontSize: "6rem",
          lineHeight: 1,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h1>
    )
  } else {
    header = (
      <h3
        style={{
          fontFamily: `Comforter, sans-serif`,
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h3>
    )
  }
  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(35),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      <SkipLink />
      <ProgressBar visible={visibleOnRoute} />
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {header}
        <ThemeToggle />
      </header>
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <footer className="copyright">
        Josix Wang © {new Date().getFullYear()}
      </footer>
    </div>
  )
}

export default Layout
