import { IsString, Length } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  @Length(10, 256)
  address: string;
}
