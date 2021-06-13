import { app } from './app';

import { PORT } from './common/config';

app.listen(PORT, () =>
  process.stdout.write(`TS App is running on http://localhost:${PORT}`)
);
