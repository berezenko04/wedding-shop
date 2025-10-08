import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

// modules
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';

// services
import { LogService } from './common/logging/log.service';

// filters
import { AllExceptionsFilter } from './common/filters/all-exception.filter';
import { UserModule } from './modules/user/user.module';
import { GeoModule } from './modules/geo/geo.module';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        `.env.${process.env.NODE_ENV || 'development'}`,
        '.env.development',
        '.env',
      ],
    }),
    ThrottlerModule.forRoot({ throttlers: [{ ttl: 60000, limit: 100 }] }),
    PrismaModule,
    AuthModule,
    UserModule,
    GeoModule,
    ProductModule,
  ],
  controllers: [],
  providers: [
    LogService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
