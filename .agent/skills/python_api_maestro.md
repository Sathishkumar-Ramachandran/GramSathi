---
name: python_api_maestro
description: Defines strict architectural standards for building high-performance, asynchronous, and scalable Python web APIs using FastAPI and Flask.
---

# Python - FastAPI & Flask Maestro

**Skill Name**: `python_api_maestro`
**When to Use**: Building backends, RESTful APIs, microservices, or executing Python script generation.

## Execution Directives & Best Practices

- **Framework Selection**: Default to FastAPI for async operations, high concurrency, and automatic OpenAPI documentation. Use Flask only when explicitly requested or maintaining legacy monoliths.
- **Type Safety**: Strictly enforce Pydantic models (V2) for data validation and typing in FastAPI. No generic dict returns.
- **Architecture**: Enforce a layered architecture (Routers -> Services -> Data Access Layer). Never write business logic directly in the route handler.
- **Concurrency**: Use `async def` for I/O bound operations (database calls, network requests) and standard `def` for CPU bound operations.

## Review Checklist

- [ ] Is Pydantic used for all request/response validation?
- [ ] Are async/await patterns properly implemented without blocking the event loop?
- [ ] Are dependencies (e.g., DB sessions) safely injected?
