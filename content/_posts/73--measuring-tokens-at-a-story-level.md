---
title: "How Many Tokens Did That Story Cost?"
date: "10-07-2026"
tags:
  - github-copilot
  - opentelemetry
  - observability
  - application-insights
  - grafana
description: "Attributing GitHub Copilot token usage back to the story it was spent on, without touching the base telemetry. OpenTelemetry, a small hook, and a query-time join."
minutesToRead: 9
---

## The token-conscious era

There was a phase, not so long ago, where nobody counted. You opened Copilot, you chatted, you let the agent run for hours, and it was all just part of the magic. Tokens were cheap enough to ignore and interesting enough to spend freely.

That phase is quietly ending, and the real motivation is not guilt about spend. It is estimation. We already put an effort estimate on a story before we pick it up. What if we could put a token estimate next to it? 

> This one looks like a two-pointer, and historically two-pointers in this repo burn about 80k tokens.

To ever get there, you first need the raw data: how much did each story actually cost? Get that flowing, and the extrapolation becomes a follow-up problem rather than a fantasy. The catch is that the usual dashboards cannot give you the raw data. They tell you totals by model, by day, by user. They do not tell you that story `PROJ-123` cost more than the rest of the sprint combined. That gap is what this post is about: attributing token usage down to the story level, without wrecking anything that already works.

## What we already have

GitHub Copilot already emits telemetry in an OpenTelemetry-friendly way. Both VS Code Copilot Chat and the Copilot CLI can be pointed at an OTLP endpoint, and from there it is standard OpenTelemetry all the way down. You run a collector, the collector forwards to whatever backend you like, and you get traces and metrics for operations, latency, token counts, model usage, tool calls, the lot.

The setup is not exotic. It is a local OpenTelemetry collector in Docker, a connection string for your backend, and a few settings flipped in Copilot. Rather than repeat every command here, here are the two things you actually need:

1. [Official docs](https://learn.microsoft.com/en-us/azure/managed-grafana/grafana-opentelemetry-app-insights)

2. Here is [my setup plan](https://github.com/prasann/copilot-otel/blob/main/docs/github-copilot-otel-setup-guide.md) give it to your agents and get the job done.

The whole pipeline is just four boxes: Copilot points at a local collector, the collector forwards to App Insights, and Grafana reads it back.

![Copilot telemetry pipeline](/assets/posts/images/story-tokens/initial.png "Copilot to collector to App Insights to Grafana")

Because the collector speaks OTLP, none of this locks you into Azure. Any OpenTelemetry-compatible collector and backend works. I happen to use App Insights because it plays nicely with Grafana later, and there is even a ready-made [Copilot dashboard (dashboard ID 25053)](https://grafana.com/grafana/dashboards/25053-github-copilot/) to get you started.

![The ready-made Copilot Grafana dashboard](/assets/posts/images/story-tokens/default-grafana.png "The default GitHub Copilot dashboard, ID 25053")

So out of the box you get a real observability pipeline for Copilot. What you do not get is the story dimension. Every record knows its model and its token count. None of them know what you were working on.

## Adding your own tags without touching the metrics

Here is where it gets interesting, and where our actual discovery lived.

Copilot's telemetry already carries a unique session ID on every record. We just need to answer, separately, one small question: which story was each session about? Trying to rewrite the metrics themselves is fiddly and easy to get wrong, so we do not touch them at all.

So we leave Copilot's telemetry completely untouched. Alongside it, we drop one tiny note per session that says "session X was story Y". Then, when we build the dashboard, we join the two on the session ID. The tokens come from Copilot's numbers, the story comes from our note, and neither one had to be modified to get there.

That is the whole idea. No rewriting metrics, no fragile tagging in the pipeline.

The session boundary is handled by a Copilot hook. Hooks run shell commands at defined points in an agent session and work in both the CLI and VS Code Copilot Chat. On `sessionStart`, a small script resolves what you are working on and emits a single OTLP log record to the same collector you are already running.

"What you are working on" is kept deliberately dumb: no prompt, no remote lookup, no ticket-ID parsing. The story is just the git branch name, and the repo is just the folder name.

```bash
repo=$(basename "$CWD")
branch_id=$(git -C "$CWD" symbolic-ref --short HEAD 2>/dev/null)
```

That is the whole story-selection logic. If you name branches after work items (and most of us do), the attribution is already good enough. Rolling several branches into one story, or pulling a ticket key out of the branch, is a query-time decision you can make later without changing anything about collection.

The emitter script does exactly one job: read the hook payload, honour a few opt-out switches, resolve branch and repo, and POST one OTLP log record. It never touches the base Copilot telemetry, so opting out drops only the tag, never the token totals.

[Emitter script](https://github.com/prasann/agent-box/blob/main/vscode-prompts/.github/hooks/scripts/emit-mapping.sh) for your reference.

The payload it sends is a plain OTLP log with a small set of attributes:

```json
{
  "event": "branch.session.start",
  "session.id": "<from hook payload>",
  "branch.id": "<git branch>",
  "repo.name": "<folder name>",
  "workspace": "<absolute path>"
}
```

That JSON shape is the entire contract between the two halves of the system. The hook produces it, the backend consumes it.

Opting out is trivial too: since every tag comes from this one event, not emitting it (a shell flag, a machine-wide file, or a per-repo marker) simply leaves that work untagged, and the token totals stay intact.

The full design, including the correlation-key discussion and why we join in App Insights rather than pushing a second Grafana datasource, is written up here:

[Attribution design](https://github.com/prasann/copilot-otel/blob/main/docs/session-story-attribution-plan.md)

It is the same pipeline as before, with one box bolted on. The hook rides the exact same collector, so nothing about the baseline changes.

![Pipeline with the mapping hook added](/assets/posts/images/story-tokens/custom-tags.png "The same pipeline, now with the session-to-story hook feeding the collector")

## Joining it back together

Once the mapping events are landing in App Insights next to the Copilot metrics, the whole thing collapses into a single query. Pull the `session to story` mapping out of the log records, join it to the token metrics on `session.id`, and group by story.

The join is a `leftouter` on purpose. Sessions that were never tagged still show up, bucketed as `(untagged)`, so opting out never quietly loses spend from the totals.

```kql
let storyMap = traces
| where customDimensions["event"] == "branch.session.start"
| project session_id = tostring(customDimensions["session.id"]),
          story_id   = tostring(customDimensions["branch.id"]),
          repo       = tostring(customDimensions["repo.name"]);
customMetrics
| where name in ("copilot.tokens.input", "copilot.tokens.output")
| extend session_id = tostring(customDimensions["session.id"])
| join kind=leftouter storyMap on session_id
| extend story_id = iif(isempty(story_id), "(untagged)", story_id),
         repo     = iif(isempty(repo), "(untagged)", repo)
| summarize input  = sumif(value, name == "copilot.tokens.input"),
            output = sumif(value, name == "copilot.tokens.output"),
            total  = sum(value),
            sessions = dcount(session_id)
        by repo, story_id
| order by total desc
```

That query is the payoff. It is the difference between "we spent X tokens this week" and "this branch cost 3x everything else, maybe we should look at why".

## The Grafana view

That query drives a single panel: tokens per story, biggest spender at the top. That is the whole payoff, one screen that finally answers where the tokens went.

![Tokens per story in Grafana](/assets/posts/images/story-tokens/story-level-grafana.png "Tokens grouped by story, biggest first")

You do not have to build it by hand. Here is the dashboard JSON I use. Import it, point it at your Azure Monitor data source, and you are done:

[Story-level dashboard JSON](https://github.com/prasann/copilot-otel/blob/main/dashboards/branch-spend-grafana.json)

## Wrapping up

The whole thing rests on one decision: do not modify what Copilot already emits. Let it keep sending clean, standard telemetry. Ship one tiny mapping event alongside it from a hook, and do the tagging as a join at query time instead of a stamp at collection time. That one move is what makes concurrent projects work, what makes opt-out trivial, and what keeps the base metrics honest.

If you want to try it, start with the setup guide to get telemetry flowing, then add the hook and the join:

- Copilot OpenTelemetry setup: [github-copilot-otel-setup-guide.md](https://github.com/prasann/copilot-otel/blob/main/docs/github-copilot-otel-setup-guide.md)
- Session-to-story attribution design: [session-story-attribution-plan.md](https://github.com/prasann/copilot-otel/blob/main/docs/session-story-attribution-plan.md)
- The emitter hook script: [emit-mapping.sh](https://github.com/prasann/agent-box/blob/main/vscode-prompts/.github/hooks/scripts/emit-mapping.sh)

Now when someone asks how many tokens that story cost, you have an actual answer instead of a shrug.
