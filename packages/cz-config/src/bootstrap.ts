import { join } from "node:path";
import { bootstrap } from "commitizen/dist/cli/git-cz";

export const execCZ = () =>
  bootstrap({
    cliPath: join(__dirname, "../../../node_modules/commitizen"),
    // this is new
    config: {
      path: "cz-conventional-changelog",
    },
  });

export default execCZ;
