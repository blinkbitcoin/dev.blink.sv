#!/bin/bash

# This script generates an OpenAPI representation of the GraphQL schema
# OpenAPI is widely supported by LLMs and many tools

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
  "name": "graphql-openapi-generator",
  "version": "1.0.0",
  "private": true
}' > package.json
fi

# Install dependencies with npm instead of yarn
echo "Installing dependencies..."
npm install --no-save graphql yaml

# Generate OpenAPI documentation from the schema
echo "Generating OpenAPI documentation..."

# Create a temporary script file
cat > generate-openapi.js << 'EOL'
const fs = require("fs");
const { buildSchema, printSchema } = require("graphql");
const yaml = require("yaml");

try {
  // Read the schema file
  const schemaString = fs.readFileSync("./core/api/src/graphql/public/schema.graphql", "utf8");

  // Build a schema object
  const schema = buildSchema(schemaString);

  // Since we can't use @graphql-tools/json-schema-converter, we'll create a simpler version
  // that just includes the schema as a string in the OpenAPI document
  const schemaAsString = printSchema(schema);

  // Create a simplified schema representation
  const simplifiedSchema = {};

  // Extract types from schema
  schema.getTypeMap() && Object.entries(schema.getTypeMap()).forEach(([name, type]) => {
    if (!name.startsWith('__')) {
      simplifiedSchema[name] = {
        type: 'object',
        description: type.description || `GraphQL type: ${name}`
      };
    }
  });

  // Create an OpenAPI document
  const openApiDoc = {
    openapi: "3.0.0",
    info: {
      title: "Blink GraphQL API",
      description: "API for Blink wallet services",
      version: "1.0.0",
      contact: {
        name: "Blink developer community",
        url: "https://chat.blink.sv/"
      },
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT"
      }
    },
    servers: [
      {
        url: "https://api.staging.blink.sv/graphql",
        description: "Signet (Staging)"
      },
      {
        url: "https://api.blink.sv/graphql",
        description: "Production"
      }
    ],
    paths: {
      "/graphql": {
        post: {
          summary: "GraphQL endpoint",
          description: "Send GraphQL queries and mutations to this endpoint",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["query"],
                  properties: {
                    query: {
                      type: "string",
                      description: "The GraphQL query or mutation"
                    },
                    variables: {
                      type: "object",
                      description: "Variables for the GraphQL query or mutation"
                    },
                    operationName: {
                      type: "string",
                      description: "Name of the operation if the query contains multiple operations"
                    }
                  }
                }
              }
            }
          },
          responses: {
            "200": {
              description: "Successful response",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      data: {
                        type: "object",
                        description: "The data returned by the query"
                      },
                      errors: {
                        type: "array",
                        description: "Errors that occurred during query execution",
                        items: {
                          type: "object"
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          security: [
            {
              ApiKeyAuth: []
            }
          ]
        }
      }
    },
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "X-API-KEY",
          description: "API key authentication"
        }
      },
      schemas: {
        ...simplifiedSchema,
        GraphQLSchema: {
          type: "string",
          description: "Full GraphQL schema in SDL format",
          example: schemaAsString.substring(0, 300) + "..." // Truncated for brevity
        }
      }
    }
  };

  // Write the OpenAPI document
  fs.writeFileSync("../../static/reference/graphql-openapi.json", JSON.stringify(openApiDoc, null, 2));

  // Also create a YAML version
  fs.writeFileSync("../../static/reference/graphql-openapi.yaml", yaml.stringify(openApiDoc));

  console.log("Successfully generated OpenAPI documentation");
} catch (error) {
  console.error("Error generating OpenAPI:", error);
}
EOL

# Run the script
node generate-openapi.js

echo "Done! Files generated:"
echo "- static/reference/graphql-openapi.json"
echo "- static/reference/graphql-openapi.yaml"
