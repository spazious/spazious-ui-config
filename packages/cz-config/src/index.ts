import { execSync } from "@spazious/config-utils";
import execCZ from "./bootstrap";
import { existsSync } from "node:fs";

if (process.argv.includes("install")) {
  if (existsSync("./.husky") && !existsSync("./.husky/prepare-commit-msg")) {
    execSync(
      "npx husky add .husky/prepare-commit-msg 'exec < /dev/tty && node_modules/.bin/cz --hook || true'"
    );
  }
} else {
  execCZ();
}
