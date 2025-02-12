---
title: OpenAI's Real-time API - Intro and Key Learnings
description: Worked on a personal digital assistant using the Realtime API from Azure OpenAI. Here are some key learnings and insights from the experience.
date: 11-02-2025
minutesToRead: 12
---

## Real time messaging API

The RealTime API allows you to have live, back-and-forth conversations with an AI model. It takes in text or audio as input and responds with text or audio—all in real-time.

Unlike traditional API calls, where you send a request and wait for a full response, the RealTime API starts responding instantly as you speak or type, making interactions feel more natural and fluid.

✅ **Multimodal Input & Output** – You can send text or speech and get back text or speech in any supported language.

✅ **Streaming Responses** – The model starts responding immediately, instead of waiting to generate the full response.

✅ **Real-Time Translation** – You can speak in one language, and the model can reply in another, making it great for live translations.

✅ **Interactive Conversations** – It feels more like chatting with a real person because of its speed and responsiveness.

### Communication Modes

OpenAI's RealTime API supports two communication methods: WebRTC and WebSockets

#### WebRTC – Ultra-Low Latency Audio Streaming

* Designed for real-time voice conversations.
* Uses peer-to-peer (P2P) connections, reducing latency.
* Ideal for live voice assistants, AI-powered calls, and instant translations.
* Best when you need: natural, low-latency spoken conversations.

![realtime using WebRTC](/assets/posts/images/realtime-api/image.png)

#### WebSockets – Flexible Real-Time Messaging

* Uses a client-server model instead of direct P2P connections.
* Supports text-based chat and controlled audio streaming.
* Easier to integrate into existing web applications.
* Best when you need: chatbot-like interactions, AI narration, or real-time text communication.

![realtime using websockets](/assets/posts/images/realtime-api/image-1.png)

#### ‼ Azure OpenAI - Supports only WebSockets for real-time AI interactions.

### SDK Support for Realtime API

At the time of authoring (not publishing 😁) this article, LangChain and Semantic Kernel primarily support interactions with OpenAI's APIs through traditional HTTP requests. The Realtime API, which facilitates low-latency, streaming interactions via WebSockets (and WebRTC in some cases), is relatively new. Consequently, direct support for the Realtime API in these SDKs may be limited or under development.

For instance, the Azure OpenAI Realtime Audio SDK provides code samples demonstrating how to interact with the Realtime API using WebSockets. I started off with this initially for this application.

#### Sneak peek into the SDK (like) code sample

* Works with text messages, function tool calling, and many other existing capabilities from other endpoints like /chat/completions
* Has samples in multiple languages, python, java, javascript, dotnet (not sure why this is called as language though 🤔)

Flow of this code sample looks like this,

![alt text](/assets/posts/images/realtime-api/image-2.png)

This looks great, however I needed 2 things on top of this!!

* A client application which can interact with the realtime host using voice.
* Use my own data as part of the conversation (aka Retrieval-Augmented Generation - RAG)

### RAG with RealTime

When building a conversational AI, I wanted the bot to engage with my own data rather than just relying on the model’s built-in knowledge. This meant using a Retrieval-Augmented Generation (RAG) approach, where the AI could dynamically fetch relevant information from my custom dataset.
However, I initially had concerns about how to integrate RAG into a real-time interaction, especially when dealing with audio input. How would the model know when to retrieve external data? How could it seamlessly pull information while maintaining a fluid conversation?
"The best approach for incorporating RAG in RealTime APIs is through Tools and Function Calling. Instead of manually injecting external data into every request, I expose a custom tool that allows the model to query my vector database whenever necessary."

Here’s how it works:

* Storing Knowledge: A vector database contains my personal or domain-specific knowledge, encoded as embeddings for efficient retrieval.
* Defining the Tool: I define a tool (or function) that provides the model with access to this vector database.
* Dynamic Decision-Making: The model autonomously decides when to use the tool—similar to how a person might decide to "Google something" when they lack certain information.
* Real-Time Retrieval: If the model determines that external context is required, it queries the vector database in real time, retrieves the relevant information, and seamlessly incorporates it into its response.
This method keeps the conversation dynamic, ensures accuracy, and allows the AI to stay up to date with your specific information.

#### RAG using Azure AI Search

Now moving into building this out. I stumbled upon this fantastic quickstart solution from Azure-Samples that fits my needs perfectly!

[AI Search RAG Audio](https://github.com/azure-samples/aisearch-openai-rag-audio)

This quick-start solution sets up a Retrieval-Augmented Generation (RAG)-powered conversational AI. It includes a sample document in Azure Blob Storage, indexed for efficient retrieval. A custom tool handles the RAG process, enabling the AI to fetch relevant information dynamically. The React-based frontend offers an intuitive user interface. This customizable setup serves as a foundation for deploying RAG-enabled conversational systems.

![architecture of rag audio](/assets/posts/images/realtime-api/image-3.png)

On top of this,

* Note taking feature:
* Takes notes, and i can use that information to build conversation.
* Cosmos DB store with an indexer to AI Search
* Azure AD - Google authentication
* Progressive Web Application with the React boilerplate from the quick-start.

![tech stack of ai-assistant](/assets/posts/images/realtime-api/image-4.png)

Here is the link to my repository, if you are interested to check it out: GitHub - [VASI: Digital Assistant](https://github.com/prasann/ai-assistant)

### Key learnings in the Realtime API

#### Events, Events, and Events

Unlike the traditional Chat Completions API, where a request-response model is followed, the Realtime API is fundamentally event-driven. Everything—whether it's receiving responses, detecting pauses in speech, or transcribing input—is handled through events over a single persistent connection.

#### Bidirectional Communication with Events

* The client sends audio input as an event stream.
* The server processes the speech in real-time and responds with multiple events such as transcriptions, intermediate responses, and final outputs.
* This enables a fluid, low-latency interaction, much closer to how a real-time assistant should behave.

#### Turn Detection – Knowing When to Respond

* Unlike traditional APIs where explicit end-of-input markers are needed, the Realtime API can intelligently detect when a user has finished speaking.
* This is powered by turn detection, which allows for natural pauses in speech before processing the response, mimicking human-like interaction.

#### Built-in Speech-to-Text (No Additional Service Needed!)

* The session itself handles input transcription, eliminating the need for an external speech-to-text service like Whisper.
* This means seamless integration of voice interactions without additional API calls or dependencies.

In conclusion, a quick summary on the key differences between OpenAI’s Realtime API and the usual Chat Completions API:

| Feature | Realtime API | Chat Completions API |
|---|---|---|
| Interaction Model | Event-driven (Streaming & Events) | Request-response |
| Latency | Ultra-low (Real-time processing) | Higher (Batch-based) |
| Input Modality | Speech & Text | Text-only |
| Built-in Speech-to-Text? | Yes, auto-transcribed (input_audio_transcription) | No, requires Whisper or another STT service |
| Turn Detection? | Yes, detects natural pauses | No, explicit input-end needed |
| Best Use Case | Real-time voice assistants, AI companions | Text-based chatbots, async responses |
