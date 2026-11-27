---
title: "Beyond Copilot metrics: understanding how I work"
date: "27-11-2026"
category: "ai"
tags:
  - github-copilot
  - developer-productivity
  - opentelemetry
  - grafana
description: "Token counts told me what I spent, not what to change. So I rebuilt my Copilot dashboard around qualitative feedback from Chronicle."
minutesToRead: 5
---

In [my previous post](https://www.prasanna.dev/posts/measuring-tokens-at-a-story-level), I wanted to know how many tokens a story cost. I built a dashboard with breakdowns by story, model and session, plus charts showing usage over time. It looked good.

<mark>The dashboard had so many numbers I didn't know what to make of them. Eventually, I stopped looking.</mark>

A high token count could mean the problem was genuinely hard, or that my prompt was vague and the agent spent half the session going in circles. I couldn't tell from the chart. The dashboard was also slow, with several joins just to piece things together. Between worktrees, parallel agents and the Copilot desktop app, treating a branch as a story was becoming a stretch too.

So I removed those charts and reworked the setup around a different question: what could I improve about the way I work with Copilot? For that, <mark>qualitative feedback has been more useful to me than usage totals.</mark> A suggestion about how I plan a task or check the result gives me something to try, even when it doesn't come with a number.

The work was in making that feedback part of the setup rather than another report I'd forget to request. I built a worker around reports from [Chronicle](https://docs.github.com/copilot/how-tos/copilot-cli/use-copilot-cli/chronicle), a Copilot CLI command that analyses your session history. The worker validates the reports before publishing them and puts the suggestions where I can read them alongside usage. I still wanted the numbers, but as context for my decisions. One of the first tips caught a habit I'd been repeating without noticing; more on that at the end.

![Work with Copilot, reflect with Chronicle, choose a habit, and look for recurring themes {800xx626}](/assets/posts/images/chronicle-workflow/visual-3-feedback-loop-dark.svg)

## Making reflection a regular part of the setup

GitHub Copilot CLI has a `/chronicle` command that can look through session history and offer tips. The local session store includes VS Code Agent Host and Copilot desktop sessions, so it covers the places where I work. I use two reports: tips for suggestions grouped into themes such as verification and prompt clarity, and standup for a summary of what was completed, what's planned for today and what's still open.

```bash
copilot -p "/chronicle tips"
copilot -p "/chronicle standup"
```

I've wrapped those calls in a worker and configured a daily job. The first manual run published 14 items, which I verified through the dashboard queries. **It's still a working pilot:** I need to check scheduled execution and spend a few weeks with the results before I can say whether the recurring themes are useful.

## Two paths into the dashboard

I ended up bringing back a smaller telemetry view alongside the coaching reports. Usage and coaching answer different questions, so they run independently and meet in Grafana; the token counts don't feed the coach.

![Independent telemetry and Chronicle coaching paths meet in Grafana {1640xx950}](/assets/posts/images/chronicle-workflow/visual-1-two-lanes-dark.svg)

For coaching, Chronicle does the reflection inside Copilot's own service. My worker sends the two short reports, roughly 1-2 KB each, to my Azure OpenAI deployment to turn them into structured dashboard items. It doesn't export full conversations to that deployment, but the reports do contain information derived from my sessions. That distinction matters: **this path sends more than telemetry metadata off my machine.**

The normalization request uses `store: false` and a strict JSON schema. Reports containing known secret patterns are stopped before that call, and the resulting items are checked for disallowed content such as local paths and code fences. If validation fails, nothing from that run is published to Log Analytics.

Chronicle does the session assessment, so I didn't need my own transcript-analysis pipeline. It isn't free, though: each run is capped at 30 AI credits, and the first one used about 10. So my coach for moving beyond metrics has a meter of its own.

The telemetry side is simpler. Usage is grouped by project only when a session can be matched exactly; anything else shows up as `unattributed` rather than being guessed. Raw paths are filtered out, but session IDs and project names can still leave my machine. It's metadata only, but not anonymous.

## What I look at now

A row of headline token counts sits at the top, but the coaching panels come right after: the latest tips and standup, then recurring themes.

![Illustrative Grafana dashboard with headline token counts, Chronicle tips and standup, recurring tip themes and project usage {1600xx2600}](/assets/posts/images/chronicle-workflow/grafana-dashboard-mock.png)

*Illustrative dashboard: the projects, tips and numbers shown here are fictional.*

<mark>The standup panel helps me catch up.</mark> With agents running in parallel across repos and worktrees, it's easy to lose track of what actually got done. Chronicle's standup pulls yesterday's sessions from every repo into one list, with each item tagged with its repository. That's a picture of my day the token charts never gave me, and I don't have to open each repo to piece it together.

If verification keeps coming up, that gives me a reason to look at how I'm checking the agent's work. I don't want to read too much into the count itself, though; **fewer tips on a theme wouldn't prove I'd improved.**

The detailed usage panels sit underneath. Tokens and AI units (AIUs) are counted without double-counting overlapping work, and a missing AIU shows as unavailable rather than zero. There's also a dollar estimate, but it rests on an assumption I haven't verified, so I don't treat it as my bill.

## One example of feedback I could act on

One Chronicle tip pointed out repeated UI/UX back-and-forth in the Android app I'm working on. My usual routine was to ask the agent to finish a feature, deploy it to my phone, and see how it felt. I'd have feedback, take a screenshot, transfer it to my computer, and explain what I wanted changed. Because it was an Android app, that felt like the normal way to work. I hadn't recognised how many rounds I was spending on changes that could have been settled earlier.

After that, **I asked for a simple HTML prototype first.** I could check the look and feel before asking the agent to implement the feature, without waiting for another build on my phone just to react to a design choice. I still needed to test the Android app, but that first round of feedback was much quicker. Obvious in hindsight; I hadn't noticed it until Chronicle pointed it out.

That's one example of why I put the effort into this setup. Token counts still help me understand usage, but feedback about my own working habits gives me something I can act on. I don't expect every tip to be useful. <mark>I'd rather spend time considering a suggestion than trying to infer what went wrong from a token spike.</mark>

You don't need any of my setup to start. If you use Copilot CLI, run `/chronicle tips` and see what it says about how you work. Everything else I built just makes sure I keep asking. If you want that part too, the code and setup are in [copilot-otel](https://github.com/prasann/copilot-otel).
