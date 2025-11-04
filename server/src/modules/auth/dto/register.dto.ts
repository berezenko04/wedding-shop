import { IsEmail, Length, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @MinLength(8, { message: 'The password must contain at least 8 characters' })
  password: string;

  @Length(2, 32, {
    message: 'The first name must be between 2 and 32 characters',
  })
  firstName: string;

  @Length(2, 32, {
    message: 'The last name must be between 2 and 32 characters',
  })
  lastName: string;
}
