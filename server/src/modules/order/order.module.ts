import { Module } from '@nestjs/common';

// controller
import { OrderController } from './order.controller';

// service
import { PaymentService } from '../payment/payment.service';
import { OrderService } from './order.service';
import { AddressService } from '../address/address.service';

// modules
import { StripeModule } from '../stripe/stripe.module';

@Module({
  imports: [StripeModule],
  controllers: [OrderController],
  providers: [OrderService, PaymentService, AddressService],
  exports: [OrderService],
})
export class OrderModule {}
