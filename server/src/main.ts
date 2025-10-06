import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService)

  app.use(helmet());

  const corsEnv = configService.get<string>('FRONTEND_URL');
  const origins = corsEnv
    ? corsEnv.split(',').map(s => s.trim())
    : ['http://localhost:5173'];

  app.enableCors({
    origin: origins,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true
  })

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
