#!/usr/bin/env node

const editJsonFile = require("edit-json-file");
const mkdirp = require("mkdirp");
const fs = require("fs");
const { resolve } = require("path");

console.log("Setting up storybook scripts");

const packageJSONFilename = resolve("package.json");

let file = editJsonFile(packageJSONFilename);

file.set("scripts.storybook", "storybook dev -p 6006");
file.set("scripts.storybook:build", "storybook build");

file.save();

console.log("- package.json updated");

mkdirp.sync(resolve(".storybook"));

if (!fs.existsSync(resolve(".storybook", "main.ts"))) {
  console.log("Adding main.ts...");
  try {
    fs.copyFileSync(
      resolve(__dirname, "main.ts"),
      resolve(".storybook", "main.ts")
    );
  } catch (ex) {
    console.error("Error:", err);
  }
}

if (!fs.existsSync(resolve(".storybook", "preview.ts"))) {
  console.log("Adding preview.ts...");
  try {
    fs.copyFileSync(
      resolve(__dirname, "preview.ts"),
      resolve(".storybook", "preview.ts")
    );
  } catch (ex) {
    console.error("Error:", err);
  }
}

if (!fs.existsSync(resolve(".storybook", "preview-head.html"))) {
  console.log("Adding preview-head.html...");
  try {
    fs.copyFileSync(
      resolve(__dirname, "preview-head.html"),
      resolve(".storybook", "preview-head.html")
    );
  } catch (ex) {
    console.error("Error:", err);
  }
}
