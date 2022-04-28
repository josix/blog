import React from "react"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"
// import NavBar from "./NavBar"


const Layout = ({ location, title, menuLinks, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  let header

  if (location.pathname === rootPath) {
    header = (
      <h1
        style={{
          ...scale(1.5),
          marginBottom: rhythm(1.5),
          marginTop: 0,
          textAlign: 'center',
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
          fontFamily: `Montserrat, sans-serif`,
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
        maxWidth: rhythm(28),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      <nav
        style={{
          position: "fixed",
          width: "100%",
          top: 0,
          left: 0,
          height: "4rem",
          fontFamily: `Montserrat, sans-serif`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#fafafa",
          zIndex: 100,
        }}>
        <div
          style={{
            // margin: 5,
          }}>
          <Link
            style={{
              boxShadow: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
          {
            menuLinks.map(link => (
              <Link
                key={link.name}
                style={{
                  boxShadow: `none`,
                  color: `inherit`,
                }}
                to={link.link}
              >
                {link.name}
              </Link>
            ))
          }
        </div>
      </nav>
      {/* <header>{header}</header> */}
      <main style={{marginTop: "3rem"}}>{children}</main>
      <footer style={{ fontSize: 12, float: "right"}}>
        Josix Wang © {new Date().getFullYear()}
      </footer>
    </div>
  )
}

export default Layout
