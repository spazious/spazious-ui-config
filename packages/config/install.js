#!/usr/bin/env node

const editJsonFile = require("edit-json-file");
const fs = require("fs");
const { resolve } = require("path");

const { execFileSync } = require("node:child_process");

if (process.argv.includes("install")) {
  execFileSync("spz-prettier-config", ["install"], {
    stdio: "inherit",
  });

  execFileSync("spz-eslint-config", ["install"], {
    stdio: "inherit",
  });

  execFileSync("spz-ts-config", ["install"], {
    stdio: "inherit",
  });

  if (process.argv.includes("react") || process.argv.includes("react-app")) {
    execFileSync("spz-storybook-config", ["install"], {
      stdio: "inherit",
    });
  }

  if (process.argv.includes("react-app")) {
    // require("@spazious/vite-config");
  }

  // Installing and apply configuration that are out of the scope of this monorepo
  console.log("Applying husky and lint-staged config...");

  const packageJSONFilename = resolve("package.json");

  file = editJsonFile(packageJSONFilename);

  file.set("scripts.pre-commit", "lint-staged");
  file.set("lint-staged.*\\.{js,jsx,ts,tsx}", [
    "yarn format",
    "yarn lint:fix",
    "yarn test",
  ]);
  file.save();
}

// Always install husky as documented in https://typicode.github.io/husky/#/?id=install
execFileSync("husky", ["install"], {
  stdio: "inherit",
});

if (!fs.existsSync("./.husky/pre-commit")) {
  console.log("Adding pre-commit hook...");
  execFileSync(
    "npx",
    ["husky", "add", ".husky/pre-commit", "yarn pre-commit"],
    {
      stdio: "inherit",
    }
  );
}
