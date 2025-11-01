# 🔮 Fortune Teller App

A delightful React Native fortune telling app built with Granite.js that provides daily fortunes, lucky numbers, and lucky colors.

## Features

- **Daily Fortune**: Get personalized fortune messages in Korean
- **Lucky Numbers**: Receive a random lucky number (1-100)
- **Lucky Colors**: Discover your lucky color with visual representation
- **Smooth Animations**: Enjoy pleasant button press animations
- **Navigation**: Browse between fortune and about pages
- **Responsive Design**: Beautiful UI with custom theming

## Tech Stack

- **Framework**: React Native with Granite.js
- **Language**: TypeScript
- **Styling**: StyleSheet with custom color theme
- **Animation**: React Native Animated API
- **Navigation**: Granite.js routing system

## Getting Started

### Prerequisites

- Node.js (see `.nvmrc` for version)
- pnpm package manager

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Run tests
pnpm test

# Type checking
pnpm typecheck

# Lint code
pnpm lint
```

## Project Structure

```
src/
├── pages/
│   ├── index.tsx      # Main fortune telling page
│   └── about.tsx      # About page (history placeholder)
├── theme/
│   └── colors.ts      # Color theme configuration
└── _app.tsx           # App root component

pages/
└── _404.tsx           # 404 Not Found page
```

## Fortune Features

### Fortune Messages

The app includes 8 different Korean fortune messages covering various aspects of daily life:

- Positive encouragement
- New opportunities
- Rest and relaxation
- Good luck
- Unexpected joy
- Personal empowerment
- Good news
- Peaceful days

### Lucky Colors

6 vibrant lucky colors with emoji representations:

- Red ❤️
- Blue 💙
- Yellow 💛
- Green 💚
- Purple 💜
- Orange 🧡

### Lucky Numbers

Random numbers from 1 to 100 for daily guidance.

## Development

The app uses Granite.js for routing and React Native for the UI. The main fortune logic is implemented with proper TypeScript safety, using non-null assertion operators to ensure type safety when accessing random array elements.

### Type Safety

The fortune generation logic uses TypeScript's non-null assertion operator (`!`) to guarantee that array access operations return valid values, since we know the arrays are non-empty and the random indices are always valid.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request
