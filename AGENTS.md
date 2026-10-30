# AGENTS.md

This file is the shared contract for Codex, Claude Code, and other coding agents working in this repository.

## Project

Fortune Teller is a React Native app built with Granite.js. It shows a daily Korean fortune message, a lucky number, and a lucky color.

- `src/pages/`: routed pages (`index.tsx`, `about.tsx`)
- `src/theme/colors.ts`: color theme
- `pages/_404.tsx`: not-found page
- `granite.config.ts`: Granite app configuration

## Commands

```bash
pnpm install
pnpm dev
pnpm build
pnpm test
pnpm typecheck
pnpm lint
```

## Rules

- Run `pnpm typecheck`, `pnpm lint`, and `pnpm test` before committing.
- Use Granite.js routing for navigation and keep colors in `src/theme/colors.ts`.
