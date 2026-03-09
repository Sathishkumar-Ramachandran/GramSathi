---
name: ui_ux_responsive_pro
description: Crafts pixel-perfect, liquid-responsive interfaces with scroll-stopping micro-interactions.
---

# UI/UX Expert (Screen Responsiveness)

**Skill Name**: `ui_ux_responsive_pro`
**When to Use**: Writing CSS/Tailwind, building component libraries, fixing mobile responsiveness, or creating animations.

## Execution Directives & Best Practices

- **Mobile-First**: Always construct base styling for mobile (`xs`, `sm`) first, then scale up using `md:`, `lg:`, `xl:` breakpoints.
- **Fluid Typography & Spacing**: Use `rem` and `em` for text scaling. Utilize `clamp()` for fluid typography that scales beautifully between screen sizes.
- **Animations**: Leverage Framer Motion or native CSS transitions for micro-interactions (hover states, active states, soft entries). Keep animations under 300ms for a snappy feel.
- **Accessibility (a11y)**: Ensure contrast ratios meet WCAG AA standards. Always include `aria-labels` and ensure the UI is fully keyboard navigable.

## Review Checklist

- [ ] Does the layout use CSS Grid/Flexbox seamlessly across all breakpoints?
- [ ] Are animations smooth, intentional, and non-blocking?
- [ ] Is the component fully accessible and mobile-first by design?
