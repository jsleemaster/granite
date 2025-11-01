# Project Structure

## Directory Organization

```
├── pages/              # Route components (file-based routing)
│   ├── _layout.tsx    # Shared layout wrapper with SafeAreaView
│   ├── index.tsx      # Home screen (fortune generation)
│   └── history.tsx    # Fortune history screen
├── src/
│   ├── _app.tsx       # App entry point and Granite registration
│   ├── router.gen.ts  # Auto-generated router file
│   └── theme/         # Theme configuration
│       └── colors.ts  # Color palette (Pantone 2025 Mocha Mousse)
├── .granite/          # Granite framework files
├── granite.config.ts  # Granite configuration
├── tsconfig.json      # TypeScript configuration
└── package.json       # Dependencies and scripts
```

## Routing Pattern

Granite uses file-based routing. Each route file in `pages/` exports a `Route` object:

```typescript
export const Route = createRoute('/path' as const, {
  validateParams: () => ({}),
  component: ComponentName,
});
```

## Component Patterns

- **Functional components**: All components use React function components with hooks
- **StyleSheet**: React Native StyleSheet API for styling (no CSS-in-JS libraries)
- **Type safety**: Props interfaces defined for all components
- **Layout wrapper**: `_layout.tsx` provides SafeAreaView wrapper for all pages

## State Management

- Local component state with `useState`
- AsyncStorage for persistence (fortune history)
- No global state management library

## Styling Approach

- Centralized color theme in `src/theme/colors.ts`
- StyleSheet objects defined at component level
- Consistent use of theme colors via imports
- 2025 Pantone Color of the Year (Mocha Mousse) as primary color

## Data Storage

- AsyncStorage for local persistence
- Key: `fortune_history`
- Stores array of fortune entries (max 20 items)
- Each entry includes: id, date, fortune text, lucky number, lucky color
