import Typography from "typography"
import Wordpress2016 from "typography-theme-wordpress-2016"

Wordpress2016.overrideThemeStyles = (config) => {
  return {
    "h1": {
      fontWeight: "400",
    },
    "a": {
      boxShadow: `none`,
      color: "#945a47",
    },
    "body": {
      backgroundColor: "#FEFCFC",
    }
  }
}

delete Wordpress2016.googleFonts

const typography = new Typography(Wordpress2016)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
