---
title: "Microsoft Developer Tech Updates: GPT-6, Copilot, Agents and .NET"
summary: "A practical roundup of GPT-6 and Claude in Microsoft Foundry, Copilot observability, hosted-agent isolation, SqlClient, and C# agent development."
publishedDate: 2026-09-23
topic: "AI"
sourceName: "Microsoft Azure"
sourceUrl: "https://azure.microsoft.com/en-us/blog/gpt-6-astra-sol-and-luna-for-production-agents-in-microsoft-foundry/"
featured: true
draft: false
---

This week’s updates show a clear shift in enterprise AI: the conversation is moving beyond model demos and toward production engineering.

New models still matter, but the bigger story is how teams select them, observe agent behaviour, isolate workloads, control cost, and build on dependable application foundations.

## At a glance

- GPT-6 Sol and Luna expand the model choices available in Microsoft Foundry and GitHub Copilot.
- Claude Opus 5.5 adds another option for long-running coding and knowledge work in Foundry.
- GitHub Copilot agents can now emit OpenTelemetry traces for enterprise observability.
- Foundry-hosted agents make session isolation an explicit architecture decision.
- Microsoft.Data.SqlClient 7.0.3 provides the latest supported servicing update in the 7.x line.
- A new C# series shows how an agent grows from a basic chat loop into a production-ready system.

## 1. GPT-6 Sol and Luna arrive in Microsoft Foundry

Microsoft Foundry now offers GPT-6 Sol and GPT-6 Luna alongside GPT-6 Astra. The three models are aimed at different workload profiles rather than a single “best model” choice.

- **Astra** targets demanding reasoning and agentic work.
- **Sol** balances capability, responsiveness, and cost for production applications and coding workflows.
- **Luna** is designed for fast, high-volume tasks such as extraction, summarisation, and routing.

The architecture lesson is simple: model selection should happen per task. A strong production design can route complex reasoning to a more capable model while using a faster model for repeatable supporting work.

Teams should compare quality, latency, reliability, and cost per completed task—not only the model’s benchmark score or token price.

[Read Microsoft’s GPT-6 Foundry announcement](https://azure.microsoft.com/en-us/blog/gpt-6-astra-sol-and-luna-for-production-agents-in-microsoft-foundry/)

## 2. Claude Opus 5.5 expands multi-model choice in Foundry

Claude Opus 5.5 is coming to Microsoft Foundry for long-running coding and knowledge-work scenarios. This gives enterprise teams another capable model that can be evaluated within their Azure AI platform strategy.

The practical advantage is not simply having another model name in a catalogue. It is the ability to test different models against the same real workload and choose based on output quality, latency, governance requirements, and operating cost.

That multi-model approach also reduces unnecessary dependency on one provider or one model family.

[Read Microsoft’s Claude Opus 5.5 announcement](https://techcommunity.microsoft.com/blog/azure-ai-foundry-blog/claude-opus-5-5-comes-to-microsoft-foundry-for-long-running-coding-and-knowledge/4558051)

## 3. GPT-6 Sol and Luna are available in GitHub Copilot

GitHub has added GPT-6 Sol and Luna to Copilot. Availability varies by Copilot plan and rollout, with support across experiences such as Visual Studio Code, Visual Studio, Copilot CLI, GitHub.com, and the coding agent.

This makes model selection part of the developer workflow. A developer can use a faster model for routine edits and reserve deeper reasoning for architecture analysis, difficult debugging, or multi-step refactoring.

The useful question is no longer “Which model should our organisation use?” It is “Which model fits this task?”

[Review the GitHub Copilot availability details](https://github.blog/changelog/2026-09-22-openais-gpt-6-sol-and-gpt-6-luna-now-available/)

## 4. GitHub Copilot agents gain OpenTelemetry observability

Enterprise administrators can now configure OpenTelemetry export for the GitHub Copilot app. The resulting traces can show agent sessions, model activity, tool calls, timing, and failures in an existing observability platform.

This is important because an agent may call several tools and models before producing an answer or code change. Without traces, an unexpected result is difficult to investigate. With structured telemetry, teams can inspect where time was spent, which tool failed, and which step changed the outcome.

For production agent systems, observability should be designed from the beginning rather than added only after an incident.

[See GitHub’s OpenTelemetry announcement](https://github.blog/changelog/2026-09-22-opentelemetry-in-the-github-copilot-app/)

## 5. Isolation becomes a first-class decision for hosted agents

Microsoft’s guidance for Foundry-hosted agents highlights isolated execution sessions. A session provides a sandboxed environment with its own state and filesystem for a logical workload.

The important architecture decision is how the application maps users, conversations, tenants, or jobs to those sessions. Reusing execution state carelessly can create data-boundary and security risks. Creating too many short-lived sessions can add operational overhead.

Before deploying an agent, define the isolation boundary explicitly:

- which identity owns the session;
- whether state may be reused;
- when the session expires;
- what data and tools it can access; and
- how activity is audited.

[Read the Foundry hosted-session guidance](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/manage-hosted-sessions)

## 6. Microsoft.Data.SqlClient 7.0.3 is the current 7.x servicing update

Microsoft lists version 7.0.3 as the latest supported servicing release in the Microsoft.Data.SqlClient 7.x line, published on 10 September 2026. Applications using the driver should review the relevant release notes and test the update against their actual database workloads.

A data-provider update deserves the same discipline as any infrastructure dependency:

1. check direct and transitive package references;
2. restore and build in a controlled branch;
3. run connection, authentication, retry, transaction, pooling, and streaming tests; and
4. observe the application after a staged deployment.

The package version may look like a small implementation detail, but the SQL client sits on a critical path for most .NET data access.

[Check Microsoft.Data.SqlClient support versions](https://learn.microsoft.com/en-us/sql/connect/ado-net/sqlclient-driver-support-lifecycle?view=sql-server-ver17)

## 7. C# developers get a practical path to production AI agents

Microsoft’s new C# Agent Framework series follows an agent from an initial `IChatClient` loop toward a more complete harness. The series covers the engineering capabilities that make an agent useful outside a demo: tools, planning, memory, approvals, observability, and deployment.

This is encouraging for .NET developers. Existing skills in dependency injection, asynchronous programming, API integration, identity, telemetry, testing, and cloud deployment remain the foundation. Agent development adds new patterns, but it does not replace sound software engineering.

Start with a small workflow, make tool boundaries explicit, keep a human approval step around consequential actions, and add telemetry before increasing autonomy.

[Explore the C# agent-harness series](https://devblogs.microsoft.com/dotnet/build-your-own-ai-agent-harness-in-csharp-the-maf-claw-live-series/)

## What developers should take away

The most important update this week is not one model release. It is the growing production platform around AI systems.

Developers and architects should focus on five capabilities:

- selecting models by workload rather than reputation;
- measuring cost and latency at the task level;
- tracing agent decisions and tool calls;
- enforcing clear identity and session boundaries; and
- maintaining reliable application and data-access foundations.

The teams that treat AI agents as observable, secure software systems will move further than teams that treat them as isolated model experiments.
