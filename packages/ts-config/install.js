#!/usr/bin/env node

const editJsonFile = require("edit-json-file");
const { resolve } = require("path");

console.log("Installing typescript config");

const settingsFilename = resolve("tsconfig.json");

let file = editJsonFile(settingsFilename);

file.set("extends", "@spazious/ts-config/react-app.json");
file.set("compilerOptions.baseUrl", "./");

file.save();

console.log("- tsconfig.json updated");
