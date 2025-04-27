#!/bin/bash

# This script combines all the API reference generation methods into one script

# Check if we're in a Nix shell, if not, try to use nix-shell or nix develop
if [ -z "$IN_NIX_SHELL" ] && command -v nix &> /dev/null; then
  if command -v nix develop &> /dev/null; then
    echo "Running in Nix flake environment..."
    exec nix develop -c "$0" "$@"
  elif command -v nix-shell &> /dev/null; then
    echo "Running in Nix shell environment..."
    exec nix-shell --run "$0 \"$@\""
  fi
fi

# Check for required commands
if ! command -v git &> /dev/null; then echo "git is required but not installed. Please install git."; exit 1; fi
if ! command -v node &> /dev/null; then echo "node is required but not installed. Please install nodejs."; exit 1; fi
if ! command -v npm &> /dev/null; then echo "npm is required but not installed. Please install npm."; exit 1; fi

# Verify Node.js version
NODE_VERSION=$(node --version | cut -d 'v' -f 2 | cut -d '.' -f 1)
if [ "$NODE_VERSION" -lt 18 ]; then
  echo "Node.js version 18 or higher is required. Current version: $(node --version)"
  echo "Please use the provided Nix environment with: nix develop"
  exit 1
fi

# Create static/reference directory if it doesn't exist
mkdir -p static/reference

# Make the individual scripts executable
chmod +x scripts/generate-api-reference-for-llm.sh
chmod +x scripts/generate-api-reference-markdown.sh
chmod +x scripts/generate-api-reference-openapi.sh

# Run the essential scripts
echo "Generating Enhanced JSON Schema for LLMs..."
./scripts/generate-api-reference-for-llm.sh

echo "Generating OpenAPI documentation..."
./scripts/generate-api-reference-openapi.sh

echo "LLM-friendly API reference formats have been generated!"
echo "Files available in the static/reference directory:"
echo "- static/reference/graphql-api-for-llm.json (Enhanced JSON Schema - RECOMMENDED)"
echo "- static/reference/graphql-openapi.json (OpenAPI JSON - Alternative)"
