# Technology Stack

## Framework & Build System

- **Granite**: React Native framework with file-based routing
- **React Native**: 0.72.x
- **React**: 18.2.x
- **TypeScript**: 5.x with strict mode enabled
- **pnpm**: Package manager

## Key Libraries

- `@granite-js/react-native`: Core Granite framework
- `@granite-js/plugin-router`: File-based routing system
- `@granite-js/plugin-hermes`: Hermes JavaScript engine integration
- `@react-native-async-storage/async-storage`: Local data persistence

## Code Quality Tools

- **Prettier**: Code formatting (configured via `.prettierrc`)
- **TypeScript**: Strict type checking with ES2020 target

## Path Aliases

The project uses path aliases configured in both `tsconfig.json` and `granite.config.ts`:

- `@theme` → `src/theme`
- `@pages` → `pages`
- `@src` → `src`

## Common Commands

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Format code
pnpm format
```

## TypeScript Configuration

- Target: ES2020
- JSX: react-native
- Strict mode enabled
- Module resolution: node
- Synthetic default imports allowed
