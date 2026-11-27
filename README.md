## Prasanna's Blog

Updating more readme.

Post and talk frontmatter supports YAML (default) and JSON. JavaScript frontmatter
is rejected by the shared parser used by the site and the tag-check script.

The dependency override for `@tailwindcss/typography` keeps its pinned selector
parser on the patched 6.x release line. The `glob` and `test-exclude` overrides
keep Jest's globbing dependencies on patched releases until their upstream
dependency ranges catch up.

Pages

[x] Landing page
[x] /blog = List of posts
[x] /post/{post-name}
[x] /talks - List of talks

Pending

[x] Header design
[x] Landing page color scheme
[x] Header logo
[x] Fix Blog post CSS
[x] Footer broke in the mobile
[x] Align Date, Engage buttons
[x] /about
[x] Enable click on the buttons in landing page and in engage component
[x] Basic SEO setup. (Thumbnails, Meta tags for sharing)
[x] Migrate data
[x] Migrate blogs
[x] Migrate talks
[x] Setup redirects for the old ones
[x] rss feeds - https://www.daan.fyi/writings/rss
[x] manifest json for PWA
[x] setup analytics
[x] use prasanna.dev as main URL
[x] setup rel="canonical" in prasans.info
[x] activate lambda
[x] start indexing.

[] Resume
[x] Like button in the post
[] clean up and structure CSS
[] Fix header with minimal things on scroll
[] Engage buttons on the side.

Ideas

- https://lordicon.com/icons
- https://lottiefiles.com/
- Add framer motion to route transitions.
