---
title: Dependency and UI Upgrade Specification
description: Requirements for modernizing the blog runtime, dependencies, and styling stack
ms.date: 2026-08-19
ms.topic: concept
---

## Goal

Modernize the blog dependency stack, remove known vulnerable legacy packages, and prepare the styling layer for planned UI work without changing published content or routes.

## Requirements

- Use a Node.js major version supported by Vercel
- Produce deterministic local and Vercel installs from the npm lockfile
- Restore the Jest suite before dependency migration
- Remove unused and unpatched dependencies
- Preserve feed, sitemap, service worker, and static page behavior
- Upgrade Tailwind CSS and DaisyUI while preserving the current design as a migration baseline
- Keep the Pages Router architecture during this upgrade
- Pass tests, type checking, production build, and dependency audit

## Acceptance Criteria

- `package.json` selects Node.js 24.x, which Vercel supports
- React runtime and type packages use matching major versions
- Tests pass without deprecated Jest DOM entry points
- `markdown-it` replaces Showdown for feed content
- The legacy `next-pwa` Workbox chain and generated workers are removed
- Tailwind CSS 4 builds all current utility classes and DaisyUI themes
- Existing routes and generated feed formats remain available
- The npm audit reports no known vulnerabilities
