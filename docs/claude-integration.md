# Claude Integration Guide

This document covers how Claude AI is used in this app and how to add new AI features.

## Overview

The app integrates with Claude via two mechanisms:

| Integration | Purpose | Who uses it |
|---|---|---|
| **Claude API** (`src/api/claude.js`) | Powers AI features inside the app | End users |
| **Claude Code** (`.claude/`) | AI coding assistant for developers | Your team |

---

## Claude API (in-app features)

### Adding a new AI feature

1. Open `src/api/claude.js`
2. Add a new exported async function
3. Write a clear system prompt — this is the most important part
4. Call it from your screen or component

**Example:**

```js
export async function generateReply(originalMessage) {
  return callClaude(
    "You are a helpful assistant. Write a short, friendly reply to the message.",
    [{ role: "user", content: originalMessage }]
  );
}
```

### Prompt writing tips

- Be specific about tone, format, and length in your system prompt
- Test prompts in [Claude.ai](https://claude.ai) before hardcoding them
- Keep prompts in `claude.js` — don't scatter them across the codebase
- Log Claude responses during development; they're often surprisingly good (or surprisingly off)

### Error handling

Always wrap Claude calls in try/catch and show a user-friendly message:

```js
try {
  const reply = await generateReply(message);
  setResult(reply);
} catch (err) {
  setError("Couldn't generate a reply. Please try again.");
  console.error(err);
}
```

### Costs

Each call to the Claude API costs money. Keep an eye on usage in the
[Anthropic Console](https://console.anthropic.com). Tips to control costs:
- Set a reasonable `max_tokens` limit
- Cache responses where appropriate
- Avoid calling the API on every keystroke

---

## Claude Code (developer tooling)

Claude Code is a CLI that reads your codebase and helps you build faster.

### Setup (each developer, once)

```bash
npm install -g @anthropic-ai/claude-code
```

Then log in with your Claude account:

```bash
claude
```

### Shared configuration

`.claude/CLAUDE.md` — **keep this updated.** It tells Claude Code about the project:
what the app does, the tech stack, conventions, and common tasks. The better this
file is, the better Claude Code's suggestions will be.

`.claude/settings.json` — committed shared settings (safe pre-approved commands, etc.)

`.claude/settings.local.json` — your personal overrides (gitignored, never committed)

### Useful Claude Code commands

```bash
claude                        # Start interactive session
claude "explain this file"    # One-off question
claude "fix the bug in src/api/claude.js"
claude "add a summarise feature to the Claude client"
```
