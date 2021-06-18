import { createConnection } from "typeorm";
import { app } from './app';

import { PORT } from './common/config';

createConnection().then(async _connection => {
  app.listen(PORT, async () => {
    process.stdout.write(`Docker TS App is running on http://localhost:${PORT}\n`);
  });
}).catch(error => process.stdout.write(error));
