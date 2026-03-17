# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Spotify Clone — monorepo with a Next.js 13 frontend (`client/`) and NestJS backend (`server/`), connected via REST API. All commands must be run from within their respective subdirectories.

## Commands

### Client (Next.js)
```bash
cd client
npm run dev       # Start dev server on http://localhost:3000
npm run build     # Production build
npm run lint      # ESLint via Next.js
```

### Server (NestJS)
```bash
cd server
npm run start:dev   # Start with watch mode on port 5000
npm run build       # Compile to dist/
npm run start:prod  # Run compiled output
npm run lint        # ESLint with auto-fix
npm run test        # Jest unit tests
npm run test:watch  # Jest in watch mode
npm run test:cov    # Coverage report
npm run test:e2e    # End-to-end tests (jest-e2e.json config)
```

## Architecture

### Backend (`server/src/`)

NestJS module structure:
- **AppModule** — root module; imports TrackModule and FileModule, serves static files from `dist/static`, enables CORS, listens on port 5000
- **TrackModule** — all track business logic (CRUD, search, comments, listen counter)
- **FileModule** — file upload handling (pictures and audio stored in `dist/static`)

MongoDB via Mongoose (Atlas). Two schemas:
- `Track`: name, artist, text, picture, audio, listens, comments[]
- `Comment`: username, text

REST API base: `http://localhost:5000`
- `POST /tracks` — multipart (picture + audio files)
- `GET /tracks?count=&offset=` — paginated list
- `GET /tracks/search?query=`
- `GET /tracks/:id`
- `DELETE /tracks/:id`
- `POST /tracks/comment`
- `POST /tracks/listen/:id`

### Frontend (`client/`)

Next.js 13 pages router with TypeScript + Redux Toolkit + Material UI + SASS modules.

**Redux store** (`store/`):
- `player` slice — audio playback state (active track, pause, currentTime, duration, volume)
- `tracks` slice — track list with async thunks `fetchTracks` and `searchTracks`
- Uses `next-redux-wrapper` for SSR hydration via `HYDRATE` action

**Pages** (`pages/`):
- `/tracks` — track list with search
- `/tracks/[id]` — track detail with comments
- `/tracks/create` — multi-step creation form with file upload

**Key components** (`components/`): Player, TrackItem/TrackList, TrackProgress, PlayPauseButton, FileUpload, StepsWrapper

**Path alias**: `@/*` maps to `client/` root (configured in `tsconfig.json`).

API base URL is hardcoded as `http://localhost:5000` in the tracks Redux slice.
