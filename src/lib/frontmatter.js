const matter = require("gray-matter");

function parseFrontmatter(input) {
  return matter(input, {
    engines: {
      javascript() {
        throw new Error("JavaScript frontmatter is not supported; use YAML or JSON.");
      },
    },
  });
}

module.exports = parseFrontmatter;
