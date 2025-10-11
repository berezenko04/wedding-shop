import { IsBoolean, IsString, IsUUID, Length } from 'class-validator';

export class UpdateAddressDto {
  @IsUUID()
  addressId: string;

  @IsString()
  @Length(8, 128)
  address: string;

  @IsBoolean()
  primary: boolean;
}
