---
title: Dependency and UI Upgrade Plan
description: Staged implementation plan for the dependency and styling modernization
ms.date: 2026-08-19
ms.topic: concept
---

## Phase 1: Runtime and Baseline

- Select Node.js 24.x for local development and Vercel
- Repair Jest DOM setup and align React type packages
- Remove unused direct dependencies
- Regenerate the npm lockfile with a supported npm release

## Phase 2: Security and Compatible Updates

- Upgrade Next.js, React, PostCSS, Sharp, and other compatible packages
- Run tests and a production build after the dependency batch
- Review remaining audit paths before introducing major migrations

## Phase 3: Legacy Package Replacement

- Replace Showdown feed rendering with `markdown-it`
- Remove `next-pwa` and its generated service worker artifacts
- Add focused feed and service worker checks

## Phase 4: Styling Migration

- Upgrade Tailwind CSS from 3 to 4
- Move PostCSS and theme configuration to supported Tailwind and DaisyUI patterns
- Preserve current colors, typography, responsive behavior, and content rendering
- Check desktop and mobile pages before beginning broader visual redesign

## Phase 5: Tooling Majors

- Upgrade Jest and Babel Jest together
- Upgrade React Markdown, Font Awesome, date-fns, feed, and lint-staged independently
- Keep Feed 4 because Feed 6 is ESM-only and the test/build configuration is CommonJS
- Defer TypeScript 7 until Next.js and editor compatibility is verified

## Validation

Run the test suite, TypeScript checks, production build, generated feed checks, dependency audit, and browser smoke checks after each relevant phase.
