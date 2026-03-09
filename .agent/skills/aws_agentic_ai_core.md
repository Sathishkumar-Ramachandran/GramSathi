---
name: aws_agentic_ai_core
description: Builds deterministic, self-healing Agentic AI workflows utilizing AWS Bedrock, AgentCore, LangChain, and LangGraph.
---

# AWS Agentic AI (Bedrock, LangChain, LangGraph)

**Skill Name**: `aws_agentic_ai_core`
**When to Use**: Designing AI agents, multi-agent systems, RAG (Retrieval-Augmented Generation) pipelines, or LLM-driven decision engines on AWS.

## Execution Directives & Best Practices

- **State Management**: Always use LangGraph for cyclic, multi-agent workflows to ensure state persistence and manageable execution graphs.
- **Model Routing**: Leverage AWS Bedrock as the primary inference layer. Dynamically route prompts to Claude 3.5 Sonnet/Opus based on task complexity to optimize costs.
- **Memory & RAG**: Connect to Pinecone or AWS OpenSearch for long-term vector memory (MCP configured). Ensure prompt structures follow the Context -> Objective -> Constraints framework.
- **Tool Binding**: When defining AgentCore tools, provide explicit JSON schemas, descriptions, and strict error-handling parameters.

## Review Checklist

- [ ] Is the LangGraph state immutable and correctly passed between nodes?
- [ ] Are AWS Bedrock API calls correctly configured with retry mechanics?
- [ ] Does the agent gracefully handle "tool execution failed" scenarios?
