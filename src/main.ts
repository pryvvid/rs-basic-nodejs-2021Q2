import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app/app.module';
import { AllExceptionsFilter } from './filters/exception.filter';
import { AuthGuard } from './guards/auth.guard';
import { createAdmin } from './helpers/createAdmin';
import { PORT, USE_FASTIFY } from './common/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn'],
  });
  createAdmin();
  app.useGlobalGuards(new AuthGuard());
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(PORT);
  process.stdout.write(`Express app runs on port http://localhost:${PORT}\n`);
}
async function bootstrapFastify() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: true,
    }),
  );
  createAdmin();
  app.useGlobalGuards(new AuthGuard());
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(PORT, '0.0.0.0');
  process.stdout.write(`Fastify app runs on port http://localhost:${PORT}\n`);
}

USE_FASTIFY === 'true' ? bootstrapFastify() : bootstrap();
