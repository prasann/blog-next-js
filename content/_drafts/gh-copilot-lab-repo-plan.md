# gh-copilot-lab Repository Enhancement Plan

**Repo**: https://github.com/prasann/gh-copilot-lab  
**Goal**: Keep exercises as standalone learning modules + Add structure to support blog post narrative

---

## Current State ✅

```
.github/
├── agents/              # Custom agents
├── instructions/        # Custom instructions
├── prompts/            # Prompt files
├── skills/             # Agent skills
└── copilot-instructions.md

exercises/              # Learning exercises
├── 01-instructions.md
├── 02-prompts.md
└── 03-agents.md

README.md
QUICK_REFERENCE.md
```

**What works**: Exercises are clear, standalone learning modules that teach concepts well.

---

## Enhancement Strategy

### Principle: Dual Purpose
The repo should serve TWO audiences:

1. **Learners**: Complete exercises to understand concepts (30-40 min)
2. **Blog Readers**: See real-world examples and reference implementations

**How**: Add working code examples WITHOUT changing the exercise flow.

---

## Changes to Make

### 1. Add Working Code Examples

**New Directory**:
```
examples/                    # NEW - Reference implementations
├── todo-app/               # Simple full-stack app
│   ├── frontend/           # TypeScript/React
│   │   ├── components/
│   │   │   ├── TodoList.tsx
│   │   │   ├── TodoItem.tsx
│   │   │   └── AddTodo.tsx
│   │   ├── hooks/
│   │   │   └── useTodos.ts
│   │   └── utils/
│   │       └── validation.ts
│   │
│   └── backend/            # Python/FastAPI
│       ├── api/
│       │   └── routes/
│       │       └── todos.py
│       ├── models/
│       │   └── todo.py
│       └── services/
│           └── todo_service.py
│
├── README.md              # Explains the example app
└── package.json           # Dependencies for reference
```

**Why Todo App**: 
- Simple enough to understand quickly
- Complex enough to show real patterns
- Frontend + Backend demonstrates multi-language customization
- Everyone understands the domain

**Purpose**: Gives concrete context for where customizations apply

---

### 2. Enhance Instruction Files

**Current**: 
- `.github/copilot-instructions.md` exists but is basic

**Add**:
```
.github/
├── copilot-instructions.md           # ENHANCE - Project-wide rules
├── frontend-instructions.md          # NEW - TypeScript/React patterns
└── backend-instructions.md           # NEW - Python/FastAPI patterns
```

#### `.github/copilot-instructions.md` (Enhanced)
```markdown
# Project-Wide Coding Standards

## Code Quality
- Write clear, maintainable code with descriptive names
- Add error handling for all external operations
- Include documentation for public functions
- Write tests for business logic

## Version Control
- Write clear, descriptive commit messages
- Keep changes focused and atomic
- Add context in PR descriptions

## Testing
- Unit tests for business logic
- Integration tests for API endpoints
- Tests should be readable as documentation
```

#### `.github/frontend-instructions.md` (New)
```markdown
---
applies_to:
  - "examples/todo-app/frontend/**"
---

# Frontend Development Standards

## TypeScript
- Use strict mode always
- Define explicit types for props and state
- Avoid `any` - use `unknown` if type is truly unknown
- Export types alongside components

## React Patterns
- Prefer functional components with hooks
- Use composition over prop drilling
- Custom hooks for reusable logic
- Controlled components for forms
- Error boundaries for async operations

## Code Organization
- One component per file
- Co-locate tests with components
- Group by feature, not by type

## Testing
- Use React Testing Library
- Test user behavior, not implementation details
- Mock API calls in component tests
```

#### `.github/backend-instructions.md` (New)
```markdown
---
applies_to:
  - "examples/todo-app/backend/**"
---

# Backend Development Standards

## Python
- Use type hints for all function signatures
- Prefer async/await for I/O operations
- Follow PEP 8 (100-char line length)
- Use pathlib for file operations

## FastAPI Patterns
- Use dependency injection for services
- Define Pydantic models for all request/response
- Include docstrings for OpenAPI docs
- Use router prefixes for versioning

## Error Handling
- Use HTTPException with proper status codes
- Log errors with contextual information
- Return consistent error response format
- Don't expose internal details in error messages

## Database
- Use async database drivers
- Always use parameterized queries
- Handle connection pooling properly
- Close resources in finally blocks
```

---

### 3. Add Production-Ready Prompt Examples

**Current**: Basic prompts exist  
**Enhance**: Add complete, realistic prompts that work with example code

**New/Enhanced Prompts**:
```
.github/prompts/
├── create-component.prompt.md        # ENHANCE - React component
├── create-endpoint.prompt.md         # ENHANCE - FastAPI endpoint
├── add-validation.prompt.md          # NEW - Add Zod/Pydantic validation
├── write-test.prompt.md              # NEW - Generate tests
└── add-error-handling.prompt.md      # NEW - Add error handling
```

#### Example: `.github/prompts/create-component.prompt.md`
```markdown
---
name: Create React Component
description: Generate a new React component with TypeScript, tests, and documentation
---

Create a new React component following our project standards:

## Component File
Location: `examples/todo-app/frontend/components/{ComponentName}.tsx`

Include:
- TypeScript interface for props
- Functional component with proper typing
- JSDoc comment explaining purpose and usage
- Export both component and prop type interface
- Handle loading and error states if async

## Test File
Location: `examples/todo-app/frontend/components/{ComponentName}.test.tsx`

Include:
- Render test with default props
- Prop validation tests
- User interaction tests (if interactive)
- Error state tests (if applicable)
- Accessibility checks (aria labels, keyboard navigation)

## Implementation
- Follow existing component patterns in the codebase
- Use our custom hooks for common functionality
- Ensure responsive design with Tailwind classes
- Add proper TypeScript types (no `any`)

## Documentation
In the JSDoc, include:
- Brief description of component purpose
- Props explanation
- Usage example with code snippet
```

---

### 4. Create Specialized Agent Examples

**Current**: Basic agents exist  
**Enhance**: Add clear, role-specific agents with examples

**New/Enhanced Agents**:
```
.github/agents/
├── planner.agent.md          # ENHANCE - Planning specialist
├── frontend-dev.agent.md     # NEW - React/TS specialist
├── backend-dev.agent.md      # NEW - Python/FastAPI specialist
└── code-reviewer.agent.md    # NEW - Review assistant
```

#### Example: `.github/agents/frontend-dev.agent.md`
```markdown
---
name: Frontend Developer
description: Specialist for React and TypeScript development
---

You are a frontend development specialist focused on React, TypeScript, and modern web practices.

## Your Expertise
- React 18+ patterns (hooks, concurrent features, suspense)
- TypeScript strict typing and advanced types
- Component composition and reusability
- State management (useState, useReducer, context)
- Performance optimization (memo, useMemo, useCallback)
- Accessibility (WCAG 2.1, ARIA, semantic HTML)
- CSS with Tailwind utility classes
- Testing with React Testing Library

## Your Scope
**Can Work On**:
- Files in `examples/todo-app/frontend/`
- Component implementation and architecture
- Frontend testing strategies
- UI/UX improvements
- Performance optimizations

**Cannot Work On**:
- Backend code or API implementation
- Database schemas
- Infrastructure or deployment configs

## Your Approach
1. Always consider accessibility from the start
2. Favor composition over complexity
3. Write components that are easy to test
4. Consider mobile/responsive design
5. Think about loading and error states
6. Use TypeScript strictly (no `any`)

## Tools You Prefer
- React Testing Library for component tests
- TypeScript for type safety
- ESLint for code quality
- Tailwind for styling

## Example Interactions
- "Create a reusable Modal component with accessibility"
- "Optimize this component for performance"
- "Add error handling to this form"
- "Review this component for accessibility issues"
```

---

### 5. Add Complete Working Skill

**Current**: Skills directory exists but empty/basic  
**Add**: One fully functional skill with scripts

**New Skill**:
```
.github/skills/
└── pre-commit-check/
    ├── SKILL.md
    ├── scripts/
    │   ├── check_frontend.sh    # TypeScript, ESLint, tests
    │   ├── check_backend.sh     # Python, Ruff, pytest
    │   └── check_all.sh         # Runs both
    └── references/
        └── quality-standards.md
```

#### `.github/skills/pre-commit-check/SKILL.md`
```markdown
---
name: pre-commit-check
description: Automated pre-commit checks for code quality. Runs linting, type checking, and tests for both frontend and backend. Use before committing code.
---

# Pre-Commit Quality Check

## Overview
Automated checks to catch issues before they hit the repo. Runs linting, type checking, formatting, and tests for both frontend and backend.

## Workflow

### 1. Check Frontend
```bash
scripts/check_frontend.sh
```

Runs:
- TypeScript type checking (`tsc --noEmit`)
- ESLint for code quality
- Prettier for formatting
- React Testing Library tests
- Reports: Type errors, lint issues, test failures

### 2. Check Backend
```bash
scripts/check_backend.sh
```

Runs:
- Python type hints validation (`mypy`)
- Ruff for linting and formatting
- pytest for tests
- Reports: Type errors, lint issues, test failures

### 3. Check Everything
```bash
scripts/check_all.sh
```

Runs both frontend and backend checks in sequence. Fails fast on first error.

## Exit Codes
- `0` - All checks passed
- `1` - Type errors found
- `2` - Lint/format issues found
- `3` - Tests failed

## References
See `references/quality-standards.md` for:
- Code quality guidelines
- How to fix common issues
- When to skip certain checks
- CI/CD integration examples

## Usage Tips
- Run `check_all.sh` before committing
- Use in git pre-commit hook
- Integrate into CI pipeline
- Fix issues incrementally
```

---

### 6. Add New Documentation

**New Files**:

#### `ARCHITECTURE.md`
```markdown
# Architecture: How Customizations Work Together

This document explains how the different Copilot customization layers work together in this repository.

## The Four Layers

### 1. Instructions (Automatic)
**What**: Rules that always apply  
**Location**: `.github/*-instructions.md`  
**When**: Writing any code

Instructions are passive - Copilot automatically considers them when generating code.

**Example**: TypeScript strict mode is enforced via `frontend-instructions.md`

### 2. Prompts (On-Demand)
**What**: Reusable task templates  
**Location**: `.github/prompts/*.prompt.md`  
**When**: Performing repetitive tasks

Prompts are active - you invoke them with `#prompt-name` in Copilot chat.

**Example**: Use `#create-component` to scaffold a new React component

### 3. Agents (Specialized)
**What**: Role-specific assistants  
**Location**: `.github/agents/*.agent.md`  
**When**: Different contexts need different behaviors

Agents are contextual - you invoke them with `@agent-name` in Copilot chat.

**Example**: Use `@frontend-dev` for UI work, `@backend-dev` for API work

### 4. Skills (Portable)
**What**: Workflow packages with scripts  
**Location**: `.github/skills/*/SKILL.md`  
**When**: Complex processes need executable logic

Skills are portable - they work in VS Code, GitHub CLI, and Claude.

**Example**: Use `@pre-commit-check` to run all quality checks

## How They Interact

### Scenario: Adding a New Feature

1. **@planner** (Agent) - Creates implementation plan
2. **Instructions** - Ensures consistent code style automatically
3. **#create-component** (Prompt) - Generates frontend component
4. **#create-endpoint** (Prompt) - Generates backend endpoint
5. **@frontend-dev** (Agent) - Refines UI implementation
6. **@backend-dev** (Agent) - Optimizes API logic
7. **@pre-commit-check** (Skill) - Validates everything before commit

Each layer has a specific job. They complement, not replace, each other.

## Decision Tree

```
Need to...
├─ Enforce a standard → Instructions
├─ Repeat a task → Prompt
├─ Change context → Agent
└─ Run a workflow → Skill
```

## Learning Path

1. Start with **Exercises** to understand concepts
2. Explore **Instructions** to see automatic rules
3. Try **Prompts** for common tasks
4. Use **Agents** for specialized work
5. Run **Skills** for complex workflows
```

#### `examples/README.md`
```markdown
# Example: Todo App

A simple full-stack todo application demonstrating GitHub Copilot customizations in action.

## Structure

- **Frontend**: React + TypeScript + Tailwind
- **Backend**: FastAPI + Python + Pydantic
- **Database**: In-memory (for simplicity)

## Purpose

This example shows how customizations apply to real code:

### Instructions in Action
- `frontend-instructions.md` enforces TypeScript strict mode
- `backend-instructions.md` ensures async/await patterns
- `copilot-instructions.md` applies project-wide standards

### Prompts Available
- `#create-component` - Generate new React components
- `#create-endpoint` - Scaffold FastAPI endpoints
- `#add-validation` - Add input validation
- `#write-test` - Generate test cases

### Agents to Use
- `@frontend-dev` - For React/TypeScript work
- `@backend-dev` - For Python/FastAPI work
- `@planner` - To plan new features

### Skills to Run
- `@pre-commit-check` - Validate code before committing

## Try It Yourself

1. **Ask Copilot to create a new todo component**:
   ```
   #create-component TodoFilter with buttons for All, Active, Completed
   ```

2. **Use an agent for specialized work**:
   ```
   @frontend-dev optimize TodoList component for performance
   ```

3. **Run quality checks**:
   ```
   @pre-commit-check
   ```

## Not Production Ready

This is a teaching example. For production:
- Add real database
- Implement authentication
- Add comprehensive error handling
- Set up proper CI/CD
- Add logging and monitoring
```

#### `TROUBLESHOOTING.md`
```markdown
# Troubleshooting Guide

Common issues when working with Copilot customizations.

## Instructions Not Applying

**Problem**: Copilot isn't following instructions  
**Solutions**:
- Verify file is in `.github/` directory
- Check YAML frontmatter syntax (if using `applies_to`)
- Reload VS Code window
- Check Copilot output channel for errors

## Prompts Not Showing Up

**Problem**: Can't see prompts with `#` prefix  
**Solutions**:
- Ensure files are in `.github/prompts/`
- Verify `.prompt.md` extension
- Check frontmatter has `name` and `description`
- Restart Copilot Chat

## Agents Not Available

**Problem**: `@agent-name` doesn't work  
**Solutions**:
- Confirm files are in `.github/agents/`
- Verify `.agent.md` extension
- Check frontmatter has `name` field
- Reload VS Code window

## Skills Not Working

**Problem**: Skills won't execute  
**Solutions**:
- Verify `SKILL.md` has proper frontmatter
- Check scripts have execute permissions
- Ensure scripts are in `scripts/` subdirectory
- Test scripts directly first
- Note: Skills preview feature (may need VS Code Insiders)

## Best Practices

1. **Start Simple**: Test with minimal examples first
2. **Check Syntax**: Use a markdown linter
3. **Test Incrementally**: Add one customization at a time
4. **Read Logs**: Check VS Code output panel
5. **Update Regularly**: Refine based on actual usage

## Getting Help

- [VS Code Copilot Docs](https://code.visualstudio.com/docs/copilot/customization/overview)
- [GitHub Copilot Community](https://github.com/community/community/discussions/categories/copilot)
- [Agent Skills Standard](https://agentskills.io)
```

---

### 7. Add Exercise 4 (Skills)

**New File**: `exercises/04-skills.md`

```markdown
# Exercise 4: Agent Skills

**Time**: 10 minutes  
**Prereq**: Completed Exercises 1-3

## What You'll Learn

How to create portable workflow packages (skills) that work across VS Code, GitHub CLI, and Claude.

## Concept: Skills vs Everything Else

- **Instructions**: Passive rules (automatic)
- **Prompts**: Task templates (on-demand)
- **Agents**: Specialized roles (contextual)
- **Skills**: Workflow packages with scripts (portable & executable)

Skills bundle:
- Instructions (SKILL.md)
- Executable scripts
- Reference documentation
- Assets/templates

## Exercise: Use Pre-Commit Check Skill

### Step 1: Understand the Skill

Look at `.github/skills/pre-commit-check/`:
- `SKILL.md` - Instructions for Copilot
- `scripts/` - Executable quality checks
- `references/` - Documentation

### Step 2: Use the Skill

In Copilot Chat, ask:
```
@pre-commit-check Run all quality checks on the example todo app
```

**What happens**:
1. Copilot reads `SKILL.md` 
2. Understands available scripts
3. Executes appropriate checks
4. Reports results

### Step 3: Observe the Output

The skill:
- Runs TypeScript type checking
- Validates Python type hints
- Runs linters (ESLint, Ruff)
- Executes tests
- Reports all issues

### Step 4: Try Creating Your Own

Ask Copilot:
```
Create a skill called "api-health-check" that:
1. Checks if the API server is running
2. Tests key endpoints
3. Validates response formats
4. Reports availability status

Put it in .github/skills/api-health-check/
```

## Key Takeaways

✅ Skills contain executable logic (not just instructions)  
✅ Skills are portable across different AI tools  
✅ Skills follow the open standard (agentskills.io)  
✅ Skills bundle everything needed for a workflow  

## When to Create a Skill

Create a skill when:
- ✅ Workflow needs multiple executable steps
- ✅ Want to share across team/tools
- ✅ Process requires scripts + documentation
- ✅ Need consistent execution every time

Don't create a skill for:
- ❌ Simple coding standards (use instructions)
- ❌ Single-step tasks (use prompts)
- ❌ Contextual assistance (use agents)

## Next Steps

1. ✅ Complete all 4 exercises
2. Review `ARCHITECTURE.md` to see how layers work together
3. Explore `examples/` to see customizations in action
4. Adapt patterns to your own projects

**Congratulations!** You now understand all four layers of Copilot customization! 🎉
```

---

### 8. Update Main README

**Enhance**: `README.md` to explain dual purpose

```markdown
# GitHub Copilot Lab

Learn how to customize GitHub Copilot with Instructions, Prompts, Agents, and Skills.

## 🎯 Two Ways to Use This Repo

### 1. As a Learning Lab (Recommended for first-time users)
Complete the exercises to understand each customization type:

👉 **[Start with Exercise 1: Instructions](exercises/01-instructions.md)**

**Time**: 30-40 minutes total  
**You'll learn**: When to use each customization layer

### 2. As a Reference Implementation (For experienced users)
Explore working examples and adapt to your projects:

👉 **[See Example: Todo App](examples/README.md)**

Browse `.github/` to see production-ready:
- Instructions for TypeScript & Python
- Prompts for common tasks
- Agents for specialized work
- Skills for automated workflows

## 📁 Repository Structure

```
.github/
├── instructions/        # Language-specific coding standards
│   ├── copilot-instructions.md
│   ├── frontend-instructions.md
│   └── backend-instructions.md
├── prompts/            # Reusable task templates
│   ├── create-component.prompt.md
│   ├── create-endpoint.prompt.md
│   └── ...
├── agents/             # Specialized assistants
│   ├── planner.agent.md
│   ├── frontend-dev.agent.md
│   └── backend-dev.agent.md
└── skills/             # Portable workflows
    └── pre-commit-check/

examples/               # Working code examples
└── todo-app/          # Full-stack demo app
    ├── frontend/      # React + TypeScript
    └── backend/       # FastAPI + Python

exercises/             # Step-by-step learning
├── 01-instructions.md
├── 02-prompts.md
├── 03-agents.md
└── 04-skills.md
```

## 📚 Documentation

- **[Quick Reference](QUICK_REFERENCE.md)** - Comparison of all features
- **[Architecture](ARCHITECTURE.md)** - How customizations work together
- **[Examples](examples/README.md)** - See them in action
- **[Troubleshooting](TROUBLESHOOTING.md)** - Common issues

## 🚀 Quick Start

### Option A: Learn by Doing
```bash
# Complete the exercises
1. Read exercises/01-instructions.md
2. Try the examples in your editor
3. Progress through all 4 exercises
```

### Option B: Explore Examples
```bash
# See customizations in action
1. Explore examples/todo-app/
2. Try prompts: #create-component
3. Use agents: @frontend-dev
4. Run skills: @pre-commit-check
```

## ✨ After Completing This Lab

You'll understand:
- ✅ When to use instructions vs prompts vs agents vs skills
- ✅ How to enforce standards automatically
- ✅ How to build reusable task templates
- ✅ How to create controlled workflows
- ✅ How to adapt these patterns to your projects

## 🤝 Contributing

This is a teaching repository. Contributions welcome:
- Improve explanations
- Add examples for other languages
- Share your own patterns
- Report issues or confusion

## 📖 Additional Resources

- [VS Code Copilot Docs](https://code.visualstudio.com/docs/copilot/customization/overview)
- [Agent Skills Standard](https://agentskills.io)
- [GitHub Copilot Best Practices](https://docs.github.com/copilot)

---

**Made with ❤️ for developers learning to work effectively with AI**
```

---

## Implementation Checklist

### Phase 1: Core Enhancements (Priority 1)
- [ ] Create `examples/todo-app/` directory with working code
  - [ ] Frontend: React components (TodoList, TodoItem, AddTodo)
  - [ ] Backend: FastAPI endpoints and models
  - [ ] Add `examples/README.md`
- [ ] Enhance instruction files
  - [ ] Update `.github/copilot-instructions.md`
  - [ ] Create `.github/frontend-instructions.md`
  - [ ] Create `.github/backend-instructions.md`
- [ ] Add production-ready prompts
  - [ ] Enhance `create-component.prompt.md`
  - [ ] Enhance `create-endpoint.prompt.md`
  - [ ] Add `add-validation.prompt.md`
  - [ ] Add `write-test.prompt.md`
- [ ] Create specialized agents
  - [ ] `frontend-dev.agent.md`
  - [ ] `backend-dev.agent.md`
  - [ ] Enhance `planner.agent.md`
  - [ ] Add `code-reviewer.agent.md`
- [ ] Build pre-commit-check skill
  - [ ] Create `SKILL.md`
  - [ ] Write `check_frontend.sh`
  - [ ] Write `check_backend.sh`
  - [ ] Write `check_all.sh`
  - [ ] Add `references/quality-standards.md`

### Phase 2: Documentation (Priority 2)
- [ ] Create `ARCHITECTURE.md`
- [ ] Create `TROUBLESHOOTING.md`
- [ ] Update main `README.md`
- [ ] Create Exercise 4 (`04-skills.md`)
- [ ] Update `QUICK_REFERENCE.md` if needed

### Phase 3: Polish (Priority 3)
- [ ] Add code comments to example app
- [ ] Test all prompts work correctly
- [ ] Test all agents respond appropriately
- [ ] Verify skill scripts execute properly
- [ ] Add any missing edge cases

---

## Key Principles

1. **Exercises Stay Standalone**: Don't change the existing exercise flow
2. **Examples Support Narrative**: Add examples that demonstrate concepts
3. **Dual Purpose**: Serve both learners and reference seekers
4. **Keep It Simple**: Todo app is intentionally minimal
5. **Production-Quality**: Even though it's an example, show best practices

---

## Timeline Estimate

- **Week 1**: Add example code + enhance instructions
- **Week 2**: Add prompts, agents, and skill
- **Week 3**: Documentation and polish
- **Week 4**: Testing and final review

---

## Success Criteria

✅ Exercises remain effective standalone learning (30-40 min)  
✅ Example code demonstrates customizations in context  
✅ Instructions, prompts, agents, skills are production-quality  
✅ Documentation ties everything together  
✅ Repo serves as reference for blog post  
✅ Anyone can clone and learn OR adapt to their project
