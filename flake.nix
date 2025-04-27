{
  description = "Blink API Reference Generator for LLMs";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            nodejs_20
            nodePackages.npm
            git
            curl
            jq
          ];

          shellHook = ''
            echo "Blink API Reference Generator Development Environment"
            echo "Node.js version: $(node --version)"
            echo "NPM version: $(npm --version)"
            echo ""
            echo "Available commands:"
            echo "  generate-all    - Generate all API reference formats"
            echo "  generate-json   - Generate JSON/YAML formats"
            echo "  generate-md     - Generate Markdown documentation"
            echo "  generate-openapi - Generate OpenAPI format"
            echo ""

            # Define helper functions
            function generate-all {
              ./scripts/generate-api-reference-combined.sh
            }

            function generate-json {
              ./scripts/generate-api-reference-for-llm.sh
            }

            function generate-md {
              ./scripts/generate-api-reference-markdown.sh
            }

            function generate-openapi {
              ./scripts/generate-api-reference-openapi.sh
            }

            # Export functions
            export -f generate-all
            export -f generate-json
            export -f generate-md
            export -f generate-openapi
          '';
        };
      }
    );
}
