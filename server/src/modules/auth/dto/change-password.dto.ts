import { IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  oldPassword: string;

  @MinLength(8, { message: 'The password must contain at least 8 characters' })
  newPassword: string;
}
