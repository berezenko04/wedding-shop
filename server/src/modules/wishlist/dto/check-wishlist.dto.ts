import { IsArray, IsUUID } from 'class-validator';

export class CheckWishlistDto {
  @IsArray()
  @IsUUID('all', { each: true })
  ids: string[];
}
