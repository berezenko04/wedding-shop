import { IsEnum, IsOptional, Length } from 'class-validator';
import { Sex } from 'src/types/enums';

export class UpdateUserDto {
  @IsOptional()
  @Length(2, 32, {
    message: 'The first name must be between 2 and 32 characters',
  })
  firstName?: string;

  @IsOptional()
  @Length(2, 32, {
    message: 'The last name must be between 2 and 32 characters',
  })
  lastName?: string;

  @IsOptional()
  @IsEnum(Sex)
  sex?: Sex;
}
