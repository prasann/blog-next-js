# When to Use Instructions vs Prompts vs Agents vs Skills

**Reading Time**: ~10 minutes  
**Hands-on Lab**: [gh-copilot-lab](https://github.com/prasann/gh-copilot-lab)

---

## The Problem

You know GitHub Copilot can be customized. The [official docs](https://code.visualstudio.com/docs/copilot/customization/overview) explain *how* to create instructions, prompts, agents, and skills.

But you're stuck at: **"Which one do I use for THIS problem?"**

This post gives you a **decision framework**: one question that leads you to the right layer.

---

## The One-Question Framework

Ask yourself: **"How often and in what context does this apply?"**

```
┌─────────────────────────────────────────────┐
│ ALWAYS, in all chat interactions            │
│ → Instructions                              │
│   Example: "Use TypeScript strict mode"    │
├─────────────────────────────────────────────┤
│ REPEATEDLY, when I invoke it                │
│ → Prompt Files                              │
│   Example: "Scaffold component + tests"    │
├─────────────────────────────────────────────┤
│ CONDITIONALLY, for specific roles           │
│ → Custom Agents                             │
│   Example: "Planning specialist (read-only)"│
├─────────────────────────────────────────────┤
│ WORKFLOWS with executable scripts           │
│ → Agent Skills                              │
│   Example: "Run tests + linting + format"  │
└─────────────────────────────────────────────┘
```

Let's see how to recognize when you need each layer.

---

## Layer 1: Instructions

### Recognition Signals
- ✅ You repeat this **in every chat**
- ✅ It's a **guideline or rule**, not a task
- ✅ New developers need to know this

### The 1-Second Test
> "Is this a coding standard we always follow?"

If yes → Instruction.

### Example
```markdown
# .github/copilot-instructions.md
- Use TypeScript strict mode
- Prefer async/await over promises
- Include JSDoc for public functions
```

**Usage**: Automatic (or manual include). Never invoke directly.

### Boundaries
- ❌ NOT for specific tasks ("Create user profile component")
- ❌ NOT for conditional behavior ("Only plan, don't code")
- ❌ NOT for workflows ("Run tests then lint")

**Best for**: Coding practices, tech preferences, code review rules, commit message format.

---

## Layer 2: Prompt Files

### Recognition Signals
- ✅ You do this **exact task 2-3+ times**
- ✅ It's **multi-step** scaffolding
- ✅ You copy-paste the description

### The 1-Second Test
> "Do I keep explaining this same workflow?"

If yes → Prompt File.

### Example
```markdown
# .github/prompts/create-component.prompt.md
Create a React component with:
- TypeScript props interface
- JSDoc documentation
- Test file with React Testing Library
- Accessibility attributes
```

**Usage**: `#create-component Button with label, onClick, loading`

### Boundaries
- ❌ NOT for general rules ("Use strict types")
- ❌ NOT for role-based behavior ("Only review code")
- ❌ NOT for workflows with scripts

**Best for**: Component scaffolding, endpoint generation, test creation, migration steps.

---

## Layer 3: Custom Agents

### Recognition Signals
- ✅ You need a **specialist for a specific role**
- ✅ You want **limited scope** (read-only, frontend-only)
- ✅ Different **phases** need different behavior (plan vs implement)

### The 1-Second Test
> "Do I need Copilot to act like a specialist with specific constraints?"

If yes → Custom Agent.

### Example
```markdown
# .github/agents/planner.agent.md
You are a planning specialist.

Constraints:
- READ-ONLY: Never write code
- Create implementation plans only
- Include risks and effort estimates
```

**Usage**: `@planner how should we add authentication?`

Result: Detailed plan, no code. Perfect for approval gates.

### Boundaries
- ❌ NOT for task templates ("Generate component")
- ❌ NOT for general rules ("Use strict types")
- ❌ NOT for workflows with scripts

**Best for**: Planning phase, research mode, frontend-only work, security review, architecture analysis.

---

## Layer 4: Agent Skills

### Recognition Signals
- ✅ You have **executable scripts/workflows**
- ✅ It's a **specialized capability** (not just guidelines)
- ✅ You want **portability** across tools (VS Code, CLI, GitHub coding agent)

### The 1-Second Test
> "Does this workflow run actual scripts or tools?"

If yes → Agent Skill.

### Example
```
.github/skills/pre-commit-check/
├── SKILL.md (instructions)
├── scripts/check_all.sh (executable)
└── references/quality-standards.md (docs)
```

**Usage**: `@pre-commit-check`

Result: Runs type checking, linting, tests, reports issues.

### Boundaries
- ❌ NOT for task templates without scripts ("Generate component")
- ❌ NOT for guidelines ("Use strict types")
- ❌ NOT for behavior constraints ("Read-only mode")

**Best for**: Testing workflows, deployment checks, migration processes, code quality gates.

**Note**: Preview feature (VS Code Insiders). Open standard (agentskills.io).

---

## Quick Reference: The Master Table

| Question | Layer | Example | Invoke |
|----------|-------|---------|--------|
| **"Is this a standard we always follow?"** | Instruction | "Use TypeScript strict mode" | Auto/Manual |
| **"Do I repeat this task 2-3+ times?"** | Prompt File | "Scaffold component + tests" | `#name` |
| **"Do I need a specialist with constraints?"** | Custom Agent | "Planner (read-only)" | `@name` |
| **"Does this run scripts/tools?"** | Agent Skill | "Pre-commit checks" | `@name` |

### Common Scenarios (10-Second Lookup)

| I Need To... | Use | Why |
|--------------|-----|-----|
| Enforce async/await everywhere | Instruction | Standard |
| Define commit message format | Instruction | Guideline |
| Generate React components | Prompt File | Repeatable task |
| Create API endpoints | Prompt File | Task template |
| Plan before implementing | Custom Agent | Phase-specific role |
| Frontend-only assistance | Custom Agent | Scoped specialist |
| Run tests + lint + format | Agent Skill | Executable workflow |
| Database migration process | Agent Skill | Scripts + docs |

### Decision Flowchart

```
Need Copilot to do something?
│
├─ Is it a STANDARD/RULE?
│  └─ Yes → Instruction
│
├─ Is it a TASK I repeat 2-3+ times?
│  └─ Yes → Prompt File
│
├─ Do I need a SPECIALIST ROLE?
│  └─ Yes → Custom Agent
│
└─ Does it RUN SCRIPTS?
   └─ Yes → Agent Skill
```

---

## Real-World Decision Examples

### "Use Strict Types"
- ❌ Prompt: Would need to invoke every time
- ✅ **Instruction**: Standard that always applies

### "Create React Components"
- ❌ Instruction: Too specific for a general rule
- ✅ **Prompt File**: Repeatable task with consistent structure

### "Plan Architecture First"
- ❌ Instruction: Would interfere when you want code
- ❌ Prompt: Plans aren't templates, each is unique
- ✅ **Custom Agent**: Phase-specific behavior (read-only mode)

### "Pre-Commit Quality Checks"
- ❌ Instruction: Doesn't actually run anything
- ❌ Prompt: Need to execute scripts, not generate code
- ✅ **Agent Skill**: Bundles executable scripts with docs

---

## Start Using the Framework

### Step 1: Learn by Doing
**[gh-copilot-lab](https://github.com/prasann/gh-copilot-lab)** - 30-minute hands-on exercises

Each exercise teaches **when to use** that layer through practical examples.

### Step 2: Apply to Your Project
Ask yourself for each need:
1. "How often does this apply?" → Pick your layer
2. Create ONE customization
3. Use it for a week
4. Repeat

### Step 3: Remember the One Question
> "How often and in what context does this apply?"

- Always → Instruction
- Repeatedly → Prompt File  
- Conditionally → Custom Agent
- Workflow → Agent Skill

---

## Summary

You now have a **decision framework**:

```
The real question isn't "How do I create these?"
The real question is "Which one solves THIS problem?"
```

**One question. Four answers. Clear boundaries.**

Use the Master Table when you're stuck. Check the examples when unsure. Trust the framework.

---

## Resources

- **[gh-copilot-lab](https://github.com/prasann/gh-copilot-lab)** - Hands-on practice
- **[VS Code Docs](https://code.visualstudio.com/docs/copilot/customization/overview)** - How to implement
- **[agentskills.io](https://agentskills.io)** - Skills open standard

**Questions?** [Open an issue](https://github.com/prasann/gh-copilot-lab/issues)
