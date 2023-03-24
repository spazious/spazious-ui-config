#!/usr/bin/env node

const editJsonFile = require("edit-json-file");
const fs = require("node:fs");
const mkdirp = require("mkdirp");
const { resolve } = require("path");

mkdirp.sync(resolve(".vscode"));

console.log("Installing linting config for vscode");

const settingsFilename = resolve(".vscode", "settings.json");

let file = editJsonFile(settingsFilename);

file.set("eslint\\.packageManager", "yarn");
file.set("eslint\\.validate", [
  "javascript",
  "javascriptreact",
  "typescript",
  "typescriptreact",
]);
file.save();

console.log("- .vscode/settings.json updated");

const extensionsFilename = resolve(".vscode", "extensions.json");

file = editJsonFile(extensionsFilename);

if (!(file.get("recommendations") ?? []).includes("dbaeumer.vscode-eslint")) {
  file.append("recommendations", "dbaeumer.vscode-eslint");
}
file.save();

console.log("- .vscode/extensions.json updated");

console.log("Setting up eslint scripts");

const packageJSONFilename = resolve("package.json");

file = editJsonFile(packageJSONFilename);

file.set("scripts.lint", 'eslint --cache "src/**/*.{js,jsx,ts,tsx}"');
file.set("scripts.lint:fix", 'eslint --cache --fix "src/**/*.{js,jsx,ts,tsx}"');

file.save();

console.log("- package.json updated");

console.log("Installing linting config");

if (!fs.existsSync(".eslintrc") || process.argv.includes("--force")) {
  fs.copyFileSync(resolve(__dirname, ".eslintrc"), ".eslintrc");
  console.log("- .eslintrc updated");
}
