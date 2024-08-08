---
title: Quota management for DallE API using APIM
description: This article explores how enterprises can use Azure API Management to implement usage limits and quotas for the DALL-E API, ensuring cost-effective and controlled access to OpenAI's image generation capabilities.
date: 26-06-2024
minutesToRead: 8
---

Enterprises often work with applications that use OpenAI's technologies. Their teams typically want to explore these applications but need to limit API usage to avoid excessive costs. This means controlling the number of API calls and setting constraints on API usage. Such tasks are usually handled at the Gateway layer of applications, which is where API Management becomes important.

## Scenario

Consider a scenario where an enterprise uses OpenAI's DALL-E API to generate images. They want to limit the number of images generated, which could be set on a per-minute, daily, weekly, or another time basis.

## APIM Gateway for Generative AI

[Azure API Management (APIM)](https://learn.microsoft.com/en-us/azure/api-management/api-management-key-concepts) is a service offering a scalable, multi-cloud API management platform for securing, publishing, and analyzing APIs. It acts as a gateway for APIs, allowing management and usage constraints. Here is a useful article on using APIM as a gateway for Generative AI APIs. [GenAI Gateway: Managing Generative AI APIs with Azure API Management](https://learn.microsoft.com/en-us/ai/playbook/technology-guidance/generative-ai/dev-starters/genai-gateway/reference-architectures/apim-based)

## Quota Management for DALL-E API

In this article, we will discuss how to manage quotas for the DALL-E API using Azure API Management. We'll explore how to limit the number of images that can be generated through this API.

To accomplish this with APIM, we can use `rate-limit` or `quota` policies. For more details on the differences between these policies, refer to the [official documentation](https://learn.microsoft.com/en-us/azure/api-management/api-management-sample-flexible-throttling#rate-limits-and-quotas).

The following logic can be applied to both policies:

### Approach

- The requests made to the DALL-E endpoints contain the number of images to be generated. [Ref](https://platform.openai.com/docs/api-reference/images/create#images-create-n)
- APIM can track this number and decrease a counter as specified by the policy.
- Ensure the counter is updated only after successful responses from the DALL-E API, and reset the counter at the end of the time period.

## Policy Snippet

[Link to the Gist](https://gist.github.com/prasann/f81d3ecc30729e6d6f8744622336cf83)

```xml
<policies>
    <inbound>
        <base />
        <set-variable name="body" value="@(context.Request.Body.As<string>(preserveContent: true))" />
        <choose>
            <when condition="@(context.Request.Body.As<JObject>()["n"] != null)">
                <rate-limit-by-key calls="1" renewal-period="60" counter-key="@(context.Request.IpAddress)" increment-condition="@(context.Response.StatusCode == 200)" increment-count="@(int.Parse(context.Request.Body.As<JObject>()["n"].ToString()))" retry-after-header-name="x-apim-custom-retry" remaining-calls-header-name="x-apim-remaining" />
            </when>
            <otherwise>
                <rate-limit-by-key calls="1" renewal-period="60" counter-key="@(context.Request.IpAddress)" increment-condition="@(context.Response.StatusCode == 200)" increment-count="1" retry-after-header-name="x-apim-custom-retry" remaining-calls-header-name="x-apim-remaining" />
            </otherwise>
        </choose>
        <set-body>@((string)context.Variables["body"])</set-body>
    </inbound>
    <!-- Control if and how the requests are forwarded to services  -->
    <backend>
        <base />
    </backend>
    <!-- Customize the responses -->
    <outbound>
        <base />
    </outbound>
    <!-- Handle exceptions and customize error responses  -->
    <on-error>
        <base />
    </on-error>
</policies>
```

Here is the link to the gist, containing the policy snippet and an explanation [APIM Policy Snippet](https://gist.github.com/prasann/f81d3ecc30729e6d6f8744622336cf83). This can be achieved by using the `quota` policy as well.
