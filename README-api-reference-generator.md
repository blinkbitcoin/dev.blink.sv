# Blink API Reference Generator for LLMs

This directory contains scripts to generate machine-readable formats of the Blink GraphQL API schema, specifically designed for consumption by Large Language Models (LLMs) and AI agents.

## Using the Nix Environment (Recommended)

We provide a Nix shell to ensure a consistent development environment with all required dependencies. This is the recommended way to run the scripts.

### Prerequisites

- [Nix package manager](https://nixos.org/download.html)

### Running with Nix

First, enter the development environment:

```bash
nix-shell
```

Then, use the provided helper commands:

```bash
# Generate all formats
generate-all

# Or generate specific formats
generate-json      # JSON/YAML formats
generate-md        # Markdown documentation
generate-openapi   # OpenAPI format
```

The first time you run these commands, they may take a few minutes to download and install the necessary dependencies.

## Running Without Nix

If you prefer not to use Nix, you can run the scripts directly, but you'll need to ensure you have the correct dependencies installed:

### Required Dependencies

- Node.js 18 or higher
- npm
- git
- curl

### Running the Scripts

```bash
# Make scripts executable
chmod +x scripts/generate-api-reference-*.sh

# Generate all formats
./scripts/generate-api-reference-combined.sh

# Or generate specific formats
./scripts/generate-api-reference-for-llm.sh      # JSON/YAML formats
./scripts/generate-api-reference-markdown.sh     # Markdown documentation
./scripts/generate-api-reference-openapi.sh      # OpenAPI format
```

## Generated Files

All generated files will be placed in the `static` directory:

- `graphql-schema-for-llm.json` - Raw GraphQL introspection
- `graphql-schema-for-llm-local.json` - Generated from local schema file
- `graphql-api-for-llm.json` - Enhanced LLM-friendly JSON
- `graphql-api-for-llm.yaml` - YAML version
- `graphql-api-reference.md` - Markdown documentation
- `graphql-openapi.json` - OpenAPI JSON
- `graphql-openapi.yaml` - OpenAPI YAML

## Documentation

For more information on how to use these files with LLM agents, see the [API Reference for LLMs](/api/llm-api-reference) page on the Blink developer documentation site.
