import { Request, Response, NextFunction } from 'express';
import { finished } from 'stream';
import { createWriteStream } from 'fs';
import path from 'path'

const logger = (req: Request, res: Response, next: NextFunction) => {
  const { url, query, body }: {url: string, query: object, body: object} = req;
  const outputPath = path.resolve(__dirname, `./../log.txt`)
  const writeStream = createWriteStream(outputPath, { flags: 'a' });
  next()

  finished(res, () => {
    const { statusCode } = res;
    // const formattedQuery = Object.entries(query);
    // const formattedBody = Object.entries(body);
    const message = `\nUrl: ${url}\nQuery: ${query}\nBody: ${body}\nStatus code: ${statusCode}\n`;
    process.stdout.write(message)
    writeStream.write((new Date()).toUTCString());
    writeStream.write('\n');
    writeStream.write(message.toString());
    writeStream.end(`-----\n`);
  })
}

export { logger }