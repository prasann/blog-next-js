---
title: "Reducing path drift in agentic systems with dynamic Few-shot injection"
date: "02-10-2025"
tags:
  - LangGraph
  - Langfuse
  - Redis
  - agentic-systems
  - human-in-loop
description: "A practical feedback loop that turns validated agent runs into dynamic, query-relevant few-shot examples to make agentic workflows more predictable."
---

Agentic systems can do powerful things, but they are often unpredictable in practice. With many agents and branching workflows, small changes in input or context can push the system down a different path. That makes the experience inconsistent for users and hard to debug for developers.

## Why this problem matters

Agentic systems are powerful because they let many small agents work together. But that power comes with branching. With 12 agents and 30+ workflows, small differences in the prompt or context can push the system down a different path. For users this feels inconsistent. For developers, the quick fix is to add many few-shot examples into prompts to bias behavior. That works in small cases but does not scale. Maintaining hundreds of examples across many nodes becomes a real headache.

We wanted a way to teach the system what good runs look like, without bloating prompts or micromanaging examples.

## The core idea

Let the system do its work and capture what it did. Use SMEs to mark runs as correct or incorrect via Langfuse. For runs marked correct, store the serialized nodegraph (JSON) and the original user query.

Later, when a new user query arrives, we search Redis with that query, get the top-2 past runs, and dynamically inject per-node examples from them.

Each agent (node) receives at most two examples. That keeps prompts short but relevant and avoids large static few-shot blocks.

This approach keeps examples dynamic and focused on the current user query. Instead of one big static set of examples, we use small, on-demand examples that match the query.

## Architecture overview

Components:

- LangGraph: the agent runtime and orchestrator.
- Langfuse: trace collection and SME annotation queue.
- Harvester/Indexer: moves validated traces from Langfuse into Redis.
- Redis: stores the nodegraph JSON and a vector index built from the user query embeddings.
- Runtime retrieval/injection: at run time, the orchestrator queries Redis and injects per-node examples.

![Logical diagram {350x600}](/assets/posts/images/langfuse-feedback-loop/flow-diagram-neutral.png "Logical architecture")

Key constraints we used:

- Only the user query is embedded for semantic search.
- Nodegraph is stored as plain JSON; it contains each node's prompt and the LLM response.
- Retrieval returns the top-2 runs. Each node receives up to 2 examples.

## What we store and why

When an SME marks a run as correct, we persist two things:

- The serialized nodegraph. This is a JSON record that lists each node (agent name/id), the exact prompt or input sent to that agent, and the model's response for that node.
- The original user query text.

Design choice: we embed only the user query and index that vector in Redis. This keeps the index small and focused on matching intent. Once we retrieve similar runs, we inspect the stored JSON to pick node-level examples for injection.

Storing full nodegraphs in JSON keeps fidelity for debugging and auditing. You can replay or inspect the exact prompt/response pairs later.

## How runtime injection works

When a new request arrives, the orchestrator embeds the current user query and queries Redis. We get the top-2 validated runs.

For each agent node reached during the new run, we look up the same node in the retrieved runs and prepare example snippets. Each example contains the agent input (what was fed previously) and the agent output (the LLM response). We attach at most two per-node examples to the node prompt.

By giving the agent a small set of past inputs and outputs that match the user query, we increase the chance the agent will perform the same action it did before. This nudges the whole orchestrator to follow the same path and helps avoid unpredictable branching.

We do not replay entire runs as examples. Injecting per-node examples keeps prompts concise and relevant to the agent's immediate decision.

## Design choices and constraints

- SME annotation is binary (yes/no) in Langfuse. This keeps the annotator work light and quick.
- We pick top-2 runs from Redis. This gives two validated perspectives without overwhelming the prompt.
- We cap examples at two per node to control prompt length.
- We did not add TTL or retention rules during the hackathon. A longer TTL might work, and this is a follow-up item.

These choices kept the hack simple and fast to iterate on.

## A short example (narrative)

To keep this brief, here is the flow grouped into three stages.

First run

- A user asks: “Create a calendar invite for Monday at 10 and email the team.” The orchestrator runs several agents (parser, calendar, email). We record the nodegraph: each node prompt and the model response.

In-between (validation and storage)

- An SME reviews the run in Langfuse and marks it as correct. A harvester stores the nodegraph JSON and an embedding of the original user query into Redis.

Next similar request

- Later, a similar request arrives. The runtime searches Redis with the new query, retrieves the top-2 validated runs, and injects up to two node-level examples (input + output) into the relevant agent prompts. This nudges the agents to make the same decisions as the validated runs.

This shorter example shows the essential loop: run, validate, store, retrieve, inject.

## Benefits

- Dynamic, on-demand examples that are relevant to the current user query.
- Less manual prompt management than maintaining large static example sets.

## Conclusion

Agentic systems give us flexibility but also introduce branching that makes behavior hard to predict and debug. The feedback loop we built addresses this by capturing SME-validated runs and using them as small, targeted examples at runtime. That lets the orchestrator bias toward known-good paths without stuffing prompts with large, static example sets.

This approach is lightweight and fast to iterate on, but it has trade-offs: without retention or versioning the system can overfit to older runs, and multiple valid past runs may conflict. Practical next steps are to add retention/versioning, conflict-resolution rules, and metrics that measure whether path drift actually decreases over time. If you want to make this production-ready, start by tracking how often injected examples change the chosen path and add expiry or weighting to keep examples fresh.
