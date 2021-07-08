import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app/app.module';
import { AllExceptionsFilter } from './filters/exception.filter';
import { AuthGuard } from './guards/auth.guard';
import { createAdmin } from './helpers/createAdmin';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn'],
  });
  createAdmin();
  app.useGlobalGuards(new AuthGuard());
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(4000);
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
  await app.listen(4000, '0.0.0.0');
}
bootstrap();
// bootstrapFastify();
