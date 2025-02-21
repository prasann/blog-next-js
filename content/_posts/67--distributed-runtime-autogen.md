---
title: Understanding Autogen's Distributed agent runtime implementation.
description: A deep dive into the GRPC-based architecture that powers seamless agent coordination and communication in Autogen.
date: 21-02-2025
minutesToRead: 14
---

## Autogen and its Distributed Runtime

Autogen (v0.4+) is a framework for building agent-based applications, supporting the orchestration of multiple agents and their intercommunication.

One of the nice features in Autogen is its [distributed runtime](https://microsoft.github.io/autogen/stable/user-guide/core-user-guide/framework/distributed-agent-runtime.html), which enables seamless communication and coordination between agents. This makes it possible to deploy and scale agents independently in a distributed manner. The [gRPC (Google Remote Procedure Call)](https://grpc.io) backed implementation of the distributed runtime allows a robust and high-performance communication channel between agents, making it suitable for various applications, from simple tasks to complex workflows.

In this blog post, will do a deep dive into the architecture of Autogen's distributed runtime, focusing on its GRPC-based implementation.

*Note: This is the state of things as of February 2025 in the main stable branch (v0.4). Autogen is under active development, and things might have changed since. Please refer to the [Autogen documentation](https://microsoft.github.io/autogen/stable). All this information is based on my understanding and could potentially be incorrect, as there isn't much documentation available on how this works in Autogen.*

## Overview of Autogen's Distributed agent runtime architecture

The distributed runtime of Autogen is designed to support multiple agents working concurrently, managed by a GRPC host. The architecture facilitates communication and coordination among various components using gRPC. If you aren't familiar with gRPC, take a look at the [gRPC documentation](https://grpc.io/docs/what-is-grpc/introduction/) for a better understanding before diving into the details here.

### Architecture Diagram

![Autogen's Distributed Runtime Architecture](/assets/posts/images/distributed-runtime/image-1.png)

### Components
1. **GRPC Host:** The central component that manages communication between different runtimes and agents. It acts as a server to which GRPC runtimes connect.
2. **GRPC Runtime (Client):** There are multiple instances of GRPC runtime, each functioning as a client connected to the GRPC host. Each runtime is responsible for managing one or more agents. The diagram shows two such runtimes, but there can be more.
Inner Workings of a GRPC Runtime (Client)

#### Some of the main constituents of a GRPC Runtime includes,

- **Host Connection:** Manages the connection to the GRPC Host. This is crucial for communication between the runtime and the host, allowing the runtime to send and receive messages. This has a `read_loop` which allows you to read and write (I know 😃) messages to the gRPC host.
- **Subscription Manager:** The Subscription Manager plays a crucial role in this setup by managing which agents are subscribed to specific topics. When agents publish messages to topics, the Subscription Manager looks up the current subscriptions and ensures that events are relayed to all subscribed agents. This process involves updating subscription lists dynamically and ensuring that the correct agents receive the relevant messages.
- **Serialization Registry:** Responsible for serializing and deserializing messages and data. Currently supports JSON format only.

### Communication
- **Unary Agent Worker Messages:** These are direct, one-way messages sent from the runtimes to the Host. They can include messages like RegisterAgent, AddSubscription, and RemoveSubscription.
- **Bidirectional Stream (to send cloudevents):** This is a continuous, two-way communication channel between the GRPC Host and the runtimes. It allows for real-time exchange of cloud events, which can be critical for coordinating actions across different agents and runtimes.

### Agents

Agents in general are unaware of the distributed nature of the runtime. They interact with the GRPC Runtime as if it were a local `AgentRuntime`, allowing for a seamless experience. You can extend the `RoutedAgent` and build out custom agent ensure to pass on the GRPC Runtime while the agent performs `register` operation. The BaseAgent has to manage the state (chat_history) of the agent. 


## Cross language agents

One of the main reasons I delved into this topic is to understand the effort involved in building and supporting cross-language agents.

For example, how can I build a TypeScript agent that can be integrated into the distributed runtime and communicate with a Python agent? I believe they chose gRPC to enable such language-agnostic communication. The documentation also hints at this.

*"The process described above is largely the same, however all message types MUST use shared protobuf schemas for all cross-agent message types."*

Here are my thoughts on how this can be achieved:

- They have proto files checked into the repository: `agentworker.proto` for unary messages and `cloudevent.proto` for the bidirectional stream.
- The language of choice can generate the client and server code from these proto files. For example, in TypeScript, you can use the `grpc-tools` package to generate the necessary code.
There should be an equivalent of `GrpcWorkerAgentRuntime` in your language of choice. This runtime doesn't have to support the entire functionality currently implemented in Python, but the communication part should be implemented as specified using the aforementioned proto files. This is no easy task given the complexity of the runtime, but *where there is a [GH Copilot](https://github.com/features/copilot), there is a way* 😎
- `HostConnection` has to be implemented to support the communication with the GRPC host.
- `RoutedAgent` like implementation has to be present. Since the `BaseAgent` provides the `message_handler` decorator, you can use that to implement the message handlers for the various messages sent by the GRPC host.
- One other thing that could potentially complicate this is the behaviours of the `BaseAgent` and `AgentRuntime` to see if there are any other dependencies that needs to be implemented.
- and more...

## Challenges I see as of now

*Most of these are my understandings from the code, so please take them with a grain of salt.*

- The proto files aren't complete (yet.). For example, if you are looking for a `functionCall` that isn't present there at this moment.
- Currently, the `cloudevents` are being passed on to all registered runtimes. The runtimes then decide whether to process the request or not. So, in a scenario with too many agents, the runtimes will be bombarded with events that they don't care about.
- This also makes me wonder how the currently implemented orchestration pattern works out. For example, handoffs between agents. I'm not sure how the distributed runtime will handle that. But this might work since the runtime is abstracted within the agent and the teams aren't aware of the distributed nature of the runtime. (I think!)
- Implementing `GrpcWorkerAgentRuntime` in a different language is no easy task. There is no guide (yet). So you will have to figure it out yourself by looking into the source code and hopefully there isn't any coupling with other objects.

## Code sample

I started off with great hopes of implementing this distributed runtime in TypeScript, but I quickly realized that it is no easy task. So I backed off. Here is just a refactored version of the example code from the documentation.

[Autogen's distributed runtime example](https://github.com/prasann/autogen-distributed-chat)
