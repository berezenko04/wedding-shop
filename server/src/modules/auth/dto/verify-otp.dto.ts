import { IsEmail, IsString, Length, Matches } from 'class-validator';

export class VerifyOtpDto {
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @IsString()
  @Length(4, 4)
  @Matches(/^\d{4}$/, { message: 'OTP must be 4 digits' })
  otp: string;
}
