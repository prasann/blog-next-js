# VSCode GitHub Copilot Management - Blog Post Plan

## Research Summary

Based on the official VSCode documentation, there are 6 main customization options:

1. **Custom Instructions** - Project-wide guidelines for code generation, reviews, commit messages
2. **Agent Skills (Preview)** - Self-contained packages (SKILL.md + scripts/references/assets) following open standard
3. **Prompt Files** - Standalone, reusable prompts for repetitive tasks
4. **Custom Agents** - Specialist assistants for specific roles (planner, researcher, frontend dev)
5. **Language Models** - Choose different AI models for different tasks
6. **MCP and Tools** - Connect external services and specialized tools

---

## The Use Case: Full-Stack TypeScript + Python Project

**Project**: An analytics platform with:
- **Frontend**: React + TypeScript (Next.js)
- **Backend API**: Python FastAPI
- **Shared**: Data models, API contracts, common utilities
- **Infrastructure**: Docker, migrations, deployment scripts

This is a realistic project where multiple languages, patterns, and workflows need to be managed consistently.

---

## Blog Post Structure

### Introduction: The Problem

You're working on a full-stack project. Your frontend team works in TypeScript, your backend in Python. You have coding standards, repetitive tasks, complex workflows, and specialized contexts.

Without structure, every developer has to:
- Re-explain your coding standards to Copilot every time
- Copy-paste the same prompts for common tasks
- Context-switch between different mental models

**The question**: How do you organize Copilot customizations to match your project structure?

---

### Layer 1: Custom Instructions - Project Coding Standards

**What problem does this solve?**
Your TypeScript code uses strict mode, functional patterns, and Zod validation. Your Python code follows FastAPI conventions, uses Pydantic models, and has specific error handling patterns. Without instructions, Copilot suggests inconsistent code.

**What goes here:** Language-specific coding standards that should ALWAYS apply

**Implementation for our project:**

```
analytics-platform/
├── .github/
│   ├── copilot-instructions.md          # Project-wide rules
│   ├── frontend-instructions.md         # TypeScript/React rules
│   └── api-instructions.md              # Python/FastAPI rules
```

**Content examples:**

`.github/copilot-instructions.md` (applies everywhere):
```markdown
- Write clear, maintainable code with descriptive variable names
- Include error handling for all external operations
- Add JSDoc/docstrings for public functions
- Write unit tests for business logic
```

`.github/frontend-instructions.md` (applies to `frontend/**`):
```markdown
- Use TypeScript strict mode
- Prefer functional components with React hooks
- Use Zod for runtime validation
- Follow React Query for data fetching
- CSS: Use Tailwind utility classes
- Testing: Jest + React Testing Library
```

`.github/api-instructions.md` (applies to `backend/**`):
```markdown
- Use FastAPI with async/await
- Define Pydantic models for request/response
- Include OpenAPI documentation
- Use dependency injection for services
- Testing: pytest with fixtures
- Error handling: Use HTTPException with proper status codes
```

**When to use:** Set this up first - it's your foundation. These are the rules you'd tell a new team member.

---

### Layer 2: Prompt Files - Repetitive Development Tasks

**What problem does this solve?**
You keep creating similar structures: new API endpoints, new React components, integration tests, database migrations. Each time you have to explain the same multi-step process.

**What goes here:** Task templates for common scaffolding and generation

**Implementation for our project:**

```
analytics-platform/
├── .prompts/
│   ├── create-api-endpoint.prompt.md
│   ├── create-react-page.prompt.md
│   ├── add-database-model.prompt.md
│   └── write-integration-test.prompt.md
```

**Content examples:**

`.prompts/create-api-endpoint.prompt.md`:
```markdown
Create a new FastAPI endpoint with the following structure:

1. **Router** in `backend/api/routes/{domain}.py`
   - Add new route with appropriate HTTP method
   - Include request/response models

2. **Pydantic Models** in `backend/api/models/{domain}.py`
   - Request model with validation
   - Response model

3. **Service Layer** in `backend/services/{domain}_service.py`
   - Business logic implementation
   - Error handling

4. **Tests** in `backend/tests/test_{domain}.py`
   - Test success case
   - Test validation errors
   - Test edge cases

Follow the patterns in existing endpoints for consistency.
```

`.prompts/create-react-page.prompt.md`:
```markdown
Create a new Next.js page with:

1. **Page Component** in `frontend/app/{path}/page.tsx`
   - TypeScript with proper types
   - Server component by default (use 'use client' if needed)
   - Loading and error states

2. **Data Fetching** using React Query hooks in `frontend/hooks/use{Entity}.ts`
   - Proper typing with Zod schemas
   - Error handling

3. **UI Components** in `frontend/components/{domain}/`
   - Reusable presentational components
   - Tailwind styling

4. **Tests** in `frontend/__tests__/{path}.test.tsx`
   - Render test
   - Interaction tests

Include proper SEO metadata.
```

**When to use:** After you've done the same task 2-3 times manually, create a prompt file.

---

### Layer 3: Custom Agents - Specialized Roles & Contexts

**What problem does this solve?**
Sometimes you need different "modes": planning without implementation, frontend-only work, or specialized knowledge. Regular Copilot tries to do everything.

**What goes here:** Role-specific agents with limited scope or specialized focus

**Implementation for our project:**

```
analytics-platform/
├── .github/copilot/agents/
│   ├── architect.agent.md
│   ├── frontend-dev.agent.md
│   ├── api-dev.agent.md
│   └── data-engineer.agent.md
```

**Content examples:**

`.github/copilot/agents/architect.agent.md`:
```markdown
You are a software architect for planning and analysis.

**Your role:**
- Analyze code structure and patterns
- Create implementation plans and technical designs
- Identify risks and dependencies
- Suggest architectural improvements

**Constraints:**
- READ-ONLY: You cannot edit files directly
- Always provide detailed reasoning
- Consider both frontend and backend implications
- Include effort estimates

**Output format:**
Markdown documents with sections: Overview, Current State, Proposed Changes, Risks, Implementation Steps
```

`.github/copilot/agents/frontend-dev.agent.md`:
```markdown
You are a frontend specialist focused on React/TypeScript/Next.js.

**Your expertise:**
- React 18+ patterns and best practices
- TypeScript strict typing
- Next.js App Router
- Tailwind CSS
- React Query for state management
- Accessibility (WCAG 2.1)

**Scope:**
- Only work with files in frontend/
- Cannot modify backend or infrastructure code
- Focus on user experience and performance

**Preferred tools:**
- Component testing with React Testing Library
- Type safety with Zod
- Performance profiling
```

`.github/copilot/agents/api-dev.agent.md`:
```markdown
You are a backend API specialist focused on Python/FastAPI.

**Your expertise:**
- FastAPI patterns and async programming
- Pydantic validation
- Database design with SQLAlchemy
- API design (REST, OpenAPI)
- Authentication and authorization

**Scope:**
- Only work with files in backend/
- Cannot modify frontend code
- Focus on API design, performance, and security

**Preferred tools:**
- pytest for testing
- Alembic for migrations
- Redis for caching
```

**When to use:** When you need context-specific assistance or want to limit scope (e.g., "ask architect for plan first, then implement").

---

### Layer 4: Agent Skills - Complex Workflows with Executable Logic

**What problem does this solve?**
Some workflows are complex and need actual executable scripts, not just instructions. Examples: database migrations, deployment checks, data processing. You need to bundle instructions + scripts + documentation together.

**What goes here:** Complete workflow packages with executable code

**Implementation for our project:**

```
analytics-platform/
├── .skills/
│   ├── database-migration/
│   │   ├── SKILL.md
│   │   ├── scripts/
│   │   │   ├── generate_migration.py
│   │   │   ├── validate_migration.py
│   │   │   └── rollback_migration.py
│   │   └── references/
│   │       └── migration-patterns.md
│   │
│   ├── deployment-prep/
│   │   ├── SKILL.md
│   │   ├── scripts/
│   │   │   ├── run_checks.sh
│   │   │   ├── verify_env.py
│   │   │   └── build_containers.sh
│   │   └── references/
│   │       └── deployment-checklist.md
│   │
│   └── data-sync/
│       ├── SKILL.md
│       ├── scripts/
│       │   ├── sync_postgres_to_clickhouse.py
│       │   └── validate_sync.py
│       └── references/
│           └── data-schema.md
```

**Content examples:**

`.skills/database-migration/SKILL.md`:
```markdown
---
name: database-migration
description: Complete workflow for creating, validating, and running database migrations for the analytics platform. Includes Alembic migration generation, validation scripts, and rollback procedures. Use when adding/modifying database schemas.
---

# Database Migration Workflow

## Overview
Guides through safe database schema changes with validation and rollback support.

## Workflow

1. **Generate Migration**
   - Run `scripts/generate_migration.py --message "description"`
   - Creates Alembic migration file
   - Auto-generates upgrade/downgrade logic

2. **Validate Migration**
   - Run `scripts/validate_migration.py`
   - Checks for common issues (missing indexes, FK constraints)
   - Validates against production schema

3. **Apply to Dev**
   - Test locally first
   - Verify data integrity

4. **Rollback if Needed**
   - Use `scripts/rollback_migration.py`
   - Includes data backup instructions

## References
See `references/migration-patterns.md` for:
- Common migration patterns
- Performance considerations
- Breaking change guidelines
```

`.skills/deployment-prep/SKILL.md`:
```markdown
---
name: deployment-prep
description: Pre-deployment verification workflow for the analytics platform. Runs test suites, checks database migrations, validates environment configs, and builds Docker containers. Use before deploying to staging or production.
---

# Deployment Preparation

## Overview
Automated checks to ensure safe deployment.

## Pre-deployment Checklist

1. **Run Full Test Suite**
   ```bash
   scripts/run_checks.sh --full
   ```
   - Frontend tests (Jest)
   - Backend tests (pytest)
   - Integration tests
   - Type checking

2. **Verify Environment**
   ```bash
   scripts/verify_env.py --environment production
   ```
   - Checks all required env vars
   - Validates secrets rotation
   - Confirms service availability

3. **Build Containers**
   ```bash
   scripts/build_containers.sh --tag $(git rev-parse HEAD)
   ```
   - Builds frontend + backend images
   - Runs security scanning
   - Pushes to registry

4. **Migration Check**
   - Verifies pending migrations
   - Ensures backward compatibility

## Rollback Plan
See `references/deployment-checklist.md`


**When to use:** When you need executable scripts as part of the workflow. Skills are portable across VSCode, GitHub CLI, and Claude (open standard).

---

## Decision Framework: What Goes Where?

### For Our TypeScript + Python Project

| Scenario | Component | Location | Why |
|----------|-----------|----------|-----|
| "Always use async/await in Python" | Custom Instructions | `.github/api-instructions.md` | Applies to all backend code |
| "TypeScript strict mode" | Custom Instructions | `.github/frontend-instructions.md` | Applies to all frontend code |
| Creating new API endpoints | Prompt File | `.prompts/create-api-endpoint.prompt.md` | Repetitive multi-step task |
| Creating React pages | Prompt File | `.prompts/create-react-page.prompt.md` | Repetitive with consistent pattern |
| Planning refactors | Custom Agent | `.github/copilot/agents/architect.agent.md` | Need analysis without changes |
| Frontend-only work | Custom Agent | `.github/copilot/agents/frontend-dev.agent.md` | Limited scope, specialized |
| Database migrations | Agent Skill | `.skills/database-migration/` | Needs executable scripts + docs |
| Deployment checks | Agent Skill | `.skills/deployment-prep/` | Complex workflow with scripts |

---

## Implementation Order (Start Here)

### Phase 1: Foundation (Week 1)
1. Set up Custom Instructions for TypeScript and Python standards
2. Test with a few code generation tasks to verify

### Phase 2: Efficiency (Week 2-3)
3. Identify repetitive tasks (track what you do 2+ times)
4. Create Prompt Files for the most common tasks
5. Share with team

### Phase 3: Specialization (Month 2)
6. Create Custom Agents for different contexts
7. Use architect agent for planning, dev agents for implementation

### Phase 4: Automation (Month 3+)
8. Build Agent Skills for complex workflows with scripts

**Don't skip phases!** Each layer builds on the previous one.

---

## Complete Repository Structure

```
analytics-platform/                        # Full-stack TypeScript + Python project
│
├── frontend/                              # Next.js + React + TypeScript
│   ├── app/
│   ├── components/
│   └── ...
│
├── backend/                               # FastAPI + Python
│   ├── api/
│   ├── services/
│   └── ...
│
├── .github/
│   ├── copilot-instructions.md           # General: error handling, testing, docs
│   ├── frontend-instructions.md          # TS/React: strict mode, hooks, Zod
│   ├── api-instructions.md               # Python/FastAPI: async, Pydantic, OpenAPI
│   └── copilot/
│       └── agents/
│           ├── architect.agent.md        # Read-only planning
│           ├── frontend-dev.agent.md     # React/TS specialist
│           ├── api-dev.agent.md          # FastAPI/Python specialist
│           └── data-engineer.agent.md    # Database/analytics specialist
│
├── .prompts/
│   ├── create-api-endpoint.prompt.md     # FastAPI: route + model + service + tests
│   ├── create-react-page.prompt.md       # Next.js: page + hooks + components + tests
│   ├── add-database-model.prompt.md      # SQLAlchemy: model + migration + service
│   └── write-integration-test.prompt.md  # E2E: frontend + backend + DB
│
└── .skills/                               # VS Code Insiders only
    ├── database-migration/
    │   ├── SKILL.md                       # Migration workflow
    │   ├── scripts/
    │   │   ├── generate_migration.py      # Alembic wrapper
    │   │   ├── validate_migration.py      # Safety checks
    │   │   └── rollback_migration.py      # Undo logic
    │   └── references/
    │       └── migration-patterns.md      # Common patterns & gotchas
    │
    ├── deployment-prep/
    │   ├── SKILL.md                       # Pre-deploy workflow
    │   ├── scripts/
    │   │   ├── run_checks.sh              # Test suite runner
    │   │   ├── verify_env.py              # Env var validator
    │   │   └── build_containers.sh        # Docker build + scan
    │   └── references/
    │       └── deployment-checklist.md    # Manual steps
    │
    └── data-sync/
        ├── SKILL.md                       # Analytics data pipeline
        ├── scripts/
        │   ├── sync_postgres_to_clickhouse.py
        │   └── validate_sync.py
        └── references/
            └── data-schema.md             # Schema documentation
```

---

## Key Principles

1. **Layer by Complexity**: Instructions (passive rules) → Prompts (task templates) → Agents (specialized roles) → Skills (executable workflows)

2. **Match Component to Use Case**:
   - Coding standards → Instructions
   - Repetitive tasks → Prompts
   - Context-specific work → Agents
   - Complex workflows + scripts → Skills

3. **Start with Instructions**: They're the foundation. Don't build prompts on top of inconsistent code.

4. **Language-Specific Files**: Use glob patterns (frontend-instructions.md, api-instructions.md) for multi-language projects

5. **Skills are Portable**: They follow an open standard (agentskills.io), work across VSCode, GitHub CLI, Claude

6. **Progressive Adoption**: You don't need everything at once. Add components as pain points emerge.

---

## Real-World Usage Examples

### Scenario 1: Adding a New Analytics Feature

**Task**: Add user activity tracking

**Workflow**:
1. Ask **architect agent** to analyze and create plan
2. Use **create-api-endpoint** prompt to generate FastAPI endpoint
3. Use **create-react-page** prompt to generate frontend dashboard
4. Use **add-database-model** prompt to add tracking table
5. Run **database-migration** skill to generate and validate migration
6. Use **write-integration-test** prompt for E2E test

Throughout all steps, **Custom Instructions** ensure consistent coding standards.

### Scenario 2: Production Deployment

**Task**: Deploy v2.0 to production

**Workflow**:
1. Run **deployment-prep** skill
   - Executes `scripts/run_checks.sh` (all tests)
   - Executes `scripts/verify_env.py` (env validation)
   - Executes `scripts/build_containers.sh` (Docker builds)
2. Skill validates pending migrations
3. Generates deployment checklist
4. Review and deploy

### Scenario 3: Daily Development

**Task**: Fix a bug in user authentication

**Workflow**:
1. Use **api-dev agent** (stays in backend context)
2. Agent suggests fix following FastAPI patterns (from instructions)
3. Generate test with **write-integration-test** prompt

### Scenario 4: Data Pipeline Work

**Task**: Sync new analytics data

**Workflow**:
1. Use **data-engineer agent** (specialized knowledge)
2. Run **data-sync** skill
   - Executes `scripts/sync_postgres_to_clickhouse.py`
   - References `data-schema.md` for column mappings
   - Validates with `scripts/validate_sync.py`

---

## The Result

### Before Organization:
- Inconsistent code styles between developers
- Repeatedly explaining the same patterns
- Copy-pasting complex workflows
- Context switching between languages

### After Organization:
- **Instructions**: Copilot knows TypeScript and Python standards automatically
- **Prompts**: Common tasks (endpoints, pages, migrations) are one command
- **Agents**: Use specialized agents for specific contexts
- **Skills**: Complex workflows are automated with scripts
- **Onboarding**: New developers inherit all this structure

**The benefit**: Your Copilot customizations are documentation, automation, and consistency—all in one.

---

## Sample Repository Plan

Create a public GitHub repo: `copilot-management-demo`

**Structure**:
- Working TypeScript + Python project (simplified analytics platform)
- All Copilot customization files in place
- README with explanations
- Example workflows documented
- Before/after examples

**Key files to include**:
1. All instruction files with real rules
2. 3-4 prompt files for common tasks
3. 3-4 custom agents
4. 1-2 complete agent skills with working scripts
5. Documentation showing when to use each

**Bonus**: Video walkthrough showing:
- How each component triggers
- Real usage scenarios
- Developer workflow

---

## Blog Post Outline (Final)

1. **Introduction**: The multi-language project challenge
2. **The Use Case**: Analytics platform (TypeScript + Python)
3. **Layer 1**: Custom Instructions (coding standards)
4. **Layer 2**: Prompt Files (repetitive tasks)
5. **Layer 3**: Custom Agents (specialized roles)
6. **Layer 4**: Agent Skills (complex workflows)
7. **Decision Framework**: What goes where
8. **Real-World Scenarios**: Four complete examples
9. **Implementation Order**: How to adopt progressively
10. **Complete Repository Structure**: Visual reference
11. **Conclusion**: The organized Copilot experience

**Tone**: Technical but practical, focus on "why this here" not just "how to set up"
