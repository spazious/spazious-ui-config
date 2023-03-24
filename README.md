# Spazious UI Config

A collection of configurations and utilities to develop in frontend projects

## Available packages

- [@spazious/config](./packages/config/)
- [@spazious/ts-config](./packages/ts-config/)
- [@spazious/vite-config](./packages/vite-config/)
- [@spazious/eslint-config](./packages/eslint-config/)
- [@spazious/prettier-config](./packages/prettier-config/)
- [@spazious/storybook-config](./packages/storybook-config/)

## Installation

```shell
yarn add @spazious/config --dev
npm pkg set scripts.prepare="spz-config install"
yarn prepare
```

## Development

### Link package to your local npm project

```shell
yarn workspace @spazious/eslint-config link
```

Go to your npm project directory

```shell
yarn link @spazious/eslint-config
```
