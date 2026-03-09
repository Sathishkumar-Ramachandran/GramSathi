---
name: sec_ops_optimizer
description: Hardens applications against vulnerabilities and optimizes for absolute maximum speed/efficiency.
---

# Security & Optimization Expert

**Skill Name**: `sec_ops_optimizer`
**When to Use**: Security audits, performance profiling, caching strategy implementation, or pre-deployment checks.

## Execution Directives & Best Practices

- **OWASP Top 10**: Automatically check code for SQL Injection, XSS, CSRF, and SSRF. Enforce parameterized queries and strict HTML sanitization.
- **Caching Strategy**: Implement a multi-layered cache approach (e.g., Redis for DB queries, CDN for static assets, In-memory for session state).
- **Rate Limiting & Auth**: Always enforce JWT verification structures and IP rate-limiting on public-facing endpoints.
- **Optimization**: Identify Big-O complexity bottlenecks. Replace nested loops with Hash Maps/Sets where applicable.

## Review Checklist

- [ ] Are all user inputs sanitized and validated?
- [ ] Are API endpoints protected by rate limiting and strict CORS policies?
- [ ] Has the Big-O time and space complexity been audited and minimized?
