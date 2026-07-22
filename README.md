# Routebird – Visa‑Aware Flight Search MVP

A next‑js PWA that provides flight search with visa requirements awareness. This repository contains the initial implementation, scripts, and tests for the MVP.

## Features
- **Visa‑aware itinerary calculation** – checks entry requirements based on passenger data
- **Next.js 14 PWA** – responsive design, offline support via Service Worker
- **TypeScript & Jest** – typed codebase with unit and end‑to‑end testing
- **Playwright** – automated browser tests (to be added)

## Tech Stack
- **Next.js** – React framework with server‑side rendering
- **TypeScript** – static typing
- **Tailwind CSS** – utility‑first styling
- **Jest + React Testing Library** – unit testing
- **Playwright** – end‑to‑end testing (future)

## Getting Started

### Prerequisites
- Node.js >= 18
- npm (or yarn)

### Installation
```bash
git clone https://github.com/ibrahimrasras-collab/ROUTEBIRD.git
cd ROUTEBIRD
npm ci
```

### Development
```bash
npm run dev          # start Next.js dev server
npm run lint         # lint code
npm test             # run Jest unit tests
```

### Build for Production
```bash
npm run build
npm start
```

## Configuration
- Environment variables (`.env.local`) should contain `NEXT_PUBLIC_*` prefixes for public APIs.
- Feature flags are managed via `next-intl` messages.

## Testing Roadmap
- **Unit tests** – already covered (see `src/__tests__/`)
- **E2E tests** – Playwright tests will be added under `tests/e2e/`

## Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/xyz`)
3. Commit changes with clear messages
4. Submit a Pull Request

## License
MIT