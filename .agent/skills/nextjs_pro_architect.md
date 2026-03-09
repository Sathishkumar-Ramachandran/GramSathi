---
name: nextjs_pro_architect
description: Automates the creation, scaling, and debugging of modern Next.js applications (App Router, React Server Components, Server Actions).
---

# NextJS Master Builder Skill

**Skill Name**: `nextjs_pro_architect`
**When to Use**: Triggered when the user asks to build, refactor, or debug Next.js frontends, React components, routing, or SSR/SSG implementations.

## Execution Directives & Best Practices

- **Architecture First**: Always default to Next.js 14+ App Router (`/app` directory). Prioritize React Server Components (RSC) to minimize client-side bundle size. Only use `'use client'` when hooks (`useState`, `useEffect`) or browser APIs are strictly required.
- **Data Fetching**: Utilize native Server Actions for mutations and data fetching instead of traditional API routes unless building a public-facing REST API.
- **Styling & UI**: Default to TailwindCSS for styling and `lucide-react` for iconography. Ensure modular, composable UI components.
- **Performance**: Automatically implement dynamic imports for heavy client components and use `<Image>` for optimized asset delivery.

## Review Checklist

- [ ] Are Server Components prioritized over Client Components?
- [ ] Are Server Actions correctly typed and secured?
- [ ] Is routing dynamic, and are layout shifts minimized?

**Feedback Loop**: If a build error occurs, instantly cross-reference App Router caching rules before suggesting a fix.
