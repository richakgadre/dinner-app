# Project Context for Claude Code

This file is automatically read by Claude Code to understand the project.
Keep it updated as the project evolves.

## What This App Does

<!-- TODO: describe your app in 2-3 sentences -->

## Tech Stack

- **Framework**: Expo (React Native) with Expo Router
- **Language**: TypeScript
- **Navigation**: Expo Router (file-based, lives in `app/`)
- **State management**: <!-- e.g. Redux, Zustand, or React Context -->
- **Backend / API**: <!-- e.g. Firebase, Supabase, custom API -->
- **AI**: Anthropic Claude API (`claude-sonnet-4-20250514`)

## Key Conventions

- API calls to Claude live in `src/api/claude.js` — don't call the API elsewhere
- Keep prompts in `src/api/claude.js` so they're easy to find and iterate on
- All Claude API errors should be caught and shown as user-friendly messages
- Never commit API keys — use `.env` (see `.env.example`)

## Claude-Powered Features

<!-- List the AI features in the app, e.g.: -->
<!-- - Smart reply suggestions -->
<!-- - Content summarization -->
<!-- - Natural language search -->

## Team

Three developers. All use Claude Code locally with individual Claude subscriptions.
Shared Claude Code settings are in `.claude/settings.json`.

## Common Tasks

```bash
# Validate environment setup
node scripts/validate-env.js
```
