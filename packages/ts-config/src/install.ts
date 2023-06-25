import { resolve } from "node:path";
import { Presets } from "@spazious/config-types";
import { editJsonFile, debug } from "@spazious/config-utils";
import { existsSync } from "node:fs";

const log = debug("spz-ts-config:install");

/**
 * Checks preset and enabled features passed by args to decide which config execute and install
 */
export const installCommand = async (preset: Presets = Presets.default) => {
  const settingsFilename = resolve("tsconfig.json");

  if (existsSync(settingsFilename)) {
    log("detected existing tsconfig.json");
  }

  let file = editJsonFile(settingsFilename);

  const configFileName = preset === Presets.default ? "node" : preset;
  file.set("extends", `@spazious/ts-config/${configFileName}.json`);

  file.set("compilerOptions.baseUrl", "./");

  file.save();

  log("tsconfig.json updated");
};
