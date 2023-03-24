#!/usr/bin/env node

const editJsonFile = require('edit-json-file');
const fs = require('node:fs');
const mkdirp = require('mkdirp');
const { resolve } = require('path');

mkdirp.sync(resolve('.vscode'));

console.log('Installing formatter config for vscode');

const settingsFilename = resolve('.vscode', 'settings.json');

let file = editJsonFile(settingsFilename);

file.set('editor\\.defaultFormatter', 'esbenp.prettier-vscode');
file.set('editor\\.formatOnSave', true);
file.set('editor\\.codeActionsOnSave.source\\.fixAll\\.eslint', true);

file.save();

console.log('- .vscode/settings.json updated');

const extensionsFilename = resolve('.vscode', 'extensions.json');

file = editJsonFile(extensionsFilename);
if (!(file.get('recommendations') ?? []).includes('esbenp.prettier-vscode')) {
  file.append('recommendations', 'esbenp.prettier-vscode');
}
file.save();

console.log('- .vscode/extensions.json updated');

console.log('Setting up eslint scripts');

const packageJSONFilename = resolve('package.json');

file = editJsonFile(packageJSONFilename);

file.set('scripts.format', 'prettier --write src');

file.save();

console.log('- package.json updated');

console.log('Installing formatter config');

if (!fs.existsSync('.editorconfig') || process.argv.includes('--force')) {
  fs.copyFileSync(resolve(__dirname, '.editorconfig'), '.editorconfig');
}

console.log('- .editorconfig linked');

if (!fs.existsSync('.prettierrc') || process.argv.includes('--force')) {
  fs.copyFileSync(resolve(__dirname, '.prettierrc'), '.prettierrc');
}

console.log('- .prettierrc linked');
