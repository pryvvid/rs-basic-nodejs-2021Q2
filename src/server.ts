import { app } from './app';

import { PORT } from './common/config';

app.listen(PORT, () =>
  process.stdout.write(`Docker TS App is running on http://localhost:${PORT}`)
);
