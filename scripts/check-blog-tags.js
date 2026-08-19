// Validates that every blog post's frontmatter `category` maps to a canonical tag,
// without needing a full `npm run build`. Same mapping logic as normalizeTags()
// in src/lib/api.ts -- keep TAG_MAP/MANUAL_TAG_OVERRIDES here in sync with that file.
//
// Usage: npm run check-blog-tags
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const postsDir = path.join(__dirname, "../content/_posts");

const TAG_MAP = {
  ai: "AI/LLM",
  llm: "AI/LLM",
  langchain: "AI/LLM",
  java: "Java",
  javascript: "JavaScript",
  node: "JavaScript",
  angular: "JavaScript",
  react: "JavaScript",
  ruby: "Ruby",
  android: "Android",
  testing: "Testing",
  docker: "DevOps",
  "dev-ops": "DevOps",
  aws: "DevOps",
  git: "DevOps",
  architecture: "Architecture",
  cors: "Web",
  web: "Web",
  css: "Web",
  clojure: "Clojure",
  golang: "Go",
  tricks: "Tips & Tricks",
  windows: "Tips & Tricks",
  mac: "Tips & Tricks",
  ubuntu: "Tips & Tricks",
};
const DROPPED_RAW_TAGS = new Set(["tech"]);

// Slugs already covered by MANUAL_TAG_OVERRIDES in src/lib/api.ts -- don't
// flag these even though their frontmatter category is missing/unmapped.
const MANUAL_OVERRIDE_SLUGS = new Set([
  "first-post",
  "test-smtp-server",
  "testing-apiary-using-github-travis",
  "whats-new-in-apple-passbook-ios7",
  "link-your-sublime-text-2-instances-with-dropbox",
  "strangler-fig-pattern-with-cdc",
  "reflections-on-building-a-POS",
  "quota-management-for-dalle-apim",
  "auto-function-calling-semantic-kernel",
  "google-maps-timeline-viewer",
  "realtime-api-intro-and-learnings",
  "distributed-runtime-autogen",
  "a2a-vs-http",
  "feedback-loop-for-agentic-systems",
  "langgraph-patterns-and-conventions",
  "decoding-gh-copilot-customizations",
  "vscode-copilot-hooks-notifications",
  "measuring-tokens-at-a-story-level",
]);

function fileNameToSlug(fileName) {
  const match = fileName.match(/.*--(.*).md/);
  return match ? match[1] : fileName;
}

let issues = 0;

fs.readdirSync(postsDir).forEach((fileName) => {
  const slug = fileNameToSlug(fileName);
  if (MANUAL_OVERRIDE_SLUGS.has(slug)) return;

  const { data } = matter(fs.readFileSync(path.join(postsDir, fileName), "utf8"));
  const rawTags = (data.category || "")
    .split(",")
    .map((raw) => raw.trim().toLowerCase())
    .filter((raw) => raw.length > 0 && !DROPPED_RAW_TAGS.has(raw));

  if (rawTags.length === 0) {
    console.warn(`No usable category set: ${fileName} (slug: ${slug})`);
    issues++;
    return;
  }

  rawTags.forEach((raw) => {
    if (!TAG_MAP[raw]) {
      console.warn(`Unmapped category "${raw}" in ${fileName} (slug: ${slug}) -- add it to TAG_MAP in src/lib/api.ts and here.`);
      issues++;
    }
  });
});

if (issues === 0) {
  console.log("All post categories map to a canonical tag.");
} else {
  console.log(`\n${issues} issue(s) found. Unmapped/missing categories fall back to "Tips & Tricks" at build time.`);
  console.log("Fix by adding the raw value to TAG_MAP, or add a slug entry to MANUAL_TAG_OVERRIDES in src/lib/api.ts.");
}
