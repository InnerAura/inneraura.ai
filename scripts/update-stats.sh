#!/bin/bash
#
# Update HyperWeave stats in Cloudflare KV
#
# Usage:
#   ./scripts/update-stats.sh                    # Use default/null values
#   ./scripts/update-stats.sh --configs 4410     # Update specific stat
#   ./scripts/update-stats.sh --all              # Fetch from HyperWeave API (future)
#
# Environment:
#   KV_NAMESPACE_ID   - Cloudflare KV namespace ID (required)
#   CF_ACCOUNT_ID     - Cloudflare account ID (optional, for API calls)
#
# Dependencies:
#   - wrangler CLI (npm install -g wrangler)
#   - jq (for JSON manipulation)

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Default stats based on hyperweave-overview.md (v7 architecture)
# null = will display as "-" in UI
THEMES=${THEMES:-25}
MOTIONS=${MOTIONS:-33}
JS_BYTES=${JS_BYTES:-0}
# CONFIGS is auto-calculated from THEMES × MOTIONS in worker

# Parse command line arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --themes)
      THEMES="$2"
      shift 2
      ;;
    --motions)
      MOTIONS="$2"
      shift 2
      ;;
    --js-bytes)
      JS_BYTES="$2"
      shift 2
      ;;
    --all)
      # Future: Fetch stats from HyperWeave API
      echo -e "${YELLOW}--all flag not yet implemented${NC}"
      echo "Will fetch stats from HyperWeave API in future version"
      shift
      ;;
    --help|-h)
      echo "Usage: $0 [options]"
      echo ""
      echo "Options:"
      echo "  --themes NUM       Set themes count (default: 25)"
      echo "  --motions NUM      Set motion presets count (default: 33)"
      echo "  --js-bytes NUM     Set JavaScript bytes (default: 0)"
      echo "  --all              Fetch all stats from HyperWeave API (future)"
      echo "  --help             Show this help message"
      echo ""
      echo "Note: CONFIGS is auto-calculated from THEMES × MOTIONS"
      echo ""
      echo "Environment variables:"
      echo "  KV_NAMESPACE_ID    Cloudflare KV namespace ID (required)"
      exit 0
      ;;
    *)
      echo -e "${RED}Unknown option: $1${NC}"
      exit 1
      ;;
  esac
done

# Check for required environment variable
if [[ -z "${KV_NAMESPACE_ID:-}" ]]; then
  echo -e "${RED}Error: KV_NAMESPACE_ID environment variable is required${NC}"
  echo ""
  echo "Set it with:"
  echo "  export KV_NAMESPACE_ID=your_namespace_id"
  echo ""
  echo "Or create a namespace with:"
  echo "  wrangler kv:namespace create STATS_KV"
  exit 1
fi

# Build JSON payload (v7 architecture - themes and motions)
STATS_JSON=$(cat <<EOF
{
  "themes": $THEMES,
  "motions": $MOTIONS,
  "js_bytes": $JS_BYTES
}
EOF
)

echo -e "${YELLOW}Updating HyperWeave stats in KV...${NC}"
echo ""
echo "Stats to upload:"
echo "$STATS_JSON" | jq .
echo ""

# Upload to KV
wrangler kv:key put --namespace-id="$KV_NAMESPACE_ID" "hyperweave" "$STATS_JSON"

echo ""
echo -e "${GREEN}Stats updated successfully!${NC}"
echo ""
echo "Verify with:"
echo "  wrangler kv:key get --namespace-id=$KV_NAMESPACE_ID hyperweave"
