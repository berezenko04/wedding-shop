import { Module } from '@nestjs/common';

// controller
import { OrderController } from './order.controller';

// service
import { PaymentService } from '../payment/payment.service';
import { OrderService } from './order.service';
import { AddressService } from '../address/address.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService, PaymentService, AddressService],
})
export class OrderModule {}
