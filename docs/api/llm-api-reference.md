---
id: llm-api-reference
title: API Reference for LLMs
slug: /api/llm-api-reference
---

# GraphQL API Reference for LLM Agents

This page provides access to machine-readable formats of the Blink GraphQL API schema, specifically designed for consumption by Large Language Models (LLMs) and AI agents.

## Why Use Machine-Readable API References?

When building applications that use AI agents or LLMs to interact with the Blink API, providing structured API documentation in formats that are optimized for machine consumption offers several advantages:

1. **Improved Understanding**: LLMs can better understand the API structure, available operations, and data types
2. **More Accurate Code Generation**: AI agents can generate more accurate API calls with proper parameters
3. **Better Error Handling**: Understanding the API schema helps LLMs suggest appropriate error handling strategies
4. **Reduced Hallucinations**: Structured documentation reduces the chance of LLMs "hallucinating" non-existent API features

## Recommended Formats for LLMs

We provide the following machine-readable formats of the Blink GraphQL API schema, optimized for LLM consumption:

### Enhanced JSON Schema (Recommended)

This is our recommended format for most LLM applications. It provides a clean, structured representation of the GraphQL schema with additional context:

- <a href="/reference/graphql-api-for-llm.json" download>Download Enhanced LLM-Friendly Schema (JSON)</a>

### OpenAPI Format (Alternative)

For systems that work better with OpenAPI specifications:

- <a href="/reference/graphql-openapi.json" download>Download OpenAPI Specification (JSON)</a>

## How to Use with LLM Agents

Here are some examples of how to use these formats with popular LLM frameworks:

### Using with LangChain

```python
from langchain.agents import Tool
from langchain.agents import initialize_agent
from langchain.llms import OpenAI
import requests
import json

# Load the API schema
api_schema_url = "https://dev.blink.sv/reference/graphql-api-for-llm.json"
api_schema = json.loads(requests.get(api_schema_url).text)

# Create a tool that provides the API schema as context
tools = [
    Tool(
        name="BlinkAPI",
        func=lambda _: "API schema is already provided in your context",
        description="Blink GraphQL API schema information"
    )
]

# Initialize the agent with the API schema in its context
llm = OpenAI(temperature=0)
agent = initialize_agent(tools, llm, agent="zero-shot-react-description", verbose=True)

# Use the agent with the API schema as context
agent.run(
    input="How do I create a lightning invoice using the Blink API?",
    context={"api_schema": api_schema}
)
```

### Using with OpenAI Assistants

```javascript
const { OpenAI } = require('openai');
const fs = require('fs');
const path = require('path');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function createAssistantWithBlinkAPI() {
  // Download the API schema
  const response = await fetch('https://dev.blink.sv/reference/graphql-api-for-llm.json');
  const apiSchema = await response.json();

  // Save it to a file
  fs.writeFileSync('blink-api-schema.json', JSON.stringify(apiSchema));

  // Create an assistant with the API schema as a file
  const assistant = await openai.beta.assistants.create({
    name: "Blink API Assistant",
    instructions: "You are an assistant that helps users interact with the Blink GraphQL API. Use the provided API schema to answer questions and generate code examples.",
    model: "gpt-4-turbo",
    tools: [{ type: "code_interpreter" }],
    file_ids: [
      // Upload the API schema file to OpenAI and get its file ID
      await openai.files.create({
        file: fs.createReadStream(path.resolve('blink-api-schema.json')),
        purpose: 'assistants',
      }).then(file => file.id)
    ]
  });

  console.log("Assistant created with ID:", assistant.id);
  return assistant;
}

createAssistantWithBlinkAPI();
```

## Generating Updated Schemas

The API reference files are automatically updated when the GraphQL schema changes. If you need to generate them manually, you can use the following script:

```bash
# Generate all formats
./scripts/generate-api-reference-combined.sh
```

## Recommended Format by Use Case

| Use Case | Recommended Format |
|----------|-------------------|
| Most LLM applications | Enhanced LLM-friendly JSON |
| OpenAI function calling | OpenAPI specification |
| Code generation | Enhanced LLM-friendly JSON |
| Automated API integration | OpenAPI specification |

## Additional Resources

- [GraphQL Introduction](/api/graphql-intro) - Learn the basics of our GraphQL API
- [Authentication](/api/auth) - How to authenticate with the Blink API
- [Postman Collection](/api/postman) - Test the API interactively
