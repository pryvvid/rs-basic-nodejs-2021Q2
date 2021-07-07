import { NestFactory } from '@nestjs/core';
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
bootstrap();
