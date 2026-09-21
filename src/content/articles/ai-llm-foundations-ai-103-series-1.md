---
title: "AI-103 Foundations: Models, Deployments and Evaluation"
description: "Learn how AI models, deployments, endpoints, routing, and evaluation work together in a production-ready AI architecture."
publishedDate: 2026-09-21
category: "AI Architecture"
tags: ["ai-103", "llm-foundations", "model-deployment", "model-evaluation", "ai-architecture", "microsoft-foundry"]
featured: true
readingTime: "10 min read"
draft: false
---

Building an AI application is not only about calling a large language model and displaying its answer. A reliable system also needs the right model, a controlled deployment, a stable endpoint, meaningful evaluation, and continuous monitoring.

While preparing for AI-103, I found it useful to connect these concepts as one architecture rather than learn them as separate definitions. This first article in the series explains that foundation from a practical engineering point of view.

By the end, you should understand:

- what an AI model does;
- how model types differ;
- how routing helps balance quality, cost, and latency;
- the difference between a model, deployment, and endpoint; and
- how to evaluate an AI system before production.

## Start with the AI model

An AI model is a trained system that accepts an input, processes it using patterns learned during training, and produces an output.

![A request flows from input through an AI model to a generated output](/articles/ai-103-foundations-series-1/model-flow.svg)

For a language model, the input may be a question, instruction, or document. The output could be an answer, summary, classification, or structured result. A multimodal model can also work with images, audio, or video.

The important architecture lesson is simple: **a model is a capability, not the complete application**. The surrounding system still controls security, data access, orchestration, validation, and monitoring.

## Know the main model types

Different workloads need different model capabilities.

| Model type | Best suited for | Typical benefit |
| --- | --- | --- |
| Small language model | Classification, routing, extraction, and short summaries | Lower cost and latency |
| Large or more capable language model | Complex reasoning, comparison, and detailed generation | Better quality on difficult tasks |
| Multimodal model | Text combined with images, documents, audio, or video | Works across several input types |
| Embedding model | Semantic search, similarity, recommendations, and RAG retrieval | Represents meaning as vectors |

An embedding model is different from a chat model. A chat model generates language; an embedding model converts meaning into numbers that can be compared mathematically.

I explored these model types in more detail in [AI Model Selection: Small, Large, Multimodal & Model Routing](/articles/ai-model-selection-small-large-multimodal-model-routing/). Here, the goal is to understand how model selection connects to the rest of the production architecture.

## Select a model from the business requirement

The most powerful model is not automatically the best choice. Start with the workload and ask:

- What must the system do?
- How much reasoning does the task need?
- What input types must it understand?
- What response time is acceptable?
- How many requests will it receive?
- What level of accuracy and consistency is required?
- What will the workload cost at production scale?

For example, a small model may be enough to route a support request to the correct department. A more capable model may be needed to compare policies and explain why a person is eligible for a service.

This makes model selection a trade-off between **quality, latency, cost, throughput, and risk**.

## Use model routing when workloads vary

Many applications receive both simple and complex requests. Sending every request to the most capable model wastes money and can increase response time. Sending everything to a smaller model can reduce answer quality.

Model routing introduces a decision step before inference.

![A model router sends simple requests to a small model and complex requests to a capable model](/articles/ai-103-foundations-series-1/model-routing.svg)

A routing policy can consider intent, task complexity, user tier, risk, latency targets, or the confidence of an initial classifier. The router then selects the most appropriate model for that request.

The routing logic itself must also be evaluated. A cheap model is not useful if the router sends difficult requests to it and produces unreliable answers.

## Model, deployment, and endpoint are different

These three terms are closely related, but they are not interchangeable.

### Model

The model is the underlying AI capability selected for the workload.

### Deployment

A deployment is a configured runtime instance of that model. It represents how the model is made available inside an AI platform. A deployment can have its own name, model version, capacity, content-safety settings, and operational configuration.

### Endpoint

An endpoint is the network address that an application calls. The endpoint, together with authentication and a deployment name, connects application code to the deployed model.

![A .NET application calls an endpoint that targets a configured deployment of a selected model](/articles/ai-103-foundations-series-1/deployment-endpoint.svg)

A useful mental model is:

```text
Application → Endpoint → Deployment → Model
```

This separation is valuable because application code can target a stable deployment name while the team changes the model version or capacity behind it through a controlled release process.

## Separate development and production deployments

Using one deployment for every environment creates unnecessary risk. Development experiments can consume production capacity, configuration changes can affect live users, and test data can become mixed with production telemetry.

A safer design uses separate deployments:

| Environment | Purpose | Typical controls |
| --- | --- | --- |
| Development | Prompt experiments and integration work | Lower capacity, developer access |
| Test or staging | Evaluation and release validation | Production-like configuration |
| Production | Live application traffic | Restricted access, monitoring, alerts |

The exact isolation depends on the platform and risk level, but the principle is consistent: **test changes away from live traffic and promote them deliberately**.

## Evaluate the system, not only the model

A response that sounds fluent can still be irrelevant, incomplete, or unsupported by the provided data. That is why manual testing with a few prompts is not enough.

Create an evaluation dataset that represents real requests, expected behaviour, difficult cases, and unsafe or unsupported questions. Then measure the qualities that matter to the product.

![An evaluation framework measures relevance, groundedness, completeness, and coherence before a production decision](/articles/ai-103-foundations-series-1/evaluation-framework.svg)

### Relevance

Does the answer address the user's actual question?

### Groundedness

Are the claims supported by the supplied context or approved data source? This is especially important in Retrieval-Augmented Generation systems.

### Completeness

Does the answer cover the important parts of the request, or does it omit necessary information?

### Coherence

Is the response clear, logically organised, and internally consistent?

Depending on the application, also measure latency, token usage, cost, safety, refusal behaviour, tool-call accuracy, and task-specific correctness.

## Compare candidates with production trade-offs

Suppose two models are evaluated on the same representative dataset:

| Candidate | Quality | Average latency | Estimated cost |
| --- | --- | --- | --- |
| Model A | Higher | Slower | Higher |
| Model B | Good | Faster | Lower |

There is no universal winner. A regulated advisory workflow may justify Model A because answer quality and groundedness are critical. A high-volume classification workflow may favour Model B because it meets the quality threshold with lower latency and cost.

The decision should be recorded against explicit acceptance criteria. This makes future model upgrades measurable instead of subjective.

## Connect everything through an enterprise AI lifecycle

The architecture becomes clearer when the individual decisions are placed into one lifecycle.

![Enterprise AI lifecycle from business need through capability, model, runtime, endpoint, evaluation, and continuous improvement](/articles/ai-103-foundations-series-1/enterprise-ai-lifecycle.svg)

1. Define the business need and acceptable risk.
2. Choose the AI capability that fits the task.
3. Select candidate models using quality, cost, and latency requirements.
4. Configure isolated deployments for the required environments.
5. Expose the capability through secured endpoints.
6. Evaluate it using representative data and measurable criteria.
7. Monitor production behaviour and improve prompts, routing, retrieval, or model choice.

This lifecycle is iterative. Production feedback can reveal new failure cases, and those cases should become part of the evaluation dataset for the next release.

## Final takeaway

The main lesson from this AI-103 foundation is that a production AI solution is a system of connected decisions:

```text
Understand → Select → Deploy → Evaluate → Improve
```

Choose the model according to the workload, use routing when requests have different levels of complexity, keep deployments controlled, call them through secured endpoints, and evaluate the complete experience with representative data.

Once this foundation is clear, topics such as prompt engineering, RAG, agents, safety, and observability become much easier to place within the overall architecture.

