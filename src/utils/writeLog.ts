import { createWriteStream } from 'fs';
import path from 'path';

const createLogger = (logPath: string) => {
  const outputPath = path.resolve(__dirname, logPath)
  const writeStream = createWriteStream(outputPath, { flags: 'a' });
  return writeStream;
}

export { createLogger }