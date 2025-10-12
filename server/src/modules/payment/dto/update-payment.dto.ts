import { IsBoolean, IsUUID } from 'class-validator';

export class UpdatePaymentDto {
  @IsUUID()
  paymentId: string;

  @IsBoolean()
  primary: boolean;
}
