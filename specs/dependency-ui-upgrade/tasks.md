---
title: Dependency and UI Upgrade Tasks
description: Implementation checklist for dependency, security, and styling changes
ms.date: 2026-08-19
ms.topic: concept
---

## Tasks

- [x] Update Node.js and npm runtime declarations
- [x] Repair the existing Jest baseline
- [x] Align React 19 type packages
- [x] Remove confirmed unused dependencies
- [x] Apply compatible dependency updates
- [x] Upgrade security-sensitive direct dependencies
- [x] Replace Showdown in feed generation
- [x] Remove obsolete PWA support and generated workers
- [x] Migrate Tailwind CSS and DaisyUI configuration
- [x] Upgrade compatible tooling majors independently
- [x] Run tests, type checks, build, and audit
- [x] Verify representative desktop and mobile routes
- [x] Configure Vercel to use Node.js 24.x through `package.json`
