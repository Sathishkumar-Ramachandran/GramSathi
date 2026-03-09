---
name: i18n_l10n_expert
description: Implements robust internationalization (i18n) and localization (l10n) systems across full-stack applications.
---

# Multi-lingual App Specialist

**Skill Name**: `i18n_l10n_expert`
**When to Use**: Adding language support, handling right-to-left (RTL) scripts, or structuring translation dictionaries.

## Execution Directives & Best Practices

- **Dictionary Structure**: Structure language files in deeply nested JSON format categorized by UI component (e.g., `nav.links.home`), rather than flat files.
- **Frameworks**: Utilize `next-intl` for Next.js, or `i18next` for general React apps. Ensure middleware intercepts routing (e.g., `/en/dashboard`, `/fr/dashboard`).
- **Formatting**: Always leverage native Intl APIs (`Intl.DateTimeFormat`, `Intl.NumberFormat`) for dates, currencies, and plurals.
- **UI Resilience**: Account for 30-40% text expansion in languages like German. Ensure UI flex/grid layouts do not break.

## Review Checklist

- [ ] Is the translation schema scalable and easily readable?
- [ ] Are date and currency formats dynamically localized?
- [ ] Does the layout support potential text expansion or RTL rendering?
