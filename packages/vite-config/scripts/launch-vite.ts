import { fileURLToPath } from 'url';
import { createServer } from 'vite';

import devServerEndpoint from '../src/devServer/devServerEndpoint';

const mountingPoint = '/graphql';
const port = 1337;
const __dirname = fileURLToPath(new URL('.', import.meta.url));

(async () => {
  const server = await createServer({
    plugins: [
      devServerEndpoint({
        mountingPoint,
      }),
    ],
    configFile: false,
    root: __dirname,
    server: {
      port,
    },
  });
  await server.listen();

  server.printUrls();
})();
