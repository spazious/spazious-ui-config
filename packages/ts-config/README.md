# Spazious TSconfig bases

A TypeScript configurations for spazious projects

### Available TSConfigs

Install:

```sh
npm install --save-dev @spazious/ts-config
yarn add --dev @spazious/ts-config
```

Add to your `tsconfig.json`:

#### For NodeJS

```json
"extends": "@spazious/ts-config/node.json"
```

#### For NodeJS ESModule

```json
"extends": "@spazious/ts-config/module.json"
```

#### For React

```json
"extends": "@spazious/ts-config/react.json"
```

#### For React App

```json
"extends": "@spazious/ts-config/reac-app.json"
```

### Checking your local ts-config

You should be able to see all the inherit configuration

```shell
$(yarn bin tsc) --showConfig
```
