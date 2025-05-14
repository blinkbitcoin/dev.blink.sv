#!/bin/bash

# This script generates a JSON representation of the GraphQL schema for LLM consumption

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
  git clone https://github.com/blinkbitcoin/blink
fi
cd blink || exit 1

# Create a package.json file if it doesn't exist to avoid corepack issues
if [ ! -f "package.json" ]; then
  echo "Creating temporary package.json..."
  echo '{
  "name": "graphql-schema-generator",
  "version": "1.0.0",
  "private": true
}' > package.json
fi

# Create a simple introspection query file
cat > introspection-query.graphql << 'EOL'
query IntrospectionQuery {
  __schema {
    queryType {
      name
    }
    mutationType {
      name
    }
    subscriptionType {
      name
    }
    types {
      ...FullType
    }
    directives {
      name
      description
      locations
      args {
        ...InputValue
      }
    }
  }
}

fragment FullType on __Type {
  kind
  name
  description
  fields(includeDeprecated: true) {
    name
    description
    args {
      ...InputValue
    }
    type {
      ...TypeRef
    }
    isDeprecated
    deprecationReason
  }
  inputFields {
    ...InputValue
  }
  interfaces {
    ...TypeRef
  }
  enumValues(includeDeprecated: true) {
    name
    description
    isDeprecated
    deprecationReason
  }
  possibleTypes {
    ...TypeRef
  }
}

fragment InputValue on __InputValue {
  name
  description
  type {
    ...TypeRef
  }
  defaultValue
}

fragment TypeRef on __Type {
  kind
  name
  ofType {
    kind
    name
    ofType {
      kind
      name
      ofType {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
              }
            }
          }
        }
      }
    }
  }
}
EOL

# Run the introspection query against the staging API
# Note: This assumes you have curl installed and the API is accessible
echo "Fetching schema from API..."
curl -s -X POST \
  -H "Content-Type: application/json" \
  --data '{"query": "'"$(cat introspection-query.graphql | tr -d '\n')"'"}' \
  https://api.staging.blink.sv/graphql > ../../static/graphql-schema-for-llm.json

# Alternative approach: Generate from local schema file
# This is useful if you can't access the API directly
echo "Generating schema from local schema file..."

# Install dependencies with npm instead of yarn to avoid corepack issues
npm install --no-save graphql

# Create a temporary script file instead of using node -e
cat > generate-schema.js << 'EOL'
const fs = require("fs");
const { buildSchema, graphqlSync, getIntrospectionQuery } = require("graphql");

try {
  // Read the schema file
  const schemaString = fs.readFileSync("./core/api/src/graphql/public/schema.graphql", "utf8");

  // Build a schema object
  const schema = buildSchema(schemaString);

  // Execute the introspection query against the schema
  const result = graphqlSync({
    schema,
    source: getIntrospectionQuery(),
  });

  // Write the result to a file
  fs.writeFileSync("../../static/reference/graphql-schema-for-llm-local.json", JSON.stringify(result, null, 2));

  console.log("Successfully generated schema from local file");
} catch (error) {
  console.error("Error generating schema:", error);
}
EOL

# Run the script
node generate-schema.js

# Generate a more readable and LLM-friendly version with additional context
echo "Generating enhanced LLM-friendly version..."

# Install yaml package
npm install --no-save yaml

# Create a temporary script file for the enhanced version
cat > generate-enhanced.js << 'EOL'
const fs = require("fs");
const yaml = require("yaml");

try {
  // Read the introspection result
  let introspectionData;
  try {
    introspectionData = JSON.parse(fs.readFileSync("../../static/reference/graphql-schema-for-llm.json", "utf8"));
  } catch (e) {
    introspectionData = JSON.parse(fs.readFileSync("../../static/reference/graphql-schema-for-llm-local.json", "utf8"));
  }

  // Extract the schema
  const schema = introspectionData.data.__schema;

  // Create a more LLM-friendly structure
  const llmFriendlySchema = {
    info: {
      title: "Blink GraphQL API Reference",
      description: "This is a machine-readable representation of the Blink GraphQL API schema, designed for LLM consumption.",
      version: "1.0",
      contact: {
        name: "Blink developer community",
        url: "https://chat.blink.sv/"
      }
    },
    servers: [
      {
        url: "https://api.staging.blink.sv/graphql",
        description: "Signet (Staging)",
        production: false
      },
      {
        url: "https://api.blink.sv/graphql",
        description: "Production",
        production: true
      }
    ],
    authentication: {
      type: "API Key",
      headerName: "X-API-KEY",
      format: "blink_..."
    },
    schema: {
      queryType: schema.queryType,
      mutationType: schema.mutationType,
      subscriptionType: schema.subscriptionType,
      types: schema.types.filter(type => !type.name.startsWith("__"))
    }
  };

  // Write the enhanced version
  fs.writeFileSync("../../static/reference/graphql-api-for-llm.json", JSON.stringify(llmFriendlySchema, null, 2));

  // Create a YAML version too (simplified representation)
  fs.writeFileSync("../../static/reference/graphql-api-for-llm.yaml", yaml.stringify(llmFriendlySchema));

  console.log("Successfully generated enhanced LLM-friendly versions");
} catch (error) {
  console.error("Error generating enhanced schema:", error);
}
EOL

# Run the script
node generate-enhanced.js

echo "Done! Files generated:"
echo "- static/reference/graphql-schema-for-llm.json (raw introspection)"
echo "- static/reference/graphql-schema-for-llm-local.json (from local schema)"
echo "- static/reference/graphql-api-for-llm.json (enhanced for LLMs)"
echo "- static/reference/graphql-api-for-llm.yaml (YAML version)"
