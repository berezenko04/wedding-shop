import { IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  shippingAddress: string;

  @IsString()
  trackingNumber: string;
  shippingMethod: string;
  paymentMethod: string;
}
