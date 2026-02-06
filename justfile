# List available commands
default:
  @just --list

# Install dependencies
install:
  pnpm install

# Start local development server
dev:
  pnpm exec wrangler dev

# Deploy to production
deploy:
  pnpm exec wrangler deploy

# Preview deployment (non-production)
preview:
  pnpm exec wrangler versions upload

# Verify deployment readiness
check:
  @echo "Checking deployment files..."
  @test -f public/index.html && echo "✓ public/index.html" || echo "✗ MISSING: public/index.html"
  @test -f public/_headers && echo "✓ public/_headers" || echo "✗ MISSING: public/_headers"
  @test -f wrangler.jsonc && echo "✓ wrangler.jsonc" || echo "✗ MISSING: wrangler.jsonc"

# Clean build artifacts
clean:
  rm -rf dist node_modules .vite coverage .wrangler

# Full reset and reinstall
reset: clean install

# Run deployment checks before deploy
ci: check
