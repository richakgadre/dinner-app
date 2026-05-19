#!/usr/bin/env node
/**
 * Validates that all required environment variables are set.
 * Run with: node scripts/validate-env.js
 */

const fs = require("fs");
const path = require("path");

// Load .env manually (no dotenv dependency required)
const envPath = path.resolve(__dirname, "../.env");
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, "utf8").split("\n");
  for (const line of lines) {
    const [key, ...rest] = line.split("=");
    if (key && rest.length && !process.env[key.trim()]) {
      process.env[key.trim()] = rest.join("=").trim();
    }
  }
}

const required = ["ANTHROPIC_API_KEY"];

let allGood = true;
for (const key of required) {
  const value = process.env[key];
  if (!value || value === "your_api_key_here") {
    console.error(`❌  ${key} is not set. Add it to your .env file.`);
    allGood = false;
  } else {
    console.log(`✅  ${key} is set`);
  }
}

if (!allGood) {
  console.error("\nRun: cp .env.example .env  — then fill in your values.");
  process.exit(1);
} else {
  console.log("\nAll environment variables look good!");
}
