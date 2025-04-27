#!/bin/bash

# This script generates a Markdown representation of the GraphQL schema for LLM consumption

# Check for required commands
if ! command -v git &> /dev/null; then echo "git is required but not installed. Please install git."; exit 1; fi
if ! command -v node &> /dev/null; then echo "node is required but not installed. Please install nodejs."; exit 1; fi
if ! command -v npm &> /dev/null; then echo "npm is required but not installed. Please install npm."; exit 1; fi

# Create temp directory
mkdir -p .temp
cd .temp || exit 1

# Checkout blink if not already present
if [ ! -d "blink" ]; then
  echo "Cloning Blink repository..."
  git clone https://github.com/GaloyMoney/blink
fi
cd blink || exit 1

# Create a package.json file if it doesn't exist to avoid corepack issues
if [ ! -f "package.json" ]; then
  echo "Creating temporary package.json..."
  echo '{
  "name": "graphql-markdown-generator",
  "version": "1.0.0",
  "private": true
}' > package.json
fi

# Install dependencies with npm instead of yarn
echo "Installing dependencies..."
npm install --no-save graphql

# Generate markdown documentation from the schema
echo "Generating markdown documentation..."

# Create a temporary script file
cat > generate-markdown.js << 'EOL'
const fs = require("fs");
const { buildSchema, printType, printSchema } = require("graphql");

try {
  // Read the schema file
  const schemaString = fs.readFileSync("./core/api/src/graphql/public/schema.graphql", "utf8");

  // Build a schema object
  const schema = buildSchema(schemaString);

  // Create a simple markdown representation
  let markdown = `# Blink GraphQL API Reference

This document provides a comprehensive reference for the Blink GraphQL API. It is designed to be easily consumed by both humans and LLMs.

## Authentication

To get an API key register with a phone number or log in with your existing Blink account on [dashboard.blink.sv](https://dashboard.blink.sv).
Use the same credentials as with the Blink wallet app.

For your custom requests set the API key in the header as:
\`\`\`
"X-API-KEY" "blink_..."
\`\`\`

## Endpoints

- Production: \`https://api.blink.sv/graphql\`
- Staging: \`https://api.staging.blink.sv/graphql\`

## Schema Overview

`;

  // Add Query type
  const queryType = schema.getQueryType();
  if (queryType) {
    markdown += `## Queries

The Query type provides the entry point for retrieving data from the API.

\`\`\`graphql
${printType(queryType)}
\`\`\`

`;
  }

  // Add Mutation type
  const mutationType = schema.getMutationType();
  if (mutationType) {
    markdown += `## Mutations

The Mutation type provides the entry point for modifying data.

\`\`\`graphql
${printType(mutationType)}
\`\`\`

`;
  }

  // Add Subscription type
  const subscriptionType = schema.getSubscriptionType();
  if (subscriptionType) {
    markdown += `## Subscriptions

The Subscription type provides the entry point for real-time updates.

\`\`\`graphql
${printType(subscriptionType)}
\`\`\`

`;
  }

  // Add Types section
  markdown += `## Types

This section documents all the types used in the API.

`;

  // Add all types
  const typeMap = schema.getTypeMap();
  Object.keys(typeMap)
    .filter(typeName => !typeName.startsWith('__')) // Skip internal types
    .sort()
    .forEach(typeName => {
      const type = typeMap[typeName];
      markdown += `### ${typeName}

\`\`\`graphql
${printType(type)}
\`\`\`

`;
    });

  // Write the markdown to a file
  fs.writeFileSync("../../graphql-api-reference.md", markdown);
  console.log("Successfully generated markdown documentation");
} catch (error) {
  console.error("Error generating markdown:", error);
}
EOL

# Run the script
node generate-markdown.js

echo "Done! File generated:"
echo "- graphql-api-reference.md"
