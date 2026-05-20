import { Module } from '@nestjs/common';

// controller
import { OrderController } from './order.controller';

// service
import { OrderService } from './order.service';

// modules
import { StripeModule } from '../stripe/stripe.module';
import { PaymentModule } from '../payment/payment.module';
import { AddressModule } from '../address/address.module';

@Module({
  imports: [StripeModule, PaymentModule, AddressModule],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
