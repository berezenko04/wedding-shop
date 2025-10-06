import { IsEmail, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @MinLength(8, { message: 'The password must contain at least 8 characters' })
  password: string;
}
