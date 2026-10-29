#!/usr/bin/env bash

set -euo pipefail

git --version
node --version
yarn --version
yarn install --frozen-lockfile

mkdir -p .temp
cd .temp

# checkout blink
if [ ! -d "blink" ]; then
  git clone https://github.com/blinkbitcoin/blink-legacy blink
fi
cd blink
git remote set-url origin https://github.com/blinkbitcoin/blink-legacy
git fetch origin main
git checkout --detach origin/main

# build the public api reference and record its schema version
node ../../scripts/generate-public-api-reference.mjs \
  core/api/src/graphql/public/schema.graphql \
  ../../scripts/spectaql/spectaql-config-public-api.yml \
  ../../static/public-api-reference.html \
  ../../static/public-api-reference.schema.sha256 \
