import { ShippingMethods } from '@prisma/client';
import { IsEnum, IsUUID } from 'class-validator';

export class CreateOrderDto {
  @IsUUID()
  shippingAddressId: string;

  @IsEnum(ShippingMethods)
  shippingMethod: ShippingMethods;

  @IsUUID()
  paymentMethodId: string;
}
