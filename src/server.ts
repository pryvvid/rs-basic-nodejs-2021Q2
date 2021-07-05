import { createConnection, Connection  } from 'typeorm';
import { app } from './app';
import { PORT } from './common/config';
import { createAdmin } from './utils/createAdmin'

const run = async () => {
  try {
    const connection: Connection = await createConnection();
    await connection.runMigrations();
    app.listen(PORT, async () => {
      if (connection.isConnected) {
        createAdmin();
        process.stdout.write(`Docker TS App is running on http://localhost:${PORT}\n`);
      }
    });
  } catch(e) {
    process.stdout.write(e);
  }
}

run();