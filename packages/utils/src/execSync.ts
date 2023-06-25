import { execSync as nodeExecSync, ExecSyncOptions } from 'node:child_process';
import resolveBin from 'resolve-bin';

interface ExecSyncFunction {
  (opts: ExecSyncOptions, ...args: string[]): string | Buffer;
  (...args: string[]): string | Buffer;
}

export const execSync: ExecSyncFunction = (...args: any[]) => {
  const opts: ExecSyncOptions = typeof args[0] === 'object' ? args.shift() : {};

  const flattenArgs = args.flatMap((v) => v.split(/\s+/));
  let command = flattenArgs[0];
  const restArgs = flattenArgs.slice(1);
  try {
    command = resolveBin.sync(command);
  } catch (ex) {}
  return nodeExecSync([command, ...restArgs].join(' '), {
    stdio: 'inherit',
    ...opts,
  });
};
