---
title: Auto function calling with GPT models using Semantic Kernel
description: Writeup on a sample application that demonstrates how to automatically call functions using GPT models and Semantic Kernel. This notebook
date: 24-09-2024
minutesToRead: 10
---

## Semantic Kernel

[Semantic Kernel](https://github.com/microsoft/semantic-kernel) is an SDK that integrates Large Language Models (LLMs) like OpenAI, Azure OpenAI, and Hugging Face with conventional programming languages like C#, Python, and Java. It is a drop-in alternative for LangChain, enabling developers to leverage the power of LLMs in their applications.

## Auto function calling with GPT models

Function calling in Large Language Models (LLMs) is a powerful technique that allows these models to interact with external systems, APIs, and tools. This capability extends the functionality of LLMs beyond text generation, enabling them to perform actions, retrieve real-time information, and execute tasks by leveraging external resources.

In this article, we explore a sample application that demonstrates how to automatically call functions using GPT (gpt-4o) models and Semantic Kernel. Here we let GPT model to decide what is the appropriate function to call based on the user input, and performs the function call. All these will be orchestrated by Semantic Kernel.

## Scenario

In this sample application, GPT is provided with 2 functions.

1. Bing Search - This function takes a search query as input and returns the top search results from Bing.
2. Azure AI Search on a custom dataset - This function invokes the Azure AI Search endpoint to perform a vector search on a custom pre-indexed data. For this example, we have a refrigerator-manual being indexed and the function returns the most relevant section from the manual based on the user query.

When a user inputs a query, the GPT model predicts the function to call based on the input and Semantic Kernel orchestrates the function call.

## Approach

In Semantic Kernels, these functions can be represented as [plugins](https://learn.microsoft.com/en-us/semantic-kernel/concepts/plugins/). Each plugin is a self-contained unit that encapsulates the function's logic, input, and output. The GPT model predicts the plugin to call based on the user input, and Semantic Kernel executes the corresponding plugin.

For our scenario, there are 2 plugins.

1. Bing Search Plugin: This comes with Semantic Kernel SDK and is used to search Bing. This uses Bing Service in Azure, and the plugin is configured to call the Bing Search API.

2. A Custom Plugin to call Azure AI Search: This custom plugin will allow GPT to make calls to the Azure AI Search service and perform a vector search on a custom dataset.

The approach is pretty straightforward:

1. Initialize the Semantic Kernel with the GPT model and the plugins.

```python
kernel = Kernel()

# add bing plugin

connector = BingConnector()
kernel.add_plugin(WebSearchEnginePlugin(connector), "BingIt")

# add custom plugin

search_client = SearchClient(os.getenv("AZURE_AI_SEARCH_ENDPOINT"), 
                                 os.getenv("AZURE_AI_SEARCH_INDEX_NAME"), 
                                 AzureKeyCredential(os.getenv("AZURE_AI_SEARCH_API_KEY")))
    kernel.add_plugin(RefrigeratorInfoPlugin(search_client), "RefrigeratorInfo")

```

1. Enable Auto function calling in the Semantic Kernel.

```python
execution_settings = AzureChatPromptExecutionSettings(tool_choice="auto")
execution_settings.function_choice_behavior = FunctionChoiceBehavior.Auto(auto_invoke=True)
```

1. Interact with the user and let the GPT model predict the function to call.

## Code Snippet

You can view the whole working code sample here: [Semantic Kernel Auto Function Calling](https://github.com/prasann/auto-fn-invocation-sk)


## Conclusion

With about 80 lines of code, we are able to create a sample application that demonstrates how to automatically call functions using GPT models and Semantic Kernel. This approach can be extended to a wide range of applications, including chatbots, virtual assistants, and automation tools.
