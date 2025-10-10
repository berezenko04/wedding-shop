import { PaymentMethods, ShippingMethods } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  shippingAddress: string;

  @IsEnum(ShippingMethods)
  shippingMethod: ShippingMethods;

  @IsEnum(PaymentMethods)
  paymentMethod: PaymentMethods;
}
