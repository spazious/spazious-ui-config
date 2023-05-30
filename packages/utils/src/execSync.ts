import { ExecFileSyncOptions, execFileSync } from "node:child_process";

interface ExecSyncFunction {
  (opts: ExecFileSyncOptions, ...args: string[]): string | Buffer;
  (...args: string[]): string | Buffer;
}

export const execSync: ExecSyncFunction = (...args: any[]) => {
  const opts: ExecFileSyncOptions =
    typeof args[0] === "object" ? args.shift() : {};

  const flattenArgs = args.flatMap((v) => v.split(/\s+/));
  const command = flattenArgs[0];
  const restArgs = flattenArgs.slice(1);

  return execFileSync(command, restArgs, {
    stdio: "inherit",
    ...opts,
  });
};
