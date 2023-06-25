import yargs from "yargs";
import { installCommand } from "./install";
import { uninstallCommand } from "./uninstall";
import { Presets } from "@spazious/config-types";

yargs(process.argv.slice(2))
  .usage("Usage: $0 <command> [options]")
  .command(
    "install",
    "install configuration",
    (builder) =>
      builder
        .example("$0 install -p react", "install react preset configuration")
        .option("p", {
          alias: "preset",
          type: "string",
          nargs: 1,
          describe: "Select a preset",
          choices: Object.values(Presets),
          default: Presets.default,
        }),
    (args) => installCommand(args.p)
  )
  .command(
    "uninstall",
    "uninstall configuration",
    (builder) => builder.example("$0 uninstall", "uninstall configuration"),
    () => {
      uninstallCommand();
    }
  )
  .demandCommand(1, 1, "choose a command: install or uninstall")
  .strict()
  .alias("h", "help")
  .help("h")
  .epilog("spazious © 2023");
