# List available commands
default:
  @just --list

# Install dependencies
install:
  pnpm install

# Start development server
dev:
  pnpm run dev

# Build for production
build:
  pnpm run build

# Preview production build
preview:
  pnpm run preview

# Run linter and formatter
check:
  pnpm run check

# Run tests
test:
  pnpm run test

# Run tests with UI
test-ui:
  pnpm run test:ui

# Run tests with coverage
test-coverage:
  pnpm run test:coverage

# Clean build artifacts
clean:
  rm -rf dist node_modules .vite coverage

# Full reset and reinstall
reset: clean install

# Run all checks (lint, format, test)
ci: check test

# Start dev server with specific port
dev-port PORT="3000":
  pnpm run dev -- --port {{PORT}}

# Build and preview
build-preview: build preview