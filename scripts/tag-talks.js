// Interactive helper to assign canonical tags to talks in content/_talks/entries.json
// that don't have any yet. Run this after adding a new talk entry.
//
// Usage: npm run tag-talks
const fs = require("fs");
const path = require("path");
const readline = require("readline/promises");
const { stdin, stdout } = require("process");

const entriesPath = path.join(__dirname, "../content/_talks/entries.json");

// Keep in sync with TAG_ORDER in src/components/timeline/TopicFilter.tsx
const CANONICAL_TAGS = [
  "AI/LLM",
  "JavaScript",
  "Java",
  "Architecture",
  "DevOps",
  "Testing",
  "Web",
  "Android",
  "Ruby",
  "Clojure",
  "Go",
  "Tips & Tricks",
];

// JSON.stringify would expand "tags" arrays across multiple lines; collapse them
// back to a single line so untouched entries don't create noisy diffs.
function formatEntries(entries) {
  const json = JSON.stringify(entries, null, 2);
  const collapsed = json.replace(/"tags": \[\n([\s\S]+?)\n\s*\]/g, (_match, inner) => {
    const items = inner.split(",").map((item) => item.trim());
    return `"tags": [${items.join(", ")}]`;
  });
  return `${collapsed}\n`;
}

async function main() {
  const entries = JSON.parse(fs.readFileSync(entriesPath, "utf8"));
  const missing = entries.filter((talk) => !Array.isArray(talk.tags) || talk.tags.length === 0);

  if (missing.length === 0) {
    console.log("Every talk already has tags. Nothing to do.");
    return;
  }

  console.log(`Found ${missing.length} talk(s) without tags.\n`);
  console.log("Canonical tags:");
  CANONICAL_TAGS.forEach((tag, i) => console.log(`  ${i + 1}. ${tag}`));

  const rl = readline.createInterface({ input: stdin, output: stdout });
  let updated = 0;

  for (const talk of missing) {
    console.log(`\n"${talk.title}" (${talk.date}, ${talk.place})`);
    if (talk.description) {
      const snippet = talk.description.length > 160 ? `${talk.description.slice(0, 160)}...` : talk.description;
      console.log(`  ${snippet}`);
    }

    const answer = (await rl.question('Pick tag numbers (e.g. "1,4"), or press Enter to skip: ')).trim();
    if (!answer) {
      console.log("  skipped");
      continue;
    }

    const picked = answer
      .split(/[,\s]+/)
      .map((n) => parseInt(n, 10))
      .filter((n) => Number.isInteger(n) && n >= 1 && n <= CANONICAL_TAGS.length)
      .map((n) => CANONICAL_TAGS[n - 1]);

    if (picked.length === 0) {
      console.log("  no valid tag numbers recognized, skipped");
      continue;
    }

    talk.tags = Array.from(new Set(picked));
    console.log(`  tagged: ${talk.tags.join(", ")}`);
    updated++;

    // Rebuild the object so "tags" lands right after "place" (matching the
    // convention for already-tagged entries), instead of at the end.
    const { title, date, place, tags, ...rest } = talk;
    const index = entries.indexOf(talk);
    entries[index] = { title, date, place, tags, ...rest };
  }

  rl.close();

  if (updated === 0) {
    console.log("\nNo changes made.");
    return;
  }

  fs.writeFileSync(entriesPath, formatEntries(entries));
  console.log(`\nSaved. Updated ${updated} talk(s) in content/_talks/entries.json.`);
  console.log("Tag counts on /talks recompute automatically on the next `npm run build`/`npm run dev` \u2014 no other step needed.");
}

main();
