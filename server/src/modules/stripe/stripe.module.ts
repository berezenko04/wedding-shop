import { Module } from '@nestjs/common';

// services
import { StripeService } from './stripe.service';

// controllers
import { StripeController } from './stripe.controller';

@Module({
  controllers: [StripeController],
  providers: [StripeService],
  exports: [StripeService],
})
export class StripeModule {}
