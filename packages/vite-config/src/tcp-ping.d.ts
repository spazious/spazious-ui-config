declare module 'tcp-ping' {
  interface PingOptions {
    address: string;
    port?: number;
    timeout?: number;
    attempts?: number;
  }

  interface PingData {
    address: string;
    port: number;
    attempts: number;
    avg: number;
    max: number;
    min: number;
    results: Array<{ seq: number; time: number }>;
  }

  export function probe(
    host: string,
    port: number,
    callback: (err: any, available: boolean) => void
  ): void;
  export function ping(
    options: PingOptions,
    callback: (err: Error | undefined, data: PingData) => void
  ): void;
}
