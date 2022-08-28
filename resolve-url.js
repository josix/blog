const glob = require('glob');



module.exports = title => {
  const filePaths = glob.sync('content/note/**/*.md',
    {
      ignore: [
        'content/note/.git/**',
        'content/_private/**',
        'content/note/.gitignore',
        'content/note/README.md'
      ]
    }).filter(file => file.match(title));
  if (filePaths.length > 0) {
    const parts = filePaths[0].split("/");
    return `/${parts.slice(1, parts.length - 1).join("/")}/${encodeURIComponent(title)}`;
  }
  return `/note/${encodeURIComponent(title)}`;
}