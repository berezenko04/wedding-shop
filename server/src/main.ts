import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import * as requestIp from 'request-ip';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

// modules
import { AppModule } from './app.module';

// services
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
  });

  const configService = app.get(ConfigService);

  app.use(helmet());

  const corsEnv = configService.get<string>('FRONTEND_URL');
  const origins = corsEnv
    ? corsEnv.split(',').map((s) => s.trim())
    : ['http://localhost:5173'];

  app.enableCors({
    origin: origins,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  app.setGlobalPrefix('api/v1');

  app.use(cookieParser());
  app.use(requestIp.mw());

  app.useBodyParser('json', { limit: '500kb' });
  app.useBodyParser('urlencoded', { limit: '500kb', extended: true });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
