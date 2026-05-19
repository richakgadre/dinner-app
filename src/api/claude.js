/**
 * Claude API client
 *
 * Central module for all Anthropic API calls in the app.
 * Add new AI-powered features here as named functions.
 *
 * Docs: https://docs.anthropic.com
 */

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
const MODEL = "claude-sonnet-4-20250514";
const MAX_TOKENS = 1024;

/**
 * Base function to call the Claude API.
 * @param {string} systemPrompt - Instructions for Claude's behaviour
 * @param {Array}  messages     - Conversation history [{role, content}]
 * @param {object} options      - Optional overrides (model, max_tokens)
 */
async function callClaude(systemPrompt, messages, options = {}) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error(
      "ANTHROPIC_API_KEY is not set. Copy .env.example to .env and add your key."
    );
  }

  const response = await fetch(ANTHROPIC_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: options.model ?? MODEL,
      max_tokens: options.max_tokens ?? MAX_TOKENS,
      system: systemPrompt,
      messages,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(
      `Claude API error ${response.status}: ${error?.error?.message ?? response.statusText}`
    );
  }

  const data = await response.json();
  return data.content?.[0]?.text ?? "";
}

// ---------------------------------------------------------------------------
// Add your AI-powered features below
// ---------------------------------------------------------------------------

/**
 * Example: Summarise a block of text.
 * Replace or extend this with your actual app features.
 *
 * @param {string} text - Text to summarise
 * @returns {Promise<string>} Summary
 */
export async function summariseText(text) {
  return callClaude(
    "You are a helpful assistant. Summarise the provided text concisely in 2-3 sentences.",
    [{ role: "user", content: text }]
  );
}

/**
 * Example: Multi-turn chat helper.
 *
 * @param {Array}  history - Previous messages [{role, content}]
 * @param {string} userMessage - New user message
 * @returns {Promise<string>} Assistant reply
 */
export async function chat(history, userMessage) {
  const messages = [...history, { role: "user", content: userMessage }];
  return callClaude(
    "You are a helpful in-app assistant. Be concise and friendly.",
    messages
  );
}
