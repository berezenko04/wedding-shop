import { Module } from '@nestjs/common';

// services
import { StripeService } from './stripe.service';

// controllers
import { StripeController } from './stripe.controller';

// modules
import { CartModule } from '../cart/cart.module';

@Module({
  imports: [CartModule],
  controllers: [StripeController],
  providers: [StripeService],
})
export class StripeModule {}
