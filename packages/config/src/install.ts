import editJsonFile from 'edit-json-file';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

import { Features, Presets } from '@spazious/config-types';
import { execSync, readPackageJson } from '@spazious/config-utils';

import { chekFreshInstall } from './utils';

/**
 * Checks preset and enabled features passed by args to decide which config execute and install
 */
export const installCommand = async (
  preset: Presets = Presets.default,
  features: Features[] = []
) => {
  const packageJSONFilename = resolve('package.json');
  const packageJSON = readPackageJson(packageJSONFilename);
  const packageJSONFile = editJsonFile(packageJSONFilename);
  const isFreshInstall = chekFreshInstall(packageJSON);

  if (isFreshInstall) {
    const presetFlag = preset === Presets.default ? '' : ` -p ${preset}`;
    const featuresFlags = features.map((f) => `-f ${f}`).join(' ');
    packageJSONFile.set('scripts.install', `spz-config install ${presetFlag} ${featuresFlags}`);
    packageJSONFile.save();
  }

  const standardFeatures: Features[] = [
    Features.husky,
    Features.prettier,
    Features.linter,
    Features.staged,
    Features.testing,
    Features.typescript,
    Features.bundler,
    Features.publisher,
  ];

  const presetsMap: Record<Presets, Features[]> = {
    default: standardFeatures,
    react: [...standardFeatures, Features.storybook],
    'react-app': [...standardFeatures, Features.storybook],
  };

  let selectedFeatures = [...presetsMap[preset], ...features];

  // If we are not in a git repo, we can't use husky or staged
  // This is common when installing config in monorepo packages
  if (!existsSync('./.git')) {
    selectedFeatures = selectedFeatures.filter(
      (feature) => feature !== Features.husky && feature !== Features.staged
    );
  }

  if (selectedFeatures.includes(Features.husky)) {
    // Always install husky as documented in https://typicode.github.io/husky/#/?id=install
    execSync('husky install');

    if (!existsSync('./.husky/pre-commit')) {
      execSync("husky set .husky/pre-commit 'yarn pre-commit'");
    }
  }

  if (selectedFeatures.includes(Features.prettier)) {
    execSync('spz-prettier-config install');
  }

  if (selectedFeatures.includes(Features.linter)) {
    execSync('spz-eslint-config install');
  }

  if (selectedFeatures.includes(Features.typescript)) {
    execSync(`spz-ts-config install --preset=${preset}`);
  }

  if (selectedFeatures.includes(Features.storybook)) {
    execSync('spz-storybook-config install');
  }

  if (selectedFeatures.includes(Features.bundler)) {
    execSync('spz-bundler-config install');
  }

  if (selectedFeatures.includes(Features.staged)) {
    const packageJSONFilename = resolve('package.json');

    const file = editJsonFile(packageJSONFilename);

    file.set('scripts.pre-commit', 'lint-staged');
    const commands: string[] = [];

    if (selectedFeatures.includes(Features.prettier)) {
      commands.push('yarn format');
    }

    if (selectedFeatures.includes(Features.linter)) {
      commands.push('yarn lint:fix');
    }

    if (selectedFeatures.includes(Features.testing)) {
      commands.push('yarn test');
    }

    if (commands.length) {
      file.set('lint-staged.*\\.{ts,tsx}', commands);
    }
    file.save();
  }
};
