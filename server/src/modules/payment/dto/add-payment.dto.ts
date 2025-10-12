import { PaymentMethods } from '@prisma/client';
import {
  IsBoolean,
  IsCreditCard,
  IsEmail,
  IsEnum,
  IsString,
  Length,
  Matches,
  ValidateIf,
} from 'class-validator';

export class AddPaymentDto {
  @IsEnum(PaymentMethods)
  method: PaymentMethods;

  @IsBoolean()
  primary: boolean;

  @ValidateIf(
    (o) =>
      o.method === PaymentMethods.PAYPAL || o.method === PaymentMethods.AMAZON,
  )
  @IsEmail()
  email?: string;

  @ValidateIf((o) => o.method === PaymentMethods.CARD)
  @IsCreditCard()
  cardNumber?: string;

  @ValidateIf((o) => o.method === PaymentMethods.CARD)
  @IsString()
  @Length(4, 5, { message: 'Card expiration must be in MM/YY format' })
  cardExp?: string;

  @ValidateIf((o) => o.method === PaymentMethods.CARD)
  @IsString()
  @Length(3, 4, { message: 'CVV must be 3 or 4 digits' })
  cardCvv?: string;

  @ValidateIf((o) => o.method === PaymentMethods.CARD)
  @IsString()
  @Matches(/^[A-Za-z]+ [A-Za-z]+$/, {
    message: 'Card holder name must contain first and last name (letters only)',
  })
  cardHolder?: string;
}
