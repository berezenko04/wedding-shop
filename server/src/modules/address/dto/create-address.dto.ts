import { IsBoolean, IsString, Length } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  @Length(8, 128)
  address: string;

  @IsBoolean()
  primary: boolean;
}
