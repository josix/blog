module.exports = title => {
  return `/note/${encodeURIComponent(title)}`
}