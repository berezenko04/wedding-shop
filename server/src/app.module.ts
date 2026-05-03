import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

// modules
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { GeoModule } from './modules/geo/geo.module';
import { ProductModule } from './modules/product/product.module';
import { CartModule } from './modules/cart/cart.module';
import { ReviewModule } from './modules/review/review.module';
import { WishlistModule } from './modules/wishlist/wishlist.module';
import { OrderModule } from './modules/order/order.module';
import { AddressModule } from './modules/address/address.module';
import { PaymentModule } from './modules/payment/payment.module';
import { R2Module } from './modules/r2/r2.module';
import { CategoriesModule } from './modules/categories/categories.module';

// services
import { LogService } from './common/logging/log.service';

// filters
import { AllExceptionsFilter } from './common/filters/all-exception.filter';

// guards
import { DevOnlyGuard } from './common/guards/dev-only.guard';
import { StripeModule } from './modules/stripe/stripe.module';

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
    ThrottlerModule.forRoot({ throttlers: [{ ttl: 60000, limit: 10000 }] }),
    PrismaModule,
    AuthModule,
    UserModule,
    GeoModule,
    ProductModule,
    CartModule,
    ReviewModule,
    WishlistModule,
    OrderModule,
    AddressModule,
    PaymentModule,
    R2Module,
    CategoriesModule,
    StripeModule,
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
    {
      provide: APP_GUARD,
      useClass: DevOnlyGuard,
    },
  ],
})
export class AppModule {}
