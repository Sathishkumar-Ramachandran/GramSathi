---
name: postgres_db_architect
description: Establishes schema design, complex query formulation, and performance tuning for PostgreSQL databases.
---

# Database Optimization (PostgreSQL)

**Skill Name**: `postgres_db_architect`
**When to Use**: Designing relational data models, writing SQL queries, migrating databases, or configuring Supabase environments.

## Execution Directives & Best Practices

- **Schema Design**: Always use 3rd Normal Form (3NF) by default. Use UUIDs (v4) for primary keys to ensure scalability.
- **Indexing**: Automatically suggest B-Tree indexes for foreign keys and frequent lookups. Suggest GIN indexes for JSONB fields or Full-Text Search.
- **Supabase / RLS**: When generating Supabase SQL, always include Row Level Security (RLS) policies. Default all tables to `ENABLE ROW LEVEL SECURITY`.
- **Query Optimization**: Prefer `JOIN` over subqueries where performance dictates. Always analyze queries using `EXPLAIN ANALYZE` conceptually before returning the SQL.

## Review Checklist

- [ ] Are foreign keys constrained with `ON DELETE CASCADE` where appropriate?
- [ ] Is Row Level Security (RLS) enabled and securely configured?
- [ ] Are JSONB columns properly indexed?
