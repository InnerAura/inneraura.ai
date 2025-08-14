# InnerAurora Labs Site

Modern TypeScript/React website built with Vite, following best practices for scalability and performance.

## 🚀 Tech Stack

- **Build Tool**: Vite (lightning-fast dev server)
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Linting/Formatting**: Biome (Rust-powered)
- **Testing**: Vitest
- **Package Manager**: pnpm
- **Task Runner**: just

## 📁 Project Structure

```text
src/
├── app/              # App root, providers
├── features/         # Feature modules
│   └── landing/      # Landing pages
│       └── hyperweave/  # HyperWeave landing
├── shared/           # Shared components, hooks
├── lib/             # Framework adapters, services
├── styles/          # Global styles
└── test/            # Test utilities
```

## 🛠️ Development

```bash
# Install dependencies
pnpm install

# Start dev server
just dev

# Run linting & formatting
just check

# Run tests
just test

# Build for production
just build
```

## 🎨 Landing Pages

### HyperWeave Landing

- **Location**: `src/features/landing/hyperweave/`
- **Features**: Holographic De Stijl design system, theme blender demo, particle effects
- **URL**: `http://localhost:5173/`

## 📝 Available Commands (via justfile)

- `just` - List all available commands
- `just dev` - Start development server
- `just build` - Build for production
- `just check` - Run linter and formatter
- `just test` - Run tests
- `just clean` - Clean build artifacts
- `just reset` - Full reset and reinstall

## 🔧 Configuration

- **Biome**: Strict linting & formatting rules in `biome.json`
- **Vite**: Build optimization in `vite.config.ts`
- **Vitest**: Test configuration in `vitest.config.ts`
- **Tailwind**: Custom theme in `tailwind.config.js`

## 🌐 Deployment

The project is configured for deployment to GitHub Pages or any static hosting service.

```bash
# Build for production
just build

# Preview production build
just preview
```

## 📚 Documentation

- [CLAUDE.local.md](.claude/CLAUDE.local.md) - Project setup guide and best practices
- [LANDING_V2.md](./LANDING_V2.md) - HyperWeave landing page specification

## 🤝 Contributing

1. Follow the existing code style (enforced by Biome)
2. Write tests for new features
3. Run `just check` before committing
4. Keep components modular and reusable

## 📄 License

© 2025 InnerAurora Labs

---
