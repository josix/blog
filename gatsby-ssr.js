const React = require("react")

const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme') || 'system'
    var resolved = stored
    if (stored === 'system') {
      resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    document.documentElement.dataset.theme = resolved
    document.documentElement.dataset.themePreference = stored
  } catch (e) {}
})()
`

exports.onRenderBody = ({ setPreBodyComponents, setHtmlAttributes }) => {
  setHtmlAttributes({ lang: "zh-Hant-TW" })
  setPreBodyComponents([
    React.createElement("script", {
      key: "theme-init",
      dangerouslySetInnerHTML: { __html: themeInitScript },
    }),
  ])
}
