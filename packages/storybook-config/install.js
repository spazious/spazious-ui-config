#!/usr/bin/env node

const editJsonFile = require("edit-json-file");
const symlinkDir = require("symlink-dir");
const mkdirp = require("mkdirp");
const { resolve } = require("path");

console.log("Setting up storybook scripts");

const packageJSONFilename = resolve("package.json");

let file = editJsonFile(packageJSONFilename);

file.set("scripts.storybook", "storybook dev -p 6006");
file.set("scripts.storybook:build", "storybook build");

file.save();

console.log("- package.json updated");

console.log("Installing storybook config");

mkdirp.sync(resolve(".storybook"));

symlinkDir(resolve(__dirname, "main.ts"), resolve(".storybook", "main.ts"))
  .then(() => {
    console.log("- main.ts linked");
  })
  .catch((err) => console.error(err));

symlinkDir(
  resolve(__dirname, "preview.ts"),
  resolve(".storybook", "preview.ts")
)
  .then(() => {
    console.log("- preview.ts linked");
  })
  .catch((err) => console.error(err));

symlinkDir(
  resolve(__dirname, "preview-head.html"),
  resolve(".storybook", "preview-head.html")
)
  .then(() => {
    console.log("- preview-head.html linked");
  })
  .catch((err) => console.error(err));
