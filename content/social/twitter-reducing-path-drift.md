# LinkedIn

Agentic systems are powerful but can get messy easily. With many small agents and branching workflows, tiny changes in input or context can push the system down a completely different path. For users this looks inconsistent; for developers it becomes a maintenance nightmare.

At a recent hackathon we built a small, practical feedback loop that makes agentic flows more predictable without bloating prompts or micromanaging examples.

Here’s the idea, at a high level:

Capture runs that SMEs mark as correct (store per-node prompts + responses and the triggering query).
Index the user query for semantic search in Redis.
At runtime, retrieve the top-2 similar validated runs and inject up to two node-level examples per agent to nudge the system toward the same path.
Why this works

Relevance over volume: each agent gets a tiny set of per-node examples that match the current query, instead of one huge static few-shot block.
Debuggable fidelity: storing nodegraphs as JSON lets you replay or audit exactly what was sent to each agent.
Lightweight operations: SME validation is binary, retrieval is limited to top-2 runs, and examples are capped at two per node — so prompts stay compact.
Design notes and tradeoffs

We index only the user query to keep the vector store small and focused on intent; nodegraphs remain plain JSON for fidelity and debugging.
The hackathon prototype didn't include TTL, versioning, or conflict-resolution — production systems should add expiry/weighting to avoid overfitting to stale runs.
If you want the implementation details (harvester/indexer code, Redis schema, nodegraph JSON format, and a short example), I wrote a full post with diagrams and code snippets on my blog — link below. Would love to hear your thoughts or questions.

Suggested hashtags: #AgenticAI #FewShot #LangGraph #Langfuse #AIInfrastructure

## Tweet

Agents are powerful, but branching workflows get messy. We hacked up a small feedback loop that turns validated runs into query‑specific few‑shot examples. Less guesswork, more useful output.

