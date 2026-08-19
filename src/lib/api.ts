import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import Post from "../types/post";
import { format, parse, compareDesc } from 'date-fns'

const postsDirectory = join(process.cwd(), "content", "_posts");
const talksDirectory = join(process.cwd(), "content", "_talks");

// Broad, canonical topic tags. Raw category values (lowercased, trimmed) map here.
// New raw tags in markdown must be added below; unmapped ones fall back to "Tips & Tricks".
const TAG_MAP: Record<string, string> = {
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

// Raw values that carry no topical meaning and should be dropped rather than mapped.
const DROPPED_RAW_TAGS = new Set(["tech"]);

// Hand-assigned tags for posts with no/insufficient frontmatter category, keyed by slug.
const MANUAL_TAG_OVERRIDES: Record<string, string[]> = {
  "first-post": ["Tips & Tricks"],
  "test-smtp-server": ["Testing"],
  "testing-apiary-using-github-travis": ["Testing", "DevOps"],
  "whats-new-in-apple-passbook-ios7": ["Tips & Tricks"],
  "link-your-sublime-text-2-instances-with-dropbox": ["Tips & Tricks"],
  "strangler-fig-pattern-with-cdc": ["Architecture"],
  "reflections-on-building-a-POS": ["Architecture"],
  "quota-management-for-dalle-apim": ["AI/LLM"],
  "auto-function-calling-semantic-kernel": ["AI/LLM"],
  "google-maps-timeline-viewer": ["Web"],
  "realtime-api-intro-and-learnings": ["AI/LLM"],
  "distributed-runtime-autogen": ["AI/LLM", "Architecture"],
  "a2a-vs-http": ["AI/LLM", "Architecture"],
  "feedback-loop-for-agentic-systems": ["AI/LLM"],
  "langgraph-patterns-and-conventions": ["AI/LLM"],
  "decoding-gh-copilot-customizations": ["AI/LLM"],
  "vscode-copilot-hooks-notifications": ["AI/LLM"],
  "measuring-tokens-at-a-story-level": ["AI/LLM"],
};

function normalizeTags(rawCategory: string | undefined, slug: string): string[] {
  const tags = new Set<string>();

  (rawCategory || "")
    .split(",")
    .map((raw) => raw.trim().toLowerCase())
    .filter((raw) => raw.length > 0 && !DROPPED_RAW_TAGS.has(raw))
    .forEach((raw) => {
      const canonical = TAG_MAP[raw];
      if (canonical) {
        tags.add(canonical);
      } else {
        console.warn(`Unmapped tag "${raw}" (slug: ${slug}) — falling back to "Tips & Tricks". Add it to TAG_MAP.`);
        tags.add("Tips & Tricks");
      }
    });

  (MANUAL_TAG_OVERRIDES[slug] || []).forEach((tag) => tags.add(tag));

  return Array.from(tags);
}

export function getPostFileNames(): string[] {
  return fs.readdirSync(postsDirectory);
}

export function getPostByFileName(
  fileName: string,
  withContent: boolean = true
): Post {
  const fullPath = join(postsDirectory, `${fileName}`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const post: Post = <Post>{};
  post.slug = fileNameToSlug(fileName);
  post.title = data.title;
  post.description = data.description;
  post.date = formattedDateString(data.date);
  post.tags = normalizeTags(data.category, post.slug);

  if (withContent) {
    post.content = content;
  }
  if (data.minutesToRead) {
    post.minutesToRead = pluralize(data.minutesToRead);
  }
  return post;
}

export function getAllPosts(withContent: boolean = false): Post[] {
  const fileNames = getPostFileNames();
  let allPosts = fileNames
    .map((fileName) => getPostByFileName(fileName, withContent))
    .sort(sortDesc);
  return allPosts;
}

export function getAllUrlSlugs(): string[] {
  const fileNames = getPostFileNames();
  return fileNames.map(fileNameToSlug);
}

export function getPostBySlug(slug: string): Post {
  const fileNames = getPostFileNames();
  const currentFileName = fileNames.find((fileName) =>
    fileName.endsWith(`${slug}.md`)
  );
  if (currentFileName === undefined) throw Error(`file not found ${slug}`);
  return getPostByFileName(currentFileName);
}

export function getTalkDescription(fileName: string) {
  const fullPath = join(talksDirectory, `${fileName}`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { content } = matter(fileContents);
  return content;
}

export type YearGroup<T> = { year: number; items: T[] };

// Global tag -> count map. A single item can carry multiple tags, so counts can exceed item total.
export function getTagCounts<T extends { tags: string[] }>(items: T[]): Record<string, number> {
  const counts: Record<string, number> = {};
  items.forEach((item) => {
    item.tags.forEach((tag) => {
      counts[tag] = (counts[tag] || 0) + 1;
    });
  });
  return counts;
}

// Buckets items by year (newest first), preserving each year's incoming order.
export function groupByYear<T extends { date: string }>(items: T[]): YearGroup<T>[] {
  const groups = new Map<number, T[]>();
  items.forEach((item) => {
    const year = extractYear(item.date);
    if (!groups.has(year)) {
      groups.set(year, []);
    }
    groups.get(year)!.push(item);
  });
  return Array.from(groups.entries())
    .map(([year, yearItems]) => ({ year, items: yearItems }))
    .sort((a, b) => b.year - a.year);
}

export function getYearCounts<T extends { date: string }>(items: T[]): Record<number, number> {
  const counts: Record<number, number> = {};
  items.forEach((item) => {
    const year = extractYear(item.date);
    counts[year] = (counts[year] || 0) + 1;
  });
  return counts;
}

// Talk dates aren't all machine-parseable (e.g. "Jun 27th & 28th, 2018"), so pull
// the year out with a regex instead of relying on a fixed date format.
function extractYear(date: string): number {
  const match = date.match(/(\d{4})/);
  if (!match) {
    throw new Error(`Cannot extract year from date: ${date}`);
  }
  return parseInt(match[1], 10);
}

function fileNameToSlug(fileName: string): string {
  let regExMatcher = fileName.match(/.*--(.*).md/);
  if (regExMatcher === null) {
    throw Error(`unknown filename ${fileName}`);
  }
  return regExMatcher[1];
}

function formattedDateString(date: string): string {
  try {
    return format(formatStringToDate(date), "dd-MMMM-yyyy");
  } catch (e) {
    console.log("Error", date);
  }
  return "12-10-2011";
}

function sortDesc(leftPost: Post, rightPost: Post): number {
  const leftPostDate = formatStringToDate(leftPost.date, "dd-MMMM-yyyy");
  const rightPostDate = formatStringToDate(rightPost.date, "dd-MMMM-yyyy");
  return compareDesc(leftPostDate, rightPostDate);
}

function formatStringToDate(date: string, format: string = "dd-MM-yyyy"): Date {
  return parse(date, format, new Date());
}

function pluralize(minutesToRead: number = 1) {
  return minutesToRead === 1
    ? "1 minute read"
    : `${minutesToRead} minutes read`;
}