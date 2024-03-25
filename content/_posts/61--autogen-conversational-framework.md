---
title: Autogen - Make your agents to collaborate
description: 
category: tech, llm, ai
date: 12-10-2023
minutesToRead: 7
draft: true
---

[Autogen framework](https://github.com/microsoft/autogen) offers developers with a toolkit that harnesses the power of functions, enabling the creation of conversational agents capable of solving diverse tasks. Apart its simplicity of APIs, it also offers multiple modes including the human-in-the-loop model, thereby simplifying the development of complex applications.

## Differentiating Autogen from Langchain or Semantic Kernel

1. **[Autogen](https://microsoft.github.io/autogen/)**: Tailored for multi-agent conversations, Autogen streamlines complex LLM workflows, optimizing performance and supporting diverse conversation patterns. Its strength lies in enhancing LLM inference within multi-agent frameworks. It also offers a human-in-the-loop, meaning that the user can intervene in the conversation at any point, providing feedback or additional information to the agents and controlling the conversation flow.

2. **[Langchain](https://python.langchain.com/docs/get_started/introduction)**: Focused on ease and integration, Langchain offers a streamlined approach for creating LLM-based applications. It uniquely utilizes a pipeline combining question vector representation and similarity search for efficient information retrieval. Langchain is ideal for developers seeking a simple yet powerful tool for LLM application development.

3. **[Semantic Kernel](https://learn.microsoft.com/en-us/semantic-kernel/overview/)**: An open-source SDK, Semantic Kernel simplifies the integration of conventional programming languages with LLMs. It stands out by allowing the chaining of plugins to call existing code, bridging LLMs with various sources of context. Semantic Kernel is a versatile tool for developers looking to leverage LLMs within existing codebases with C#, Python.

## A conversational Use-case for Autogen Framework

Planning a trip can be hard, needing careful planning for staying, things to do, and eating. Microsoft's Autogen makes this easy by using AI. It also allows for human intervention to guide the process when needed.

Imagine planning a weekend trip with friends. With Autogen, planning becomes easy because of its AI agents and the option for human control. Here's how they help:

**HotelBooking Agent**: This agent helps you find a place to stay. It understands what you want and quickly finds options that fit your needs. If needed, a person can step in to adjust choices.

**Activities Agent**: Next, this agent finds things to do based on your interests. It gives suggestions for all kinds of activities to make your trip fun. Humans can also guide these suggestions.

**FoodOptions Agent**: This agent helps you decide where to eat by recommending places that match your taste and diet. Again, there's room for human input to refine choices.

**Collaborative Coordination with Human in the Loop**: Autogen's strength is making these agents work together well, with the option for human intervention. They adjust suggestions based on your choices, making planning easy and tailored to you, with a human touch when needed.

A sample of this workflow by this twitter user,

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">yo wtf, Microsoft&#39;s newly released AutoGen is fk&#39;in dope..<br><br>- allows for multiple agents that align to one goal<br>- human input allowed<br><br>🤖 I created 5 agents to help me plan a 30-day iternary in Bangkok<br><br>(results below ↓) <a href="https://t.co/klW3Go1d1c">pic.twitter.com/klW3Go1d1c</a></p>&mdash; peter! 🥷 (@pwang_szn) <a href="https://twitter.com/pwang_szn/status/1707334415691686227?ref_src=twsrc%5Etfw">September 28, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>


## Endless Possibilities with Autogen

Beyond trip planning, Autogen finds applications in a plethora of domains. From customer service automation to virtual assistants in healthcare, Autogen's customizable agents prove invaluable in streamlining operations and enhancing user experiences. In e-commerce, Autogen facilitates personalized product recommendations and seamless order management. In education, it enables interactive learning experiences tailored to individual students' needs. With Autogen, the possibilities are limitless, revolutionizing how we interact with technology across various sectors.

In conclusion, Microsoft's Autogen framework represents a paradigm shift in conversational AI, empowering developers to craft sophisticated agents tailored to diverse tasks and environments. With its emphasis on customizable functions and collaborative modes, Autogen heralds a new era of conversational agents, redefining the boundaries of human-machine interaction.
